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
import { getBackupPayload } from "../db";

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
      return allowedOrigins.some(allowed => {
        const allowedUrl = new URL(allowed);
        return url.host === allowedUrl.host; // ignora protocolo, barra final e porta padrão
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

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use((req, res, next) => {
    if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      next();
      return;
    }

    if (!req.path.startsWith("/api/trpc")) {
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
  // REST API (upload)
  app.use("/api/upload", uploadRouter);
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
