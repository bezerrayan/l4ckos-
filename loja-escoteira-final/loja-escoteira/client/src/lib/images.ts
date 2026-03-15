import { API_ORIGIN, apiUrl } from "../const";

function shouldProxyImageUrl(url: URL) {
  const apiHost = new URL(API_ORIGIN).host;
  if (url.host === apiHost) {
    return false;
  }

  if (typeof window !== "undefined" && url.host === window.location.host) {
    return false;
  }

  if (url.pathname.startsWith("/api/image-proxy")) {
    return false;
  }

  return /^https?:$/i.test(url.protocol);
}

export function resolveCatalogImageUrl(imageUrl: string | null | undefined) {
  const value = String(imageUrl || "").trim();
  if (!value) return "";
  if (value.startsWith("data:")) return value;

  try {
    const resolved = new URL(
      value,
      typeof window !== "undefined" ? window.location.origin : "https://l4ckos.com.br",
    );

    if (shouldProxyImageUrl(resolved)) {
      const proxied = new URL(apiUrl("/api/image-proxy"));
      proxied.searchParams.set("src", resolved.toString());
      return proxied.toString();
    }

    return resolved.toString();
  } catch {
    if (value.startsWith("/")) return apiUrl(value);
    return apiUrl(`/${value}`);
  }
}

export function appendImageVersion(imageUrl: string, versionToken?: string | number | null) {
  const value = resolveCatalogImageUrl(imageUrl);
  if (!value || value.startsWith("data:") || versionToken === undefined || versionToken === null || versionToken === "") {
    return value;
  }

  try {
    const resolved = new URL(
      value,
      typeof window !== "undefined" ? window.location.origin : "https://l4ckos.com.br",
    );
    if (shouldProxyImageUrl(resolved)) {
      const proxied = new URL(apiUrl("/api/image-proxy"));
      proxied.searchParams.set("src", resolved.toString());
      proxied.searchParams.set("imgv", String(versionToken));
      return proxied.toString();
    }

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
