import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../db";

const router = Router();

// GET /api/products - Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:id - Obter um produto específico
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST /api/products - Criar um novo produto (admin only)
router.post("/", async (req, res) => {
  try {
    // TODO: Add admin authentication check
    const { name, description, fullDescription, category, price, imageUrl, stock } = req.body;
    
    if (!name || !category || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await createProduct({
      name,
      description,
      fullDescription,
      category,
      price,
      imageUrl,
      stock: stock || 0,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT /api/products/:id - Atualizar um produto (admin only)
router.put("/:id", async (req, res) => {
  try {
    // TODO: Add admin authentication check
    const { name, description, fullDescription, category, price, imageUrl, stock } = req.body;
    
    await updateProduct(Number(req.params.id), {
      name,
      description,
      fullDescription,
      category,
      price,
      imageUrl,
      stock,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE /api/products/:id - Deletar um produto (admin only)
router.delete("/:id", async (req, res) => {
  try {
    // TODO: Add admin authentication check
    await deleteProduct(Number(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
