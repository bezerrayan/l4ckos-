import type { Request, Response } from "express";
import { createWaitlistEmail, getWaitlistEmailByEmail } from "../db";
import { sendWaitlistAutoReply, sendWaitlistEmail } from "../services/emailService.js";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function createWaitlistEntry(req: Request, res: Response) {
  try {
    const rawEmail = String(req.body?.email ?? "");
    const email = rawEmail.trim().toLowerCase();

    if (!isValidEmail(email)) {
      res.status(400).json({ success: false, message: "Digite um email valido." });
      return;
    }

    const existing = await getWaitlistEmailByEmail(email);
    if (existing) {
      res.status(200).json({ success: true, message: "Este email ja esta na lista de espera." });
      return;
    }

    await createWaitlistEmail(email);

    try {
      await sendWaitlistEmail({ email });
    } catch (mailError) {
      // Nao bloqueia cadastro na waitlist por falha de notificacao.
      console.error("[Waitlist] Failed to send notification email", {
        name: mailError instanceof Error ? mailError.name : "UnknownError",
        message: mailError instanceof Error ? mailError.message : "Unknown error",
      });
    }

    try {
      await sendWaitlistAutoReply({ email });
    } catch (autoReplyError) {
      // Nao bloqueia cadastro na waitlist por falha de auto resposta.
      console.error("[Waitlist] Failed to send auto-reply email", {
        name: autoReplyError instanceof Error ? autoReplyError.name : "UnknownError",
        message: autoReplyError instanceof Error ? autoReplyError.message : "Unknown error",
      });
    }

    res.status(201).json({ success: true, message: "Voce sera avisado do lancamento." });
  } catch (error) {
    const duplicateError = (error as { code?: string } | undefined)?.code === "ER_DUP_ENTRY";
    if (duplicateError) {
      res.status(200).json({ success: true, message: "Este email ja esta na lista de espera." });
      return;
    }

    console.error("[Waitlist] Failed to save email", error);
    res.status(500).json({ success: false, message: "Nao foi possivel salvar seu email agora." });
  }
}
