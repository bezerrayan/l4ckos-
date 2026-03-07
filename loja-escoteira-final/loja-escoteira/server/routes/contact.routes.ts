import { Router } from "express";
import { sendContactEmail } from "../mailer.js";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body ?? {};

    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    await sendContactEmail(String(name), String(email), String(message));
    res.json({ success: true });
  } catch (error) {
    console.error("[Contact] Failed to send email", error);
    res.status(500).json({ success: false, error: "Failed to send contact email" });
  }
});

export default router;
