import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import uploadRouter from "../routers/upload";
import paymentRoutes from "../routes/paymentRoutes";
import webhookRoutes from "../routes/webhookRoutes";
import shippingRoutes from "../routes/shippingRoutes";
import waitlistRoutes from "../routes/waitlist.routes";
import contactRoutes from "../routes/contact.routes";
import { getBackupPayload } from "../db";
import { asaasWebhookHandler } from "../controllers/paymentController";

function scheduleDailyBackup() {
  const dir = process.env.BACKUP_DIR || "backups";
  const intervalMs = 24 * 60 * 60 * 1000;

  const execute = async () => {
    try {
      const backup = await getBackupPayload();
      await mkdir(dir, { recursive: true });
      const fileName = `auto-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
      const filePath = path.join(dir, fileName);
      await writeFile(filePath, JSON.stringify(backup, null, 2), "utf-8");
      console.log(`[Backup] Created ${fileName}`);
    } catch (error) {
      console.error("[Backup] Failed automatic backup", error);
    }
  };

  void execute();
  setInterval(() => {
    void execute();
  }, intervalMs);
}

function isPrivateHostname(hostname: string) {
  const value = hostname.trim().toLowerCase();
  if (!value) return true;
  if (value === "localhost" || value === "::1" || value.endsWith(".local")) return true;
  if (/^127\./.test(value) || /^10\./.test(value) || /^192\.168\./.test(value)) return true;

  const match172 = value.match(/^172\.(\d{1,3})\./);
  if (match172) {
    const secondOctet = Number(match172[1]);
    if (secondOctet >= 16 && secondOctet <= 31) return true;
  }

  return false;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function listenWithRetry(
  server: ReturnType<typeof createServer>,
  host: string,
  preferredPort: number,
  isProduction: boolean,
): Promise<number> {
  if (isProduction) {
    return await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(preferredPort, host, () => {
        server.off("error", reject);
        resolve(preferredPort);
      });
    });
  }

  for (let port = preferredPort; port < preferredPort + 30; port++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const onError = (error: NodeJS.ErrnoException) => {
          server.off("listening", onListening);
          reject(error);
        };
        const onListening = () => {
          server.off("error", onError);
          resolve();
        };

        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port, host);
      });

      return port;
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== "EADDRINUSE") {
        throw err;
      }
    }
  }

  throw new Error(`No available port found starting from ${preferredPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  const isProduction = process.env.NODE_ENV === "production";
  app.disable("x-powered-by");

  // Render/Reverse proxies set X-Forwarded-* headers.
  // express-rate-limit requires trust proxy enabled to resolve client IP safely.
  if (isProduction) {
    app.set("trust proxy", 1);
  }

  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  if (!isProduction && allowedOrigins.length === 0) {
    allowedOrigins.push("http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:5173");
  }

  function isAllowed(origin?: string) {
    if (!origin) return true; // healthcheck / server-to-server

    try {
      const url = new URL(origin);

      if (!isProduction && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) {
        return true;
      }

      return allowedOrigins.some(allowed => {
        const allowedUrl = new URL(allowed);
        return url.host === allowedUrl.host; // ignora protocolo, barra final e porta padrÃ£o
      });
    } catch {
      return false;
    }
  }
  const hasGoogleClientId = Boolean(process.env.GOOGLE_CLIENT_ID?.trim());
  const hasGoogleClientSecret = Boolean(process.env.GOOGLE_CLIENT_SECRET?.trim());
  const hasGoogleRedirectUri = Boolean(process.env.GOOGLE_REDIRECT_URI?.trim());
  console.log(
    `[OAuth Env] clientId=${hasGoogleClientId} clientSecret=${hasGoogleClientSecret} redirectUri=${hasGoogleRedirectUri}`
  );

  app.use(
    helmet({
      contentSecurityPolicy: isProduction
        ? undefined
        : false,
      hsts: isProduction
        ? {
            maxAge: 15552000,
            includeSubDomains: true,
            preload: true,
          }
        : false,
    }),
  );

  app.use(
    "/api",
    cors({
      origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (isAllowed(origin)) return callback(null, true);
        console.error("CORS BLOCKED:", origin);
        return callback(new Error("Origin not allowed by CORS"));
      },
      credentials: true,
    }),
  );

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: isProduction ? 300 : 1200,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Tighter limit for authentication endpoints to reduce brute force attempts.
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isProduction ? 20 : 80,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: "Too many authentication attempts. Try again later." },
  });
  app.use("/api/oauth/login", authLimiter);
  app.use("/api/trpc/auth.localLogin", authLimiter);

  // Additional protection for admin-only API routes.
  const adminApiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: isProduction ? 120 : 400,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many admin requests. Try again later." },
  });
  app.use("/api/trpc/admin", adminApiLimiter);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use((req, res, next) => {
    const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    if (!isMutating) {
      next();
      return;
    }

    // Apply origin checks only for API routes that may use cookie auth.
    const isApiRoute = req.path.startsWith("/api/");
    if (!isApiRoute) {
      next();
      return;
    }

    // Webhooks are server-to-server and should not be blocked by browser-origin checks.
    const isWebhookRoute = req.path === "/api/webhooks/asaas" || req.path === "/webhook/asaas";
    if (isWebhookRoute) {
      next();
      return;
    }

    const origin = req.headers.origin;
    if (isAllowed(origin)) {
      next();
      return;
    }

    res.status(403).json({ error: "CSRF origin check failed" });
  });
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  app.get("/api/cep/:cep", async (req, res) => {
    try {
      const cep = String(req.params.cep ?? "").replace(/\D/g, "").slice(0, 8);
      if (cep.length !== 8) {
        res.status(400).json({ error: "CEP invalido" });
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        res.status(502).json({ error: "Falha ao consultar CEP" });
        return;
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("[CEP] Failed request", error);
      res.status(500).json({ error: "Erro ao consultar CEP" });
    }
  });

  app.get("/api/image-proxy", async (req, res) => {
    try {
      const src = String(req.query.src ?? "").trim();
      if (!src) {
        res.status(400).json({ error: "Imagem não informada" });
        return;
      }

      const url = new URL(src);
      if (!/^https?:$/i.test(url.protocol) || isPrivateHostname(url.hostname)) {
        res.status(400).json({ error: "Origem da imagem não permitida" });
        return;
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        redirect: "follow",
        headers: {
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        res.status(404).json({ error: "Não foi possível carregar a imagem" });
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.toLowerCase().startsWith("image/")) {
        res.status(415).json({ error: "Arquivo remoto não é uma imagem válida" });
        return;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(buffer);
    } catch (error) {
      console.error("[Image Proxy] Failed to fetch remote image", error);
      res.status(500).json({ error: "Falha ao carregar imagem" });
    }
  });

  // Backward-compatible alias for legacy webhook URL.
  // Canonical webhook endpoint is /api/webhooks/asaas.
  app.post("/webhook/asaas", asaasWebhookHandler);
  // REST API (upload)
  app.use("/api/upload", uploadRouter);
  app.use(
    "/uploads",
    (req, res, next) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    },
    express.static(path.resolve(process.cwd(), "uploads"))
  );
  app.use("/api/payments", paymentRoutes);
  app.use("/api/webhooks", webhookRoutes);
  app.use("/api/shipping", shippingRoutes);
  app.use("/api", waitlistRoutes);
  app.use("/api", contactRoutes);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (!isProduction) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const host = process.env.HOST || "0.0.0.0";
  const scannedPort = isProduction ? preferredPort : await findAvailablePort(preferredPort);
  if (!isProduction && scannedPort !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, trying from ${scannedPort}`);
  }

  const port = await listenWithRetry(server, host, scannedPort, isProduction);
  if (!isProduction && port !== scannedPort) {
    console.log(`Port ${scannedPort} is busy, using port ${port} instead`);
  }
  console.log(`Server running on http://${host}:${port}/`);

  scheduleDailyBackup();
}

startServer().catch(console.error);

