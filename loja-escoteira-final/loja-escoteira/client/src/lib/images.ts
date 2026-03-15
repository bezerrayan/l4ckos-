export function appendImageVersion(imageUrl: string, versionToken?: string | number | null) {
  const value = String(imageUrl || "").trim();
  if (!value || value.startsWith("data:") || versionToken === undefined || versionToken === null || versionToken === "") {
    return value;
  }

  try {
    const resolved = new URL(
      value,
      typeof window !== "undefined" ? window.location.origin : "https://l4ckos.com.br",
    );
    resolved.searchParams.set("imgv", String(versionToken));
    return resolved.toString();
  } catch {
    const separator = value.includes("?") ? "&" : "?";
    return `${value}${separator}imgv=${encodeURIComponent(String(versionToken))}`;
  }
}

export function retryImageWithVersion(
  event: { currentTarget: HTMLImageElement },
  originalSrc: string,
  fallbackSrc: string,
  versionToken?: string | number | null,
) {
  const img = event.currentTarget;
  if (!img.dataset.retry && originalSrc && originalSrc !== fallbackSrc) {
    img.dataset.retry = "1";
    img.src = appendImageVersion(originalSrc, versionToken);
    return;
  }

  img.src = fallbackSrc;
}

