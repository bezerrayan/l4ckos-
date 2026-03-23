import { Request, Router } from "express";
import multer from "multer";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { storagePut } from "../storage";
import { sdk } from "../_core/sdk";
import { securityLog } from "../_core/security";

const router = Router();
const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_UPLOAD_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const mimeAllowed = ALLOWED_MIME_TYPES.has(file.mimetype);
    const extensionAllowed = ALLOWED_EXTENSIONS.has(extension);

    if (!mimeAllowed || !extensionAllowed) {
      callback(new Error("Tipo de arquivo nao permitido"));
      return;
    }

    callback(null, true);
  },
});

function sanitizeExtension(fileName: string) {
  const extension = path.extname(fileName || "").toLowerCase();
  return ALLOWED_EXTENSIONS.has(extension) ? extension : ".bin";
}

async function saveLocally(filename: string, buffer: Buffer) {
  const uploadsDir = path.resolve(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buffer, { flag: "wx" });
  return `/uploads/${filename}`;
}

function buildAbsoluteUploadUrl(req: Request, relativePath: string) {
  const protocol = String(req.headers["x-forwarded-proto"] || req.protocol || "https").split(",")[0].trim();
  const host = String(req.headers["x-forwarded-host"] || req.get("host") || "").split(",")[0].trim();

  if (!host) return relativePath;
  return `${protocol}://${host}${relativePath}`;
}

router.post("/", async (req, res) => {
  try {
    const user = await sdk.authenticateRequest(req);
    if (user.role !== "admin") {
      securityLog("warn", "upload.denied_non_admin", { userId: user.id, requestIp: req.ip || "unknown" });
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    upload.single("file")(req, res, async uploadError => {
      if (uploadError) {
        securityLog("warn", "upload.rejected", {
          userId: user.id,
          requestIp: req.ip || "unknown",
          reason: uploadError.message,
        });
        res.status(400).json({ error: uploadError.message || "Upload invalido" });
        return;
      }

      try {
        if (!req.file) {
          res.status(400).json({ error: "Nenhum arquivo foi enviado" });
          return;
        }

        const { originalname, buffer, mimetype, size } = req.file;
        if (!ALLOWED_MIME_TYPES.has(mimetype)) {
          res.status(400).json({ error: "Tipo de arquivo nao permitido" });
          return;
        }

        if (size > MAX_UPLOAD_SIZE_BYTES) {
          res.status(400).json({ error: "Arquivo excede o tamanho maximo permitido" });
          return;
        }

        const filename = `${randomUUID()}${sanitizeExtension(originalname)}`;

        try {
          const { url } = await storagePut(`uploads/${filename}`, buffer, mimetype);
          securityLog("info", "upload.saved_remote", { userId: user.id, requestIp: req.ip || "unknown", fileName: filename });
          res.json({ success: true, url, filename, storage: "remote" });
          return;
        } catch (storageError) {
          securityLog("warn", "upload.remote_storage_unavailable", {
            userId: user.id,
            requestIp: req.ip || "unknown",
            reason: storageError instanceof Error ? storageError.message : "unknown",
          });
          const localUrl = await saveLocally(filename, buffer);
          res.json({
            success: true,
            url: buildAbsoluteUploadUrl(req, localUrl),
            filename,
            storage: "local",
          });
        }
      } catch (error) {
        securityLog("error", "upload.failed", {
          userId: user.id,
          requestIp: req.ip || "unknown",
          reason: error instanceof Error ? error.message : "unknown",
        });
        res.status(500).json({ error: "Nao foi possivel enviar o arquivo" });
      }
    });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
