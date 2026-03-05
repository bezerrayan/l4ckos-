import { Router } from "express";
import { quoteShippingDetailed } from "../services/shippingService";

const shippingRoutes = Router();

shippingRoutes.post("/quote", async (req, res) => {
  try {
    const cep = String(req.body?.cep || "");
    const itemCount = Number(req.body?.itemCount || 1);
    const subtotal = Number(req.body?.subtotal || 0);

    const result = await quoteShippingDetailed({
      cep,
      itemCount: Number.isFinite(itemCount) ? itemCount : 1,
      subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    });

    if (result.providerError) {
      console.warn("[Shipping] Melhor Envio fallback:", result.providerError);
    }

    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao calcular frete";
    res.status(400).json({ error: message });
  }
});

export default shippingRoutes;
