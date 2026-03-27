import type { Request, Response } from "express";
import { createWaitlistEmail, getWaitlistEmailByEmail } from "../db";
import { sendWaitlistAutoReply, sendWaitlistEmail } from "../services/emailService.js";
import { securityLog } from "../_core/security";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function createWaitlistEntry(req: Request, res: Response) {
  try {
    const rawEmail = String(req.body?.email ?? "");
    const email = rawEmail.trim().toLowerCase();

    if (!isValidEmail(email)) {
      res.status(400).json({ success: false, message: "Digite um e-mail válido." });
      return;
    }

    const existing = await getWaitlistEmailByEmail(email);
    if (existing) {
      res.status(200).json({ success: true, message: "Este e-mail já está na lista de espera." });
      return;
    }

    await createWaitlistEmail(email);

    try {
      await sendWaitlistEmail({ email });
    } catch (mailError) {
      securityLog("warn", "waitlist.notification_email_failed", {
        reason: mailError instanceof Error ? mailError.message : "unknown",
      });
    }

    try {
      await sendWaitlistAutoReply({ email });
    } catch (autoReplyError) {
      securityLog("warn", "waitlist.auto_reply_failed", {
        reason: autoReplyError instanceof Error ? autoReplyError.message : "unknown",
      });
    }

    res.status(201).json({ success: true, message: "Você será avisado do lançamento." });
  } catch (error) {
    const duplicateError = (error as { code?: string } | undefined)?.code === "ER_DUP_ENTRY";
    if (duplicateError) {
      res.status(200).json({ success: true, message: "Este e-mail já está na lista de espera." });
      return;
    }

    securityLog("error", "waitlist.save_failed", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    res.status(500).json({ success: false, message: "Não foi possível salvar seu e-mail agora." });
  }
}
