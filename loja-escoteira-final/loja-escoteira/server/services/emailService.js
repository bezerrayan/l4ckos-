import { Resend } from "resend";
import { ContactAutoReplyEmail } from "../emails/ContactAutoReplyEmail.jsx";
import { OrderReceivedEmail } from "../emails/OrderReceivedEmail.jsx";
import { OrderShippedEmail } from "../emails/OrderShippedEmail.jsx";
import { PaymentApprovedEmail } from "../emails/PaymentApprovedEmail.jsx";
import { ResetPasswordEmail } from "../emails/ResetPasswordEmail.jsx";
import { WelcomeEmail } from "../emails/WelcomeEmail.jsx";

let resendClient = null;

function getResendClient() {
  const apiKey = sanitizeText(process.env.RESEND_API_KEY);
  if (!apiKey) {
    throw new Error("Missing env var: RESEND_API_KEY");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function sanitizeEmail(value) {
  return sanitizeText(value).toLowerCase();
}

function escapeHtml(value) {
  return sanitizeText(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requireEnv(name, fallbackNames = []) {
  const candidates = [name, ...fallbackNames];
  for (const key of candidates) {
    const value = sanitizeText(process.env[key]);
    if (value) return value;
  }
  throw new Error(`Missing env var: ${name}`);
}

function getOptionalEnv(name) {
  const value = sanitizeText(process.env[name]);
  return value || "";
}

function brDateTime() {
  return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

function getAppBaseUrl() {
  const baseUrl =
    sanitizeText(process.env.APP_BASE_URL) ||
    sanitizeText(process.env.FRONTEND_URL) ||
    "https://l4ckos.com.br";
  return baseUrl.replace(/\/$/, "");
}

function getUniqueSenderCandidates() {
  const candidates = [
    getOptionalEnv("EMAIL_FROM_CONTACT"),
    getOptionalEnv("EMAIL_FROM_NOREPLY"),
    getOptionalEnv("EMAIL_FROM"),
  ]
    .map(sanitizeText)
    .filter(Boolean);
  return [...new Set(candidates)];
}

function getEmailSignatureConfig() {
  return {
    logoUrl: sanitizeText(process.env.EMAIL_SIGNATURE_LOGO_URL),
    name: sanitizeText(process.env.EMAIL_SIGNATURE_NAME) || "Yan Bezerra",
    role: sanitizeText(process.env.EMAIL_SIGNATURE_ROLE) || "FOUNDER | L4CKOS",
    website: sanitizeText(process.env.EMAIL_SIGNATURE_WEBSITE) || "https://l4ckos.com.br",
    instagramUrl:
      sanitizeText(process.env.EMAIL_SIGNATURE_INSTAGRAM_URL) || "https://instagram.com/l4ckosstore",
    instagramLabel: sanitizeText(process.env.EMAIL_SIGNATURE_INSTAGRAM_LABEL) || "@l4ckosstore",
    contactEmail: sanitizeText(process.env.EMAIL_SIGNATURE_CONTACT_EMAIL) || "yandev@l4ckos.com.br",
  };
}

function buildEmailSignatureHtml() {
  const cfg = getEmailSignatureConfig();
  const safeWebsiteHref = cfg.website.startsWith("http") ? cfg.website : `https://${cfg.website}`;
  const safeWebsiteLabel = cfg.website.replace(/^https?:\/\//, "");

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;border:0;border-radius:0;background:#080808;padding:24px 8px 20px;max-width:520px;margin-left:auto;margin-right:auto;">
      <tr>
        <td style="width:250px;vertical-align:middle;padding-right:12px">
          ${
            cfg.logoUrl
              ? `<img src="${escapeHtml(cfg.logoUrl)}" alt="L4CKOS" width="240" style="display:block;border:0;outline:none;text-decoration:none;width:240px;height:auto" />`
              : `<div style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:38px;font-weight:700;color:#f0ede8;letter-spacing:2px;">L4CKOS</div>`
          }
        </td>
        <td style="vertical-align:top;padding-left:22px;padding-top:2px">
          <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;color:#f0ede8;letter-spacing:0.3px;line-height:1.2;">${escapeHtml(cfg.name)}</p>
          <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:400;color:#e8002a;letter-spacing:2.4px;text-transform:uppercase;line-height:1;">${escapeHtml(cfg.role)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr><td style="padding-bottom:5px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
                <td style="width:18px;height:18px;min-width:18px;background-color:#e8002a;font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;color:#ffffff;text-align:center;vertical-align:middle;line-height:18px;">W</td>
                <td style="padding-left:9px;vertical-align:middle;"><a href="${escapeHtml(safeWebsiteHref)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8f98a3;text-decoration:none;letter-spacing:0.1px;">${escapeHtml(safeWebsiteLabel)}</a></td>
              </tr></table>
            </td></tr>
            <tr><td style="padding-bottom:5px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
                <td style="width:18px;height:18px;min-width:18px;background-color:#e8002a;font-family:Arial,Helvetica,sans-serif;font-size:7px;font-weight:700;color:#ffffff;text-align:center;vertical-align:middle;line-height:18px;">IG</td>
                <td style="padding-left:9px;vertical-align:middle;"><a href="${escapeHtml(cfg.instagramUrl)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8f98a3;text-decoration:none;letter-spacing:0.1px;">${escapeHtml(cfg.instagramLabel)}</a></td>
              </tr></table>
            </td></tr>
            <tr><td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
                <td style="width:18px;height:18px;min-width:18px;background-color:#e8002a;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;color:#ffffff;text-align:center;vertical-align:middle;line-height:18px;">@</td>
                <td style="padding-left:9px;vertical-align:middle;"><a href="mailto:${escapeHtml(cfg.contactEmail)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8f98a3;text-decoration:none;letter-spacing:0.1px;">${escapeHtml(cfg.contactEmail)}</a></td>
              </tr></table>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:20px;max-width:520px;margin-left:auto;margin-right:auto;">
      <tr>
        <td style="width:28px;height:1px;background-color:#e8002a;font-size:0;line-height:0;">&nbsp;</td>
        <td style="height:1px;background-color:#232833;font-size:0;line-height:0;">&nbsp;</td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:10px;max-width:520px;margin-left:auto;margin-right:auto;">
      <tr>
        <td style="font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#2f3540;letter-spacing:3.5px;text-transform:uppercase;text-align:center;line-height:1;padding:0;">
          STREETWEAR&nbsp;&nbsp;&bull;&nbsp;&nbsp;OUTDOOR&nbsp;&nbsp;&bull;&nbsp;&nbsp;LIFESTYLE
        </td>
      </tr>
    </table>
  `;
}

function buildContactAutoReplyHtml(name) {
  const safeName = escapeHtml(name || "Cliente");
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;max-width:680px">
      <h2 style="margin:0 0 12px">Recebemos sua mensagem</h2>
      <p>Olá, ${safeName}.</p>
      <p>Obrigado por entrar em contato com a L4CKOS. Sua mensagem foi recebida com sucesso.</p>
      <p>Nosso time vai responder em breve.</p>
      <p style="font-size:12px;color:#666;margin-top:18px">
        Por segurança, não compartilhe senhas, códigos ou dados sensíveis por e-mail.
      </p>
      <p style="font-size:12px;color:#666;margin:0">Este é um e-mail automático da L4CKOS.</p>
      ${buildEmailSignatureHtml()}
    </div>
  `;
}

async function sendWithResend({ from, to, replyTo, subject, html, react }) {
  const resend = getResendClient();

  const payload = {
    from: sanitizeText(from),
    to: Array.isArray(to) ? to.map(sanitizeText).filter(Boolean) : [sanitizeText(to)],
    subject: sanitizeText(subject),
  };

  if (sanitizeText(replyTo)) payload.replyTo = sanitizeText(replyTo);
  if (html) payload.html = html;
  if (react) payload.react = react;

  const { data, error } = await resend.emails.send(payload);
  if (error) {
    const err = new Error(error.message || "Resend request failed");
    err.name = "ResendError";
    err.cause = error;
    throw err;
  }

  return data;
}

export async function sendContactNotificationToStore({ name, email, subject, message }) {
  const from = requireEnv("EMAIL_FROM_CONTACT", ["EMAIL_FROM"]);
  const to = requireEnv("EMAIL_TO_CONTACT", ["EMAIL_TO"]);
  const cleanName = sanitizeText(name);
  const cleanEmail = sanitizeEmail(email);
  const cleanSubject = sanitizeText(subject) || "L4CKOS";
  const cleanMessage = sanitizeText(message);

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;max-width:680px">
      <h2 style="margin:0 0 12px">Novo contato do site - L4CKOS</h2>
      <p><strong>Nome:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(cleanSubject)}</p>
      <p><strong>Mensagem:</strong><br/>${escapeHtml(cleanMessage).replaceAll("\n", "<br/>")}</p>
      <p><strong>Data/hora:</strong> ${escapeHtml(brDateTime())}</p>
      <p style="font-size:12px;color:#666;margin:0">Notificacao interna automatica da L4CKOS.</p>
      ${buildEmailSignatureHtml()}
    </div>
  `;

  return sendWithResend({
    from,
    to,
    replyTo: cleanEmail,
    subject: `Novo contato do site - ${cleanSubject}`,
    html,
  });
}

export async function sendAutoReplyToCustomer({ name, email }) {
  const toEmail = sanitizeEmail(email);
  const safeName = sanitizeText(name);
  const subject = "Recebemos sua mensagem - L4CKOS";
  const fromCandidates = getUniqueSenderCandidates();
  if (fromCandidates.length === 0) {
    throw new Error("Missing env var: EMAIL_FROM_NOREPLY");
  }

  let lastError = null;
  const replyTo = fromCandidates[1] || fromCandidates[0];

  // First attempt: React template
  for (const from of fromCandidates) {
    try {
      return await sendWithResend({
        from,
        to: toEmail,
        subject,
        replyTo,
        react: ContactAutoReplyEmail({ name: safeName }),
      });
    } catch (error) {
      lastError = error;
      console.error("[Email] Auto-reply failed with React template, trying next sender", {
        from,
        to: toEmail,
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : "Unknown error",
        cause: error instanceof Error ? error.cause : undefined,
      });
    }
  }

  // Second attempt: HTML fallback template
  const htmlFallback = buildContactAutoReplyHtml(safeName);
  for (const from of fromCandidates) {
    try {
      return await sendWithResend({
        from,
        to: toEmail,
        subject,
        replyTo,
        html: htmlFallback,
      });
    } catch (error) {
      lastError = error;
      console.error("[Email] Auto-reply failed with HTML fallback, trying next sender", {
        from,
        to: toEmail,
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : "Unknown error",
        cause: error instanceof Error ? error.cause : undefined,
      });
    }
  }

  throw lastError || new Error("Auto-reply failed for all sender candidates");
}

export async function sendWelcomeEmail({ name, email }) {
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    subject: "Bem-vindo à L4CKOS",
    react: WelcomeEmail({ name: sanitizeText(name) }),
  });
}

export async function sendSupportEmail({ to, subject, html }) {
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_SUPPORT", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeText(to) || requireEnv("EMAIL_TO_SUPPORT", ["EMAIL_TO_CONTACT", "EMAIL_TO"]),
    subject: sanitizeText(subject) || "Contato com suporte - L4CKOS",
    html: sanitizeText(html) || "<p>Mensagem de suporte.</p>",
  });
}

export async function sendSalesEmail({ to, subject, html }) {
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_SALES", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeText(to) || requireEnv("EMAIL_TO_SALES", ["EMAIL_TO_CONTACT", "EMAIL_TO"]),
    subject: sanitizeText(subject) || "Contato comercial - L4CKOS",
    html: sanitizeText(html) || "<p>Mensagem comercial.</p>",
  });
}

export async function sendFinanceEmail({ to, subject, html }) {
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_FINANCE", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeText(to) || requireEnv("EMAIL_TO_FINANCE", ["EMAIL_TO_CONTACT", "EMAIL_TO"]),
    subject: sanitizeText(subject) || "Contato financeiro - L4CKOS",
    html: sanitizeText(html) || "<p>Mensagem financeira.</p>",
  });
}

export async function sendOrderReceivedEmail({ customerName, customerEmail, orderNumber, items, total }) {
  const cleanOrder = sanitizeText(orderNumber);
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    subject: `Recebemos seu pedido #${cleanOrder}`,
    react: OrderReceivedEmail({
      customerName: sanitizeText(customerName),
      orderNumber: cleanOrder,
      items: Array.isArray(items) ? items : [],
      total: sanitizeText(total),
    }),
  });
}

export async function sendPaymentApprovedEmail({ customerName, customerEmail, orderNumber, total }) {
  const cleanOrder = sanitizeText(orderNumber);
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_FINANCE", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    subject: `Pagamento aprovado - Pedido #${cleanOrder}`,
    react: PaymentApprovedEmail({
      customerName: sanitizeText(customerName),
      orderNumber: cleanOrder,
      total: sanitizeText(total),
    }),
  });
}

export async function sendOrderShippedEmail({ customerName, customerEmail, orderNumber, trackingCode, trackingUrl }) {
  const cleanOrder = sanitizeText(orderNumber);
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_SALES", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    subject: `Seu pedido foi enviado #${cleanOrder}`,
    react: OrderShippedEmail({
      customerName: sanitizeText(customerName),
      orderNumber: cleanOrder,
      trackingCode: sanitizeText(trackingCode),
      trackingUrl: sanitizeText(trackingUrl),
    }),
  });
}

