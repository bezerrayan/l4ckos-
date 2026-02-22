export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:3010";

function resolveApiUrl() {
  try {
    return new URL(backendUrl);
  } catch {
    if (typeof window !== "undefined") {
      return new URL(window.location.origin);
    }
    return new URL("http://localhost:3002");
  }
}

export const API_URL = resolveApiUrl();

export const getLoginUrl = () => {
  if (typeof window === "undefined") return "/login";

  try {
    const url = new URL("/api/oauth/login", window.location.origin);
    const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (returnTo && returnTo.startsWith("/") && returnTo !== "/login") {
      url.searchParams.set("returnTo", returnTo);
    }
    return url.toString();
  } catch {
    return "/login";
  }
};
