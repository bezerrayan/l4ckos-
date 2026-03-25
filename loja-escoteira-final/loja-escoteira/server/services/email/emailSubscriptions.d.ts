export function buildUnsubscribeToken(email: string): string;

export function verifyUnsubscribeToken(token: string): string;

export function resolveAppUrl(): string;

export function buildUnsubscribeUrl(email: string): string;

export function ensureMarketingAllowed(email: string): Promise<boolean>;

export function unsubscribeByToken(
  token: string,
  metadata?: {
    reason?: string;
    source?: string;
  },
): Promise<string>;
