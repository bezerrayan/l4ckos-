export function sendComingSoonConfirmationEmail(payload: {
  email: string;
  name?: string;
  launchUrl?: string;
}): Promise<unknown>;

export function sendContactConfirmationEmail(payload: {
  email: string;
  name?: string;
}): Promise<unknown>;

export function sendNewContactInternalEmail(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<unknown>;

export function sendWelcomeAccountEmail(payload: {
  email: string;
  name?: string;
}): Promise<unknown>;

export function sendPasswordResetEmail(payload: {
  email: string;
  name?: string;
  resetUrl: string;
}): Promise<unknown>;

export function sendOrderCreatedEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
  items?: Array<{ name: string; quantity: number; price?: string }>;
  orderUrl?: string;
}): Promise<unknown>;

export function sendPaymentPendingEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
  paymentUrl?: string;
  dueLabel?: string;
}): Promise<unknown>;

export function sendPaymentApprovedEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
}): Promise<unknown>;

export function sendPaymentFailedEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
  paymentUrl?: string;
  failureReason?: string;
}): Promise<unknown>;

export function sendOrderPreparingEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
}): Promise<unknown>;

export function sendShippingEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  trackingCode?: string;
  trackingUrl?: string;
}): Promise<unknown>;

export function sendOrderDeliveredEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  orderUrl?: string;
}): Promise<unknown>;

export function sendReviewRequestEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  reviewUrl?: string;
}): Promise<unknown>;

export function sendWaitlistLaunchEmail(payload: {
  email: string;
  couponCode: string;
  discountPercent: number;
  launchUrl?: string;
}): Promise<unknown>;

export function sendContactNotificationToStore(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<unknown>;

export function sendAutoReplyToCustomer(payload: {
  name?: string;
  email: string;
}): Promise<unknown>;

export function sendWelcomeEmail(payload: {
  name?: string;
  email: string;
}): Promise<unknown>;

export function sendOrderReceivedEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  total: string;
  items?: Array<{ name: string; quantity: number; price?: string }>;
  orderUrl?: string;
}): Promise<unknown>;

export function sendOrderShippedEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderNumber: string;
  trackingCode?: string;
  trackingUrl?: string;
}): Promise<unknown>;

export function sendWaitlistEmail(payload: {
  email: string;
}): Promise<unknown>;

export function sendWaitlistAutoReply(payload: {
  email: string;
}): Promise<unknown>;
