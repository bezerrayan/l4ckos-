import { Router } from "express";
import { unsubscribeByToken } from "../services/email/emailSubscriptions.js";

const router = Router();

router.get("/email/unsubscribe", async (req, res) => {
  const token = String(req.query.token ?? "").trim();
  if (!token) {
    return res.status(400).type("html").send(renderPage("Link invalido", "O link de descadastro esta incompleto."));
  }

  try {
    const email = await unsubscribeByToken(token, {
      reason: "unsubscribe_click",
      source: "marketing_email",
    });

    return res
      .status(200)
      .type("html")
      .send(renderPage("Descadastro confirmado", `${email} nao recebera mais emails de marketing da L4CKOS.`));
  } catch {
    return res
      .status(400)
      .type("html")
      .send(renderPage("Link invalido", "Nao foi possivel validar o link de descadastro."));
  }
});

function renderPage(title: string, description: string) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)} - L4CKOS</title>
    <style>
      body{margin:0;background:#060606;color:#f3efe7;font-family:Arial,Helvetica,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
      .card{max-width:520px;width:100%;background:#0d0d0d;border:1px solid #1d1d1d;border-radius:24px;padding:32px;box-shadow:0 28px 80px rgba(0,0,0,.45)}
      .kicker{margin:0 0 16px;color:#e11d48;font-size:12px;letter-spacing:.24em;text-transform:uppercase;font-weight:700}
      h1{margin:0 0 12px;font-size:32px;line-height:1.1}
      p{margin:0;color:#b4b9c2;line-height:1.7}
    </style>
  </head>
  <body>
    <div class="card">
      <p class="kicker">L4CKOS</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
    </div>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default router;
