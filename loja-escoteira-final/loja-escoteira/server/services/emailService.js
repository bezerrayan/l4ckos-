import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

function brDateTime() {
  return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

function requireEnv(name, fallbackNames = []) {
  const candidates = [name, ...fallbackNames];
  for (const key of candidates) {
    const value = sanitizeText(process.env[key]);
    if (value) return value;
  }
  throw new Error(`Missing env var: ${name}`);
}

async function sendEmail({ from, to, replyTo, subject, html }) {
  if (!sanitizeText(process.env.RESEND_API_KEY)) {
    throw new Error("Missing env var: RESEND_API_KEY");
  }

  const payload = {
    from: sanitizeText(from),
    to: Array.isArray(to) ? to.map(sanitizeText).filter(Boolean) : [sanitizeText(to)],
    subject: sanitizeText(subject),
    html,
  };

  if (sanitizeText(replyTo)) {
    payload.replyTo = sanitizeText(replyTo);
  }

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
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6;">
      <h2 style="margin-bottom:8px;">Novo contato do site</h2>
      <p style="margin:0 0 12px;">L4CKOS recebeu uma nova mensagem pelo formulario.</p>
      <table style="border-collapse:collapse; width:100%; max-width:680px;">
        <tr><td style="padding:6px 0; font-weight:700;">Nome</td><td style="padding:6px 0;">${escapeHtml(cleanName)}</td></tr>
        <tr><td style="padding:6px 0; font-weight:700;">E-mail</td><td style="padding:6px 0;">${escapeHtml(cleanEmail)}</td></tr>
        <tr><td style="padding:6px 0; font-weight:700;">Assunto</td><td style="padding:6px 0;">${escapeHtml(cleanSubject)}</td></tr>
        <tr><td style="padding:6px 0; font-weight:700; vertical-align:top;">Mensagem</td><td style="padding:6px 0;">${escapeHtml(cleanMessage).replaceAll("\n", "<br/>")}</td></tr>
        <tr><td style="padding:6px 0; font-weight:700;">Data/hora</td><td style="padding:6px 0;">${escapeHtml(brDateTime())}</td></tr>
      </table>
      <hr style="border:none; border-top:1px solid #ececec; margin:20px 0;" />
      <p style="font-size:12px; color:#666; margin:0;">L4CKOS - Notificacao interna de contato.</p>
    </div>
  `;

  return sendEmail({
    from,
    to,
    replyTo: cleanEmail,
    subject: `Novo contato do site - ${cleanSubject}`,
    html,
  });
}

export async function sendAutoReplyToCustomer({ name, email }) {
  const from = requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]);
  const cleanName = sanitizeText(name) || "Cliente";
  const cleanEmail = sanitizeEmail(email);

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6; max-width:680px;">
      <h2 style="margin-bottom:8px;">Recebemos sua mensagem</h2>
      <p>Ola, <strong>${escapeHtml(cleanName)}</strong>.</p>
      <p>Obrigado por entrar em contato com a <strong>L4CKOS</strong>. Sua mensagem foi recebida com sucesso e nosso time respondera em breve.</p>
      <p>Se precisar complementar alguma informacao, basta responder este e-mail.</p>
      <hr style="border:none; border-top:1px solid #ececec; margin:20px 0;" />
      <p style="font-size:12px; color:#666; margin:0;">Este e um e-mail automatico da L4CKOS. Por favor, nao compartilhe dados sensiveis.</p>
    </div>
  `;

  return sendEmail({
    from,
    to: cleanEmail,
    subject: "Recebemos sua mensagem - L4CKOS",
    html,
  });
}

export async function sendSupportEmail({ to, subject, html }) {
  return sendEmail({
    from: requireEnv("EMAIL_FROM_SUPPORT", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to,
    subject,
    html,
  });
}

export async function sendSalesEmail({ to, subject, html }) {
  return sendEmail({
    from: requireEnv("EMAIL_FROM_SALES", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to,
    subject,
    html,
  });
}

export async function sendFinanceEmail({ to, subject, html }) {
  return sendEmail({
    from: requireEnv("EMAIL_FROM_FINANCE", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]),
    to,
    subject,
    html,
  });
}

export async function sendOrderReceivedEmail({ customerName, customerEmail, orderNumber, items, total }) {
  const from = requireEnv("EMAIL_FROM_NOREPLY", ["EMAIL_FROM_CONTACT", "EMAIL_FROM"]);
  const cleanName = sanitizeText(customerName) || "Cliente";
  const cleanEmail = sanitizeEmail(customerEmail);
  const cleanOrder = sanitizeText(orderNumber);
  const cleanTotal = sanitizeText(total);
  const rows = Array.isArray(items)
    ? items
        .map((item) => {
          const title = escapeHtml(item?.name ?? item?.title ?? "Item");
          const qty = escapeHtml(item?.quantity ?? item?.qty ?? 1);
          const price = escapeHtml(item?.price ?? item?.unitPrice ?? "-");
          return `<tr><td style="padding:6px 0;">${title}</td><td style="padding:6px 0; text-align:center;">${qty}</td><td style="padding:6px 0; text-align:right;">${price}</td></tr>`;
        })
        .join("")
    : "";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6; max-width:700px;">
      <h2 style="margin-bottom:8px;">Pedido recebido com sucesso</h2>
      <p>Ola, <strong>${escapeHtml(cleanName)}</strong>! Recebemos seu pedido <strong>#${escapeHtml(cleanOrder)}</strong>.</p>
      <table style="border-collapse:collapse; width:100%; margin-top:12px;">
        <thead>
          <tr>
            <th align="left" style="padding:8px 0; border-bottom:1px solid #ececec;">Item</th>
            <th align="center" style="padding:8px 0; border-bottom:1px solid #ececec;">Qtd</th>
            <th align="right" style="padding:8px 0; border-bottom:1px solid #ececec;">Valor</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="3" style="padding:10px 0; color:#666;">Resumo indisponivel.</td></tr>'}</tbody>
      </table>
      <p style="margin-top:14px;"><strong>Total:</strong> ${escapeHtml(cleanTotal || "-")}</p>
      <p style="font-size:12px; color:#666;">Este e um e-mail automatico da L4CKOS.</p>
    </div>
  `;

  return sendEmail({
    from,
    to: cleanEmail,
    subject: `Recebemos seu pedido #${cleanOrder}`,
    html,
  });
}

export async function sendWaitlistEmail({ email }) {
  const from = requireEnv("EMAIL_FROM_CONTACT", ["EMAIL_FROM"]);
  const to = requireEnv("EMAIL_TO_CONTACT", ["EMAIL_TO"]);
  const cleanEmail = sanitizeEmail(email);

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6;">
      <h2>Novo cadastro na lista de espera</h2>
      <p><strong>E-mail:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Data/hora:</strong> ${escapeHtml(brDateTime())}</p>
      <p>Origem: secao Em Breve (waitlist).</p>
    </div>
  `;

  return sendEmail({
    from,
    to,
    replyTo: cleanEmail,
    subject: "Nova inscricao na lista de espera - L4CKOS",
    html,
  });
}
