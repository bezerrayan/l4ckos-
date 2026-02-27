import { updateOrderStatus } from "../db";

const DEFAULT_ASAAS_API_URL = "https://api.asaas.com/v3";

type AsaasRequestInit = {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
};

type AsaasCustomerResponse = {
  id: string;
};

type AsaasPaymentResponse = {
  id: string;
  invoiceUrl?: string;
  pixQrCode?: string;
  pixCopyPaste?: string;
};

type AsaasPixQrCodeResponse = {
  encodedImage?: string;
  payload?: string;
};

const PAID_EVENTS = new Set([
  "PAYMENT_RECEIVED",
  "PAYMENT_CONFIRMED",
  "PAYMENT_OVERDUE_RECEIVED",
]);

function getAsaasConfig() {
  const apiKey = process.env.ASAAS_API_KEY?.trim();
  const apiUrl = (process.env.ASAAS_API_URL?.trim() || DEFAULT_ASAAS_API_URL).replace(/\/+$/, "");

  if (!apiKey) {
    throw new Error("ASAAS_API_KEY não configurada.");
  }

  return { apiKey, apiUrl };
}

async function asaasRequest<T>(path: string, init: AsaasRequestInit = {}) {
  const { apiKey, apiUrl } = getAsaasConfig();
  const response = await fetch(`${apiUrl}${path}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  const data = (await response.json()) as {
    errors?: Array<{ description?: string }>;
    message?: string;
  };

  if (!response.ok) {
    const asaasMessage = data.errors?.[0]?.description || data.message || "Falha na API do Asaas";
    throw new Error(asaasMessage);
  }

  return data as T;
}

function getDefaultDueDate(): string {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 2);
  return dueDate.toISOString().slice(0, 10);
}

export async function createPixChargeForOrder(input: {
  orderId: number;
  value: number;
  customer: {
    name: string;
    cpfCnpj: string;
    email?: string;
  };
  description: string;
  dueDate?: string;
}) {
  const customer = await asaasRequest<AsaasCustomerResponse>("/customers", {
    method: "POST",
    body: {
      name: input.customer.name,
      cpfCnpj: input.customer.cpfCnpj,
      email: input.customer.email || undefined,
    },
  });

  const payment = await asaasRequest<AsaasPaymentResponse>("/payments", {
    method: "POST",
    body: {
      customer: customer.id,
      billingType: "PIX",
      value: Number(input.value.toFixed(2)),
      dueDate: input.dueDate || getDefaultDueDate(),
      description: input.description,
      externalReference: String(input.orderId),
    },
  });

  let pixQrCode = payment.pixQrCode ?? null;
  let pixCopyPaste = payment.pixCopyPaste ?? null;

  if ((!pixQrCode || !pixCopyPaste) && payment.id) {
    const pixData = await asaasRequest<AsaasPixQrCodeResponse>(`/payments/${payment.id}/pixQrCode`);
    pixQrCode = pixQrCode || pixData.encodedImage || null;
    pixCopyPaste = pixCopyPaste || pixData.payload || null;
  }

  return {
    customerId: customer.id,
    paymentId: payment.id,
    invoiceUrl: payment.invoiceUrl || null,
    pixQrCode,
    pixCopyPaste,
  };
}

export async function handleAsaasWebhookEvent(payload: unknown) {
  const eventData = payload as {
    event?: string;
    payment?: { id?: string; externalReference?: string };
  };

  if (!eventData?.event || !eventData.payment) {
    return { handled: false, reason: "invalid_payload" } as const;
  }

  if (!PAID_EVENTS.has(eventData.event)) {
    return { handled: false, reason: "event_ignored" } as const;
  }

  const orderId = Number(eventData.payment.externalReference);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    return { handled: false, reason: "missing_external_reference" } as const;
  }

  await updateOrderStatus(orderId, "processing");

  return {
    handled: true,
    event: eventData.event,
    orderId,
    paymentId: eventData.payment.id || null,
  } as const;
}
