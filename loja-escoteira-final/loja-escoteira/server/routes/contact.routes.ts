import { Router } from "express";
import {
  sendAutoReplyToCustomer,
  sendContactNotificationToStore,
} from "../services/emailService.js";

const router = Router();

function sanitizeInput(value: unknown) {
  return String(value ?? "").trim();
}

// Frontend form should call this endpoint:
// POST /api/contact
// Compatible payload: { name, email, message, subject? }
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, subject } = req.body ?? {};
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);
    const cleanSubject = sanitizeInput(subject);

    if (!cleanName) return res.status(400).json({ success: false, error: "O campo name e obrigatorio." });
    if (!cleanEmail) return res.status(400).json({ success: false, error: "O campo email e obrigatorio." });
    if (!cleanMessage) return res.status(400).json({ success: false, error: "O campo message e obrigatorio." });

    await sendContactNotificationToStore({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    await sendAutoReplyToCustomer({
      name: cleanName,
      email: cleanEmail,
    });

    return res.status(200).json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("[Contact] Failed to process contact flow", {
      route: "/api/contact",
      provider: "resend",
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error && error.cause ? error.cause : undefined,
    });
    return res.status(500).json({ success: false, error: "Erro ao enviar mensagem." });
  }
});

// Minimal test endpoint for provider verification.
// Keep disabled in production by default and enable only with CONTACT_TEST_ENABLED=true.
router.post("/contact/test", async (_req, res) => {
  if (process.env.CONTACT_TEST_ENABLED !== "true") {
    return res.status(404).json({ success: false, error: "Not found" });
  }

  try {
    await sendContactNotificationToStore({
      name: "Teste da API",
      email: "no-reply@l4ckos.com.br",
      subject: "Teste de contato",
      message: "Teste do endpoint /api/contact/test.",
    });
    return res.status(200).json({ success: true, message: "Teste enviado com sucesso." });
  } catch (error) {
    console.error("[ContactTest] Failed to send email", {
      route: "/api/contact/test",
      provider: "resend",
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({ success: false, error: "Erro ao enviar teste." });
  }
});

export default router;
