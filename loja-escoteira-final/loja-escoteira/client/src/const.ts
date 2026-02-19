export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const API_URL = new URL("http://localhost:3000");

export const getLoginUrl = () => {
  // Garante que window está disponível (evita erro em SSR)
  if (typeof window === "undefined") return "/login";
  const oauthPortalUrl = "http://localhost:3000";
  const appId = "dev";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const url = new URL("/app-auth", oauthPortalUrl);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (e) {
    // fallback seguro
    return "/login";
  }
};
