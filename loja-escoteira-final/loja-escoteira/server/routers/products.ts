import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../db";

export const productsRouter = router({
  // Listar todos os produtos com filtros opcionais
  list: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().optional().default(100),
      })
    )
    .query(async ({ input }) => {
      let products = await getProducts();

      // Filtrar por categoria
      if (input.category) {
        products = products.filter((p) => p.category === input.category);
      }

      // Buscar por termo
      if (input.search) {
        const term = input.search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description?.toLowerCase().includes(term)
        );
      }

      return products.slice(0, input.limit);
    }),

  // Obter um produto específico por ID
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    const product = await getProductById(input);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return product;
  }),

  // Criar novo produto (apenas admin)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        price: z.number().positive(),
        description: z.string().optional(),
        fullDescription: z.string().optional(),
        imageUrl: z.string().optional(),
        stock: z.number().optional().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const result = await createProduct(input);
      return result;
    }),

  // Atualizar produto (apenas admin)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        category: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
        fullDescription: z.string().optional(),
        imageUrl: z.string().optional(),
        stock: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateProduct(id, data);
      return { success: true };
    }),

  // Deletar produto (apenas admin)
  delete: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
    await deleteProduct(input);
    return { success: true };
  }),
});
