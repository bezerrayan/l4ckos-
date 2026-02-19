import { Router } from "express";
import { getCartItems, addToCart, removeFromCart, clearCart } from "../db";

const router = Router();

// GET /api/cart - Obter itens do carrinho do usuário
router.get("/", async (req, res) => {
  try {
    // TODO: Get userId from authenticated user
    const userId = req.query.userId ? Number(req.query.userId) : 1;
    const items = await getCartItems(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// POST /api/cart - Adicionar item ao carrinho
router.post("/", async (req, res) => {
  try {
    // TODO: Get userId from authenticated user
    const userId = req.body.userId || 1;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await addToCart(userId, productId, quantity);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// DELETE /api/cart/:id - Remover item do carrinho
router.delete("/:id", async (req, res) => {
  try {
    await removeFromCart(Number(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// DELETE /api/cart - Limpar carrinho
router.delete("/", async (req, res) => {
  try {
    // TODO: Get userId from authenticated user
    const userId = req.query.userId ? Number(req.query.userId) : 1;
    await clearCart(userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
