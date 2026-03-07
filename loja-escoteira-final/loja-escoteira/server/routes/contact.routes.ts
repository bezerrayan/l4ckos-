import { Router } from "express";
import { sendContactEmail } from "../services/emailService.js";

const router = Router();

function sanitizeInput(value: unknown) {
  return String(value ?? "").trim();
}

// Frontend form should call: POST /api/contact
// Payload compatible with existing clients: { name, email, message, subject? }
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, subject } = req.body ?? {};
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);
    const cleanSubject = sanitizeInput(subject);

    if (!cleanName) {
      res.status(400).json({ success: false, error: "O campo name é obrigatório." });
      return;
    }
    if (!cleanEmail) {
      res.status(400).json({ success: false, error: "O campo email é obrigatório." });
      return;
    }
    if (!cleanMessage) {
      res.status(400).json({ success: false, error: "O campo message é obrigatório." });
      return;
    }

    await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    res.status(200).json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("[Contact] Failed to send email", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      provider: "resend",
    });
    res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

// Minimal test endpoint to verify provider integration.
// Keep disabled in production by default. Enable only with CONTACT_TEST_ENABLED=true.
router.post("/contact/test", async (_req, res) => {
  if (process.env.CONTACT_TEST_ENABLED !== "true") {
    res.status(404).json({ success: false, error: "Not found" });
    return;
  }

  try {
    await sendContactEmail({
      name: "Teste da API",
      email: "no-reply@l4ckos.com.br",
      subject: "Teste de contato",
      message: "Teste do endpoint /api/contact/test.",
    });
    res.status(200).json({ success: true, message: "Teste enviado com sucesso." });
  } catch (error) {
    console.error("[ContactTest] Failed to send email", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      provider: "resend",
    });
    res.status(500).json({ success: false, error: "Erro ao enviar teste." });
  }
});

export default router;
