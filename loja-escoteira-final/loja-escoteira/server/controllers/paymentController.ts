import type { Request, Response } from "express";
import {
  getOrderByAsaasCheckoutId,
  getOrderById,
  getOrderReservationItems,
  getOrderByIdAndUser,
  markOrderPaid,
  getUserById,
  getUserPhoneById,
  setOrderAsaasCheckoutId,
  updateUserAsaasCustomerId,
} from "../db";
import {
  createAsaasCheckout,
  createAsaasCustomer,
  getAsaasPayment,
  validateAsaasWebhookSignature,
} from "../services/asaasService";
import { securityLog } from "../_core/security";
import { formatCurrency } from "../utils/email/formatCurrency.js";
import {
  sendInternalLowStockAlertEmail,
  sendInternalNewSaleAlertEmail,
  sendInternalPaymentFailedAlertEmail,
  sendPaymentApprovedEmail,
  sendPaymentFailedEmail,
} from "../services/emailService.js";

type AuthenticatedRequest = Request & {
  authUser?: {
    id: number;
  };
};

const PAID_EVENTS = new Set(["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED", "PAYMENT_OVERDUE_RECEIVED"]);
const FAILED_EVENTS = new Set(["PAYMENT_REFUSED", "PAYMENT_DELETED", "PAYMENT_REPROVED", "PAYMENT_FAILED"]);

