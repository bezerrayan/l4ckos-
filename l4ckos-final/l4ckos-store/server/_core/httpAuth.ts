import type { NextFunction, Request, Response } from "express";
import { ENV } from "./env";
import { sdk } from "./sdk";
import { securityLog } from "./security";
import { buildApiErrorResponse } from "./appErrors";

export type AuthenticatedRequest = Request & {
  authUser?: {
    id: number;
    role: "user" | "admin";
    email: string | null;
  };
};

function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: string[],
) {
  res.status(status).json(buildApiErrorResponse({ status, code, message, details }));
}

export async function requireAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await sdk.authenticateRequest(req);
    (req as AuthenticatedRequest).authUser = {
      id: user.id,
      role: user.role,
      email: user.email ?? null,
    };
    next();
  } catch {
    sendError(res, 401, "AUTH_REQUIRED", "Faça login para continuar.");
  }
}

export async function requireAdminUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await sdk.authenticateRequest(req);
    const normalizedEmail = String(user.email ?? "").trim().toLowerCase();

    if (user.role !== "admin" || !ENV.adminEmails.includes(normalizedEmail)) {
      securityLog("warn", "auth.admin_route_denied", {
        userId: user.id,
        requestIp: req.ip || "unknown",
      });
      sendError(res, 403, "ADMIN_REQUIRED", "Você não tem permissão para acessar este recurso.");
      return;
    }

    (req as AuthenticatedRequest).authUser = {
      id: user.id,
      role: user.role,
      email: user.email ?? null,
    };
    next();
  } catch {
    sendError(res, 401, "AUTH_REQUIRED", "Faça login para continuar.");
  }
}
