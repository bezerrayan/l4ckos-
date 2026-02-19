/**
 * Tipo para representar um Produto
 */
export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
  rating?: number;
};

// Exemplo de produto mock (remover em produção)
export const PRODUCT_EXAMPLE: Product = {
  id: 1,
  name: "Uniforme Escoteiro",
  description: "Uniforme oficial do Movimento Escoteiro",
  price: 150.00,
  image: "https://via.placeholder.com/200",
  category: "Uniformes",
  stock: 10,
  rating: 4.5,
};