function isTrustedRedirectUrl(redirectUrl: string) {
  try {
    const url = new URL(redirectUrl);
    const configuredOrigins = String(process.env.CORS_ORIGINS ?? "")
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);

    return configuredOrigins.some(origin => {
      try {
        const allowed = new URL(origin);
        return allowed.host === url.host;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function parseOrderIdFromWebhook(payload: any): number | null {
  const ref = payload?.payment?.externalReference ?? payload?.externalReference;
  const parsed = Number(ref);
  if (Number.isInteger(parsed) && parsed > 0) return parsed;
  return null;
}

function parseCheckoutIdFromWebhook(payload: any): string | null {
  const direct = payload?.checkout?.id;
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  const nested = payload?.payment?.checkout?.id;
  if (typeof nested === "string" && nested.trim()) return nested.trim();

  return null;
}

function parsePaymentIdFromWebhook(payload: any): string | null {
  const direct = payload?.payment?.id;
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  return null;
}

async function ensureAsaasCustomerForUser(input: {
  userId: number;
  cpf?: string;
  phone?: string;
}) {
  const user = await getUserById(input.userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.asaasCustomerId) {
    return { user, asaasCustomerId: user.asaasCustomerId, created: false };
  }

  const email = String(user.email || "").trim();
  const cpf = String(input.cpf || user.cpf || "").trim();
  const phoneFromProfile = await getUserPhoneById(user.id);
  const phone = String(input.phone || user.phone || phoneFromProfile || "").trim();

  if (!user.name || !email || !cpf) {
    throw new Error("Missing required customer fields: name, email, cpf");
  }

  const customer = await createAsaasCustomer({
    name: user.name,
    email,
    cpfCnpj: onlyDigits(cpf),
    mobilePhone: phone ? onlyDigits(phone) : undefined,
  });

  await updateUserAsaasCustomerId(user.id, customer.id);
  return { user, asaasCustomerId: customer.id, created: true };
}

export async function createCustomerHandler(req: Request, res: Response) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.authUser?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await ensureAsaasCustomerForUser({
      userId,
      cpf: (req.body as any)?.cpf,
      phone: (req.body as any)?.phone,
    });

    res.status(result.created ? 201 : 200).json({
      asaasCustomerId: result.asaasCustomerId,
      created: result.created,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create customer";
    res.status(400).json({ error: message });
  }
}

export async function createCheckoutHandler(req: Request, res: Response) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.authUser?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const body = req.body as {
      orderId?: number;
      redirectUrl?: string;
      billingTypes?: Array<"PIX" | "CREDIT_CARD" | "BOLETO">;
      checkoutName?: string;
      cpf?: string;
      phone?: string;
    };

    const orderId = Number(body.orderId);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      res.status(400).json({ error: "Invalid orderId" });
      return;
    }

    const redirectUrl = String(body.redirectUrl || "").trim();
    if (!redirectUrl) {
      res.status(400).json({ error: "redirectUrl is required" });
      return;
    }

    if (!isTrustedRedirectUrl(redirectUrl)) {
      res.status(400).json({ error: "Invalid redirectUrl" });
      return;
    }

    const { asaasCustomerId } = await ensureAsaasCustomerForUser({
      userId,
      cpf: body.cpf,
      phone: body.phone,
    });

    const order = await getOrderByIdAndUser(orderId, userId);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const checkout = await createAsaasCheckout({
      name: body.checkoutName?.trim() || `Pedido #${order.id}`,
      value: Number((order.totalPrice / 100).toFixed(2)),
      billingTypes: body.billingTypes?.length ? body.billingTypes : ["PIX", "CREDIT_CARD"],
      customer: asaasCustomerId,
      redirectUrl,
      externalReference: String(order.id),
    });

    await setOrderAsaasCheckoutId(order.id, checkout.id);

    res.status(201).json({
      orderId: order.id,
      asaasCheckoutId: checkout.id,
      checkoutUrl: checkout.checkoutUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout";
    res.status(400).json({ error: message });
  }
}

export async function asaasWebhookHandler(req: Request, res: Response) {
  try {
    const signatureValid = validateAsaasWebhookSignature(req.headers as Record<string, unknown>);
    if (!signatureValid) {
      securityLog("warn", "payment.asaas_webhook_invalid_signature", {
        requestIp: req.ip || "unknown",
        hasTokenHeader: Boolean((req.headers as Record<string, unknown>)["asaas-access-token"]),
      });
      res.status(401).json({ error: "Invalid webhook signature" });
      return;
    }

    const payload = req.body as any;
    const event = String(payload?.event || "").trim();

    if (!PAID_EVENTS.has(event) && !FAILED_EVENTS.has(event)) {
      console.log("[Asaas webhook] Ignored event", { event });
      res.status(200).json({ handled: false, reason: "event_ignored" });
      return;
    }

    let orderId = parseOrderIdFromWebhook(payload);
    let checkoutId = parseCheckoutIdFromWebhook(payload);
    const paymentId = parsePaymentIdFromWebhook(payload);

    if (!orderId) {
      if (checkoutId) {
        const order = await getOrderByAsaasCheckoutId(checkoutId);
        orderId = order?.id ?? null;
      }
    }

    // Fallback: some Asaas payloads do not include externalReference/checkout.
    if (!orderId && paymentId) {
      try {
        const payment = await getAsaasPayment(paymentId);
        orderId = Number(payment?.externalReference) || null;
        if (!checkoutId) {
          checkoutId = payment?.checkout?.id?.trim() || null;
        }
        if (!orderId && checkoutId) {
          const order = await getOrderByAsaasCheckoutId(checkoutId);
          orderId = order?.id ?? null;
        }
      } catch (error) {
        console.error("[Asaas webhook] Failed to resolve payment by id", {
          paymentId,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    if (!orderId) {
      console.warn("[Asaas webhook] Could not resolve order", {
        event,
        paymentId,
        checkoutId,
      });
      res.status(200).json({ handled: false, reason: "order_not_resolved" });
      return;
    }

    const order = await getOrderById(orderId);
    let result = { updated: false };
    if (PAID_EVENTS.has(event)) {
      result = await markOrderPaid(orderId);
    }
    if (order) {
      const user = await getUserById(order.userId);
      const orderItems = PAID_EVENTS.has(event) ? await getOrderReservationItems(order.id) : [];
      if (user?.email) {
        try {
          if (PAID_EVENTS.has(event)) {
            await sendPaymentApprovedEmail({
              customerEmail: user.email,
              customerName: user.name || "Cliente",
              orderNumber: String(order.id),
              total: formatCurrency(order.totalPrice / 100),
            });
            await sendInternalNewSaleAlertEmail({
              customerName: user.name || "Cliente",
              customerEmail: user.email,
              orderNumber: String(order.id),
              total: formatCurrency(order.totalPrice / 100),
              items: orderItems.map(item => ({
                id: item.productId,
                name: item.productName || `Produto #${item.productId}`,
                price: formatCurrency((Number(item.productPrice || 0) * Number(item.quantity || 1)) / 100),
                imageUrl: item.productImage || "",
              })),
              orderUrl: `${String(process.env.APP_URL || process.env.APP_BASE_URL || process.env.FRONTEND_URL || "https://l4ckos.com.br").replace(/\/$/, "")}/meus-pedidos/${order.id}`,
            });
            if (Array.isArray((result as any).lowStockProducts) && (result as any).lowStockProducts.length > 0) {
              await sendInternalLowStockAlertEmail({
                products: (result as any).lowStockProducts,
              });
            }
          } else if (FAILED_EVENTS.has(event)) {
            await sendPaymentFailedEmail({
              customerEmail: user.email,
              customerName: user.name || "Cliente",
              orderNumber: String(order.id),
              total: formatCurrency(order.totalPrice / 100),
              paymentUrl: `${String(process.env.APP_URL || process.env.APP_BASE_URL || process.env.FRONTEND_URL || "https://l4ckos.com.br").replace(/\/$/, "")}/checkout`,
              failureReason: "A operadora ou o provedor nao confirmou o pagamento.",
            });
            await sendInternalPaymentFailedAlertEmail({
              customerName: user.name || "Cliente",
              customerEmail: user.email,
              orderNumber: String(order.id),
              total: formatCurrency(order.totalPrice / 100),
              failureReason: "A operadora ou o provedor nao confirmou o pagamento.",
            });
          }
        } catch (error) {
          securityLog("warn", PAID_EVENTS.has(event) ? "email.payment_approved_failed" : "email.payment_failed_notification_failed", {
            orderId,
            reason: error instanceof Error ? error.message : "unknown",
          });
        }
      }
    }
    securityLog("info", "payment.asaas_webhook_processed", {
      requestIp: req.ip || "unknown",
      event,
      orderId,
      paymentId,
      checkoutId,
      updated: result.updated,
    });

    res.status(200).json({ handled: true, event, orderId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    res.status(500).json({ error: message });
  }
}
