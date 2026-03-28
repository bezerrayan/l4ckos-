import type { Response } from "express";
import { Router } from "express";
import {
  sendAutoReplyToCustomer,
  sendContactNotificationToStore,
} from "../services/emailService.js";
import { buildApiErrorResponse } from "../_core/appErrors";
import { securityLog } from "../_core/security";

const router = Router();

function sanitizeInput(value: unknown) {
  return String(value ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendError(res: Response, status: number, code: string, message: string) {
  res.status(status).json(buildApiErrorResponse({ status, code, message }));
}

function validateContactPayload(payload: unknown) {
  const body = (payload ?? {}) as Record<string, unknown>;
  const cleanName = sanitizeInput(body.name);
  const cleanEmail = sanitizeInput(body.email).toLowerCase();
  const cleanMessage = sanitizeInput(body.message);
  const cleanSubject = sanitizeInput(body.subject);
  const cleanPhone = sanitizeInput(body.phone);

  if (cleanName.length < 2 || cleanName.length > 120) {
    return { error: "Informe um nome válido." } as const;
  }

  if (!cleanEmail || cleanEmail.length > 160 || !isValidEmail(cleanEmail)) {
    return { error: "Informe um e-mail válido." } as const;
  }

  if (cleanSubject.length > 160) {
    return { error: "O assunto está muito longo." } as const;
  }

  if (cleanPhone.length > 40) {
    return { error: "O telefone informado é inválido." } as const;
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
    return { error: "Escreva uma mensagem entre 10 e 5000 caracteres." } as const;
  }

  return {
    cleanName,
    cleanEmail,
    cleanMessage,
    cleanSubject,
    cleanPhone,
  } as const;
}

router.post("/contact", async (req, res) => {
  try {
    const parsed = validateContactPayload(req.body);
    if ("error" in parsed && parsed.error) {
      sendError(res, 400, "INVALID_CONTACT_INPUT", parsed.error);
      return;
    }

    await sendContactNotificationToStore({
      name: parsed.cleanName,
      email: parsed.cleanEmail,
      subject: parsed.cleanPhone ? `${parsed.cleanSubject || "Contato"} | Tel: ${parsed.cleanPhone}` : parsed.cleanSubject,
      message: parsed.cleanMessage + (parsed.cleanPhone ? `\n\nTelefone: ${parsed.cleanPhone}` : ""),
    });

    try {
      await sendAutoReplyToCustomer({
        name: parsed.cleanName,
        email: parsed.cleanEmail,
      });
    } catch (error) {
      securityLog("warn", "contact.auto_reply_failed", {
        route: "/api/contact",
        requestIp: req.ip || "unknown",
        reason: error instanceof Error ? error.message : "unknown",
      });

      res.status(200).json({
        success: true,
        code: "MESSAGE_RECEIVED",
        message: "Recebemos sua mensagem. Nossa equipe vai continuar o atendimento por e-mail.",
      });
      return;
    }

    res.status(200).json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    securityLog("error", "contact.flow_failed", {
      route: "/api/contact",
      requestIp: req.ip || "unknown",
      reason: error instanceof Error ? error.message : "unknown",
    });

    sendError(res, 500, "CONTACT_SEND_FAILED", "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.");
  }
});

router.post("/contact/test", async (_req, res) => {
  if (process.env.NODE_ENV === "production" || process.env.CONTACT_TEST_ENABLED !== "true") {
    res.status(404).json({ success: false, error: "Not found" });
    return;
  }

  try {
    await sendContactNotificationToStore({
      name: "Teste da API",
      email: "no-reply@l4ckos.com.br",
      subject: "Teste de contato",
      message: "Teste do endpoint /api/contact/test.",
    });
    res.status(200).json({ success: true, message: "Teste enviado com sucesso." });
  } catch (error) {
    securityLog("warn", "contact.test_failed", {
      route: "/api/contact/test",
      reason: error instanceof Error ? error.message : "unknown",
    });
    res.status(500).json({ success: false, error: "Erro ao enviar teste." });
  }
});

export default router;
