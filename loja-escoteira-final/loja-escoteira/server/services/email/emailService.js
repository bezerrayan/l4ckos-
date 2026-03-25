import { getResendClient } from "./resendClient.js";
import { renderEmailTemplate } from "./emailRenderer.js";
import { emailSubjects } from "../../utils/email/emailSubjects.js";

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function sanitizeEmail(value) {
  return sanitizeText(value).toLowerCase();
}

function resolveAppUrl() {
  return (
    sanitizeText(process.env.APP_URL) ||
    sanitizeText(process.env.APP_BASE_URL) ||
    sanitizeText(process.env.FRONTEND_URL) ||
    "https://l4ckos.com.br"
  ).replace(/\/$/, "");
}

function requireEmailConfig(name, fallbacks = []) {
  for (const key of [name, ...fallbacks]) {
    const value = sanitizeText(process.env[key]);
    if (value) return value;
  }
  throw new Error(`Missing env var: ${name}`);
}

function getDefaultReplyTo() {
  return (
    sanitizeText(process.env.EMAIL_REPLY_TO) ||
    sanitizeText(process.env.SUPPORT_EMAIL) ||
    sanitizeText(process.env.EMAIL_FROM_CONTACT) ||
    sanitizeText(process.env.EMAIL_FROM)
  );
}

function buildSubject(subjectKey, payload) {
  const entry = emailSubjects[subjectKey];
  if (!entry) throw new Error(`Unknown email subject key: ${subjectKey}`);
  return typeof entry === "function" ? entry(payload ?? {}) : entry;
}

async function sendEmail({ templateName, subjectKey, subjectPayload, templatePayload, from, to, replyTo, tags }) {
  const client = getResendClient();
  const recipients = (Array.isArray(to) ? to : [to]).map(sanitizeText).filter(Boolean);
  if (!recipients.length) {
    throw new Error("Email recipients are required");
  }

  const subject = buildSubject(subjectKey, subjectPayload);
  const react = renderEmailTemplate(templateName, templatePayload);
  const payload = {
    from,
    to: recipients,
    subject,
    react,
    tags,
  };

  if (replyTo) payload.replyTo = replyTo;

  const { data, error } = await client.emails.send(payload);
  if (error) {
    const err = new Error(error.message || "Resend request failed");
    err.name = "ResendError";
    throw err;
  }

  return data;
}

function normalizeOrderItems(items = []) {
  return items.map(item => ({
    name: sanitizeText(item.name || item.productName || "Produto"),
    quantity: Number(item.quantity || 1),
    price: sanitizeText(item.price || item.formattedPrice || ""),
  }));
}

function logEmailFailure(scope, error, context = {}) {
  console.error(`[Email] ${scope}`, {
    ...context,
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown error",
  });
}

