import { Router, type Request, type Response, type NextFunction } from "express";
import { sdk } from "../_core/sdk";
import { createCheckoutHandler, createCustomerHandler } from "../controllers/paymentController";

type AuthenticatedRequest = Request & {
  authUser?: { id: number };
};

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await sdk.authenticateRequest(req);
    (req as AuthenticatedRequest).authUser = { id: user.id };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

const paymentRoutes = Router();

paymentRoutes.post("/create-customer", requireAuth, createCustomerHandler);
paymentRoutes.post("/create-checkout", requireAuth, createCheckoutHandler);

export default paymentRoutes;
