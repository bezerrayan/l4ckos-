import { Request, Router } from "express";
import multer from "multer";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { storagePut } from "../storage";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

function sanitizeFileName(fileName: string) {
  const extension = path.extname(fileName || "").slice(0, 12).toLowerCase();
  const baseName = path
    .basename(fileName || "arquivo", extension)
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "imagem";

  return `${baseName}${extension || ".bin"}`;
}

async function saveLocally(filename: string, buffer: Buffer) {
  const uploadsDir = path.resolve(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

function buildAbsoluteUploadUrl(req: Request, relativePath: string) {
  const protocol = String(req.headers["x-forwarded-proto"] || req.protocol || "https").split(",")[0].trim();
  const host = String(req.headers["x-forwarded-host"] || req.get("host") || "").split(",")[0].trim();

  if (!host) return relativePath;
  return `${protocol}://${host}${relativePath}`;
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
    }

    const { originalname, buffer, mimetype } = req.file;
    const timestamp = Date.now();
    const filename = `${timestamp}-${sanitizeFileName(originalname)}`;

    try {
      const { url } = await storagePut(`uploads/${filename}`, buffer, mimetype);
      return res.json({ success: true, url, filename, storage: "remote" });
    } catch (storageError) {
      console.warn("[Upload] Remote storage unavailable, falling back to local file system", storageError);
      const localUrl = await saveLocally(filename, buffer);
      return res.json({
        success: true,
        url: buildAbsoluteUploadUrl(req, localUrl),
        filename,
        storage: "local",
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Nao foi possivel enviar o arquivo" });
  }
});

export default router;

