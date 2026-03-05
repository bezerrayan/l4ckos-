import { Router } from "express";
import { asaasWebhookHandler } from "../controllers/paymentController";

const webhookRoutes = Router();

webhookRoutes.post("/asaas", asaasWebhookHandler);

export default webhookRoutes;
