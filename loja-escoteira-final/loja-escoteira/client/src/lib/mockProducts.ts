/**
 * Mock Products - Dados simulados para testes
 * Remover em produção
 */

import type { Product } from "../types/product";

// Camiseta branca real em fundo preto
const camisetaImageURL = "/images/camisa.png";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camisa Personalizada — Dri-fit",
    description: "Camisa premium com bordados exclusivos de mapa topográfico. Tecido algodão 100% com detalhes refletivos para explorar o desconhecido com estilo.",
    price: 79.9,
    image: camisetaImageURL,
    category: "Escoteiro",
    stock: 20,
    rating: 5.0,
  },
  {
    id: 2,
    name: "Camisa Personalizada — Oversized",
    description: "Design exclusivo com brasão customizado e estrela refletiva no ombro. Confecção artesanal com atenção aos mínimos detalhes.",
    price: 99.9,
    image: camisetaImageURL,
    category: "Escoteiro",
    stock: 15,
    rating: 5.0,
  },
  {
    id: 3,
    name: "Camisa Personalizada — Edição Limitada",
    description: "Ilustração botânica exclusiva com patch de couro autêntico. Perfeita para quem celebra a conexão com a natureza em cada aventura.",
    price: 129.9,
    image: camisetaImageURL,
    category: "Escoteiro",
    stock: 12,
    rating: 5.0,
  },
];

/**
 * Função para buscar produtos
 */
export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

/**
 * Função para buscar um produto pelo ID
 */
export function getProductById(id: number): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

/**
 * Função para buscar produtos por categoria
 */
export function getProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Função para buscar produtos por termo de busca
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery)
  );
}
