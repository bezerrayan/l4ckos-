import { Router } from "express";
import { createOrder, getOrdersByUserId } from "../db";

const router = Router();

// GET /api/orders - Obter pedidos do usuário
router.get("/", async (req, res) => {
  try {
    // TODO: Get userId from authenticated user
    const userId = req.query.userId ? Number(req.query.userId) : 1;
    const orders = await getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/orders - Criar um novo pedido
router.post("/", async (req, res) => {
  try {
    // TODO: Get userId from authenticated user
    const userId = req.body.userId || 1;
    const { totalPrice } = req.body;

    if (!totalPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await createOrder(userId, totalPrice);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
