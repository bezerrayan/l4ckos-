import { Router } from "express";
import { quoteShipping } from "../services/shippingService";

const shippingRoutes = Router();

shippingRoutes.post("/quote", async (req, res) => {
  try {
    const cep = String(req.body?.cep || "");
    const itemCount = Number(req.body?.itemCount || 1);
    const subtotal = Number(req.body?.subtotal || 0);

    const options = await quoteShipping({
      cep,
      itemCount: Number.isFinite(itemCount) ? itemCount : 1,
      subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    });

    res.json({ options });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao calcular frete";
    res.status(400).json({ error: message });
  }
});

export default shippingRoutes;