export async function sendResetPasswordEmail({ name, email, resetUrl }) {
  return sendWithResend({
    from: requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    subject: "Redefinir senha - L4CKOS",
    react: ResetPasswordEmail({
      name: sanitizeText(name),
      resetUrl: sanitizeText(resetUrl),
    }),
  });
}

export async function sendWaitlistEmail({ email }) {
  const from = requireEnv("EMAIL_FROM_CONTACT", ["EMAIL_FROM"]);
  const to = requireEnv("EMAIL_TO_CONTACT", ["EMAIL_TO"]);
  const cleanEmail = sanitizeEmail(email);

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;">
      <h2>Novo cadastro na lista de espera</h2>
      <p><strong>E-mail:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Data/hora:</strong> ${escapeHtml(brDateTime())}</p>
      <p>Origem: seção Em Breve (waitlist).</p>
      ${buildEmailSignatureHtml()}
    </div>
  `;

  return sendWithResend({
    from,
    to,
    replyTo: cleanEmail,
    subject: "Nova inscrição na lista de espera - L4CKOS",
    html,
  });
}

export async function sendWaitlistAutoReply({ email }) {
  const cleanEmail = sanitizeEmail(email);
  const fromCandidates = getUniqueSenderCandidates();
  if (fromCandidates.length === 0) {
    throw new Error("Missing env var: EMAIL_FROM_NOREPLY");
  }

  const replyTo = sanitizeText(getOptionalEnv("EMAIL_FROM_CONTACT")) || fromCandidates[0];
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;max-width:680px">
      <h2 style="margin:0 0 12px">Cadastro confirmado na lista de espera</h2>
      <p>Recebemos seu cadastro na lista de espera da L4CKOS.</p>
      <p>Você será avisado em primeira mão quando a loja abrir oficialmente.</p>
      <p style="font-size:12px;color:#666;margin-top:18px">
        Este é um e-mail automático. Não é necessário responder.
      </p>
      <p style="font-size:12px;color:#666;margin:0">L4CKOS - Lista de espera</p>
      ${buildEmailSignatureHtml()}
    </div>
  `;

  let lastError = null;
  for (const from of fromCandidates) {
    try {
      return await sendWithResend({
        from,
        to: cleanEmail,
        subject: "Você entrou na lista de espera - L4CKOS",
        replyTo,
        html,
      });
    } catch (error) {
      lastError = error;
      console.error("[Email] Waitlist auto-reply failed, trying next sender", {
        from,
        to: cleanEmail,
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : "Unknown error",
        cause: error instanceof Error ? error.cause : undefined,
      });
    }
  }

  throw lastError || new Error("Waitlist auto-reply failed for all sender candidates");
}

