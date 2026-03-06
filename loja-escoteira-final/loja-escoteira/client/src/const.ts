export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const isDev = Boolean((import.meta as any).env?.DEV);
const defaultApiUrl = isDev ? "http://localhost:3010" : "https://api.l4ckos.com.br";

const envApiUrl =
  (import.meta as any).env?.VITE_API_URL ||
  (import.meta as any).env?.VITE_BACKEND_URL ||
  defaultApiUrl;

function resolveApiUrl() {
  try {
    return new URL(envApiUrl);
  } catch {
    return new URL("http://localhost:3010");
  }
}

export const API_URL = resolveApiUrl();
export const API_ORIGIN = API_URL.origin;

export function apiUrl(pathname: string) {
  return new URL(pathname, API_URL).toString();
}

export const getLoginUrl = () => {
  if (typeof window === "undefined") return "/login";

  try {
    const url = new URL("/api/oauth/login", API_URL);
    const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (returnTo && returnTo.startsWith("/") && returnTo !== "/login") {
      url.searchParams.set("returnTo", returnTo);
    }
    return url.toString();
  } catch {
    return "/login";
  }
};
