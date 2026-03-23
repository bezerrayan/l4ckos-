export function sendContactNotificationToStore(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<unknown>;

export function sendAutoReplyToCustomer(payload: {
  name: string;
  email: string;
}): Promise<unknown>;

export function sendWaitlistEmail(payload: {
  email: string;
}): Promise<unknown>;

export function sendWaitlistAutoReply(payload: {
  email: string;
}): Promise<unknown>;

export function sendWaitlistLaunchEmail(payload: {
  email: string;
  couponCode: string;
  discountPercent: number;
  launchUrl?: string;
}): Promise<unknown>;
