import { Router } from "express";
import { createCheckoutHandler, createCustomerHandler } from "../controllers/paymentController";
import { requireAuthenticatedUser } from "../_core/httpAuth";

const paymentRoutes = Router();

paymentRoutes.post("/create-customer", requireAuthenticatedUser, createCustomerHandler);
paymentRoutes.post("/create-checkout", requireAuthenticatedUser, createCheckoutHandler);

export default paymentRoutes;
