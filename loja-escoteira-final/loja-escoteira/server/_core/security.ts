type SecuritySeverity = "info" | "warn" | "error";

function maskIp(ip: string | undefined | null) {
  const value = String(ip ?? "").trim();
  if (!value) return "unknown";

  if (value.includes(":")) {
    return `${value.split(":").slice(0, 4).join(":")}:*`;
  }

  const parts = value.split(".");
  if (parts.length !== 4) return value;
  return `${parts[0]}.${parts[1]}.${parts[2]}.*`;
}

function redactValue(value: unknown): unknown {
  if (typeof value !== "string") return value;
  if (value.length <= 8) return value;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export function securityLog(
  severity: SecuritySeverity,
  event: string,
  details: Record<string, unknown> = {},
) {
  const payload = {
    at: new Date().toISOString(),
    event,
    ...Object.fromEntries(
      Object.entries(details).map(([key, value]) => {
        if (key.toLowerCase().includes("ip")) return [key, maskIp(String(value ?? ""))];
        if (key.toLowerCase().includes("token")) return [key, redactValue(value)];
        if (key.toLowerCase().includes("secret")) return [key, "[redacted]"];
        return [key, value];
      }),
    ),
  };

  if (severity === "error") {
    console.error("[Security]", payload);
    return;
  }

  if (severity === "warn") {
    console.warn("[Security]", payload);
    return;
  }

  console.log("[Security]", payload);
}
