import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail({ name, email, subject, message }) {
  const from = sanitizeText(process.env.EMAIL_FROM);
  const to = sanitizeText(process.env.EMAIL_TO);

  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }
  if (!from) {
    throw new Error("Missing EMAIL_FROM");
  }
  if (!to) {
    throw new Error("Missing EMAIL_TO");
  }

  const cleanName = sanitizeText(name);
  const cleanEmail = sanitizeText(email);
  const cleanSubject = sanitizeText(subject) || "Contato pelo site";
  const cleanMessage = sanitizeText(message);
  const sentAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111">
      <h2>Novo contato do site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(cleanSubject)}</p>
      <p><strong>Mensagem:</strong><br/>${escapeHtml(cleanMessage).replaceAll("\n", "<br/>")}</p>
      <p><strong>Data/hora:</strong> ${escapeHtml(sentAt)}</p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: cleanEmail,
    subject: `Novo contato do site - ${cleanSubject}`,
    html,
  });

  if (error) {
    const err = new Error(error.message || "Resend failed");
    err.name = "ResendError";
    throw err;
  }

  return data;
}