export async function sendComingSoonConfirmationEmail({ email, name, launchUrl }) {
  return sendEmail({
    templateName: "comingSoonConfirmation",
    subjectKey: "comingSoonConfirmation",
    templatePayload: { name, launchUrl: launchUrl || resolveAppUrl() },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendContactConfirmationEmail({ email, name }) {
  return sendEmail({
    templateName: "contactConfirmation",
    subjectKey: "contactConfirmation",
    templatePayload: { name },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendNewContactInternalEmail({ name, email, phone, subject, message }) {
  const to = sanitizeText(process.env.CONTACT_NOTIFICATION_EMAIL) || requireEmailConfig("EMAIL_TO_CONTACT", ["EMAIL_TO"]);
  return sendEmail({
    templateName: "newContactInternal",
    subjectKey: "newContactInternal",
    subjectPayload: { subject },
    templatePayload: { name, email, phone, subject, message },
    from: requireEmailConfig("EMAIL_FROM_CONTACT", ["EMAIL_FROM"]),
    to,
    replyTo: sanitizeEmail(email),
  });
}

export async function sendWelcomeAccountEmail({ email, name }) {
  return sendEmail({
    templateName: "welcomeAccount",
    subjectKey: "welcomeAccount",
    templatePayload: { name, appUrl: `${resolveAppUrl()}/login` },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendPasswordResetEmail({ email, name, resetUrl }) {
  return sendEmail({
    templateName: "passwordReset",
    subjectKey: "passwordReset",
    templatePayload: { name, resetUrl },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendOrderCreatedEmail({ customerEmail, customerName, orderNumber, total, items, orderUrl }) {
  return sendEmail({
    templateName: "orderCreated",
    subjectKey: "orderCreated",
    subjectPayload: { orderNumber },
    templatePayload: {
      customerName,
      orderNumber,
      total,
      items: normalizeOrderItems(items),
      orderUrl,
    },
    from: requireEmailConfig("ORDERS_EMAIL", ["EMAIL_FROM_SALES", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendPaymentPendingEmail({ customerEmail, customerName, orderNumber, total, paymentUrl, dueLabel }) {
  return sendEmail({
    templateName: "paymentPending",
    subjectKey: "paymentPending",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, total, paymentUrl, dueLabel },
    from: requireEmailConfig("EMAIL_FROM_FINANCE", ["EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendPaymentApprovedEmail({ customerEmail, customerName, orderNumber, total }) {
  return sendEmail({
    templateName: "paymentApproved",
    subjectKey: "paymentApproved",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, total },
    from: requireEmailConfig("EMAIL_FROM_FINANCE", ["EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendPaymentFailedEmail({ customerEmail, customerName, orderNumber, total, paymentUrl, failureReason }) {
  return sendEmail({
    templateName: "paymentFailed",
    subjectKey: "paymentFailed",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, total, paymentUrl, failureReason },
    from: requireEmailConfig("EMAIL_FROM_FINANCE", ["EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendOrderPreparingEmail({ customerEmail, customerName, orderNumber, total }) {
  return sendEmail({
    templateName: "orderPreparing",
    subjectKey: "orderPreparing",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, total },
    from: requireEmailConfig("ORDERS_EMAIL", ["EMAIL_FROM_SALES", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendShippingEmail({ customerEmail, customerName, orderNumber, trackingCode, trackingUrl }) {
  return sendEmail({
    templateName: "orderShipped",
    subjectKey: "orderShipped",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, trackingCode, trackingUrl },
    from: requireEmailConfig("ORDERS_EMAIL", ["EMAIL_FROM_SALES", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendOrderDeliveredEmail({ customerEmail, customerName, orderNumber, orderUrl }) {
  return sendEmail({
    templateName: "orderDelivered",
    subjectKey: "orderDelivered",
    subjectPayload: { orderNumber },
    templatePayload: { customerName, orderNumber, orderUrl },
    from: requireEmailConfig("ORDERS_EMAIL", ["EMAIL_FROM_SALES", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendReviewRequestEmail({ customerEmail, customerName, orderNumber, reviewUrl }) {
  return sendEmail({
    templateName: "reviewRequest",
    subjectKey: "reviewRequest",
    subjectPayload: { orderNumber },
    templatePayload: { name: customerName, orderNumber, reviewUrl },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(customerEmail),
    replyTo: getDefaultReplyTo(),
  });
}

export async function sendWaitlistLaunchEmail({ email, couponCode, discountPercent, launchUrl }) {
  return sendEmail({
    templateName: "launchAnnouncement",
    subjectKey: "launchAnnouncement",
    templatePayload: { launchUrl, couponCode, discountPercent, name: "cliente" },
    from: requireEmailConfig("NO_REPLY_EMAIL", ["EMAIL_FROM_NOREPLY", "EMAIL_FROM"]),
    to: sanitizeEmail(email),
    replyTo: getDefaultReplyTo(),
  });
}

export { logEmailFailure, normalizeOrderItems, resolveAppUrl };