export async function sendWaitlistLaunchEmail({
  email,
  couponCode,
  discountPercent = 15,
  launchUrl,
}) {
  const cleanEmail = sanitizeEmail(email);
  const cleanCouponCode = sanitizeText(couponCode).toUpperCase();
  const cleanDiscountPercent = Number(discountPercent) > 0 ? Number(discountPercent) : 15;
  const cleanLaunchUrl = sanitizeText(launchUrl) || getAppBaseUrl();
  const from = requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]);
  const replyTo = sanitizeText(getOptionalEnv("EMAIL_FROM_CONTACT")) || from;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.7;max-width:680px">
      <h2 style="margin:0 0 14px">Parabéns, a hora chegou.</h2>
      <p>A loja da L4CKOS está oficialmente no ar.</p>
      <p>
        Como recompensa por ter garantido sua vaga com antecedência, você recebeu um
        <strong>cupom exclusivo de ${escapeHtml(String(cleanDiscountPercent))}% OFF</strong>.
      </p>
      <p>
        Use o código <strong style="letter-spacing:1px">${escapeHtml(cleanCouponCode)}</strong>
        para aproveitar enquanto ele estiver disponível.
      </p>
      <p style="margin:18px 0 22px">
        <a
          href="${escapeHtml(cleanLaunchUrl)}"
          target="_blank"
          style="display:inline-block;background:#e8002a;color:#ffffff;text-decoration:none;padding:12px 18px;font-weight:700"
        >
          Entrar na loja agora
        </a>
      </p>
      <p style="font-size:12px;color:#666;margin-top:18px">
        Este é um e-mail automático da L4CKOS. Se você não quiser mais receber avisos,
        basta nos responder solicitando a remoção da lista.
      </p>
      ${buildEmailSignatureHtml()}
    </div>
  `;

  return sendWithResend({
    from,
    to: cleanEmail,
    subject: `A loja abriu: seu cupom de ${cleanDiscountPercent}% OFF está liberado`,
    replyTo,
    html,
  });
}
