import { Router } from "express";
import multer from "multer";
import { storagePut } from "../storage";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/upload - Upload de arquivo
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const { originalname, buffer, mimetype } = req.file;
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalname}`;

    // Upload para S3
    const { url } = await storagePut(`uploads/${filename}`, buffer, mimetype);

    res.json({ success: true, url, filename });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;
