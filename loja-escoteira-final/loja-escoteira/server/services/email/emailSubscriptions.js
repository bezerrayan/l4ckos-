import crypto from "node:crypto";
import { isEmailUnsubscribed, unsubscribeEmail } from "../../db";

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function sanitizeEmail(value) {
  return sanitizeText(value).toLowerCase();
}

function getSecret() {
  return (
    sanitizeText(process.env.EMAIL_UNSUBSCRIBE_SECRET) ||
    sanitizeText(process.env.JWT_SECRET) ||
    "l4ckos-email-secret"
  );
}

function toBase64Url(value) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function buildUnsubscribeToken(email) {
  const normalizedEmail = sanitizeEmail(email);
  if (!normalizedEmail) {
    throw new Error("Email is required");
  }

  const payload = toBase64Url(normalizedEmail);
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyUnsubscribeToken(token) {
  const value = sanitizeText(token);
  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    throw new Error("Invalid unsubscribe token");
  }

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  const valid =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!valid) {
    throw new Error("Invalid unsubscribe token");
  }

  return sanitizeEmail(fromBase64Url(payload));
}

export function resolveAppUrl() {
  return (
    sanitizeText(process.env.APP_URL) ||
    sanitizeText(process.env.APP_BASE_URL) ||
    sanitizeText(process.env.FRONTEND_URL) ||
    "https://l4ckos.com.br"
  ).replace(/\/$/, "");
}

export function buildUnsubscribeUrl(email) {
  const token = buildUnsubscribeToken(email);
  return `${resolveAppUrl()}/api/email/unsubscribe?token=${encodeURIComponent(token)}`;
}

export async function ensureMarketingAllowed(email) {
  const normalizedEmail = sanitizeEmail(email);
  if (!normalizedEmail) return false;
  return !(await isEmailUnsubscribed(normalizedEmail));
}

export async function unsubscribeByToken(token, metadata = {}) {
  const email = verifyUnsubscribeToken(token);
  await unsubscribeEmail({
    email,
    reason: sanitizeText(metadata.reason) || "unsubscribe_link",
    source: sanitizeText(metadata.source) || "marketing_email",
  });
  return email;
}
