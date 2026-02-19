/**
 * FavoritesContext - Gerencia produtos favoritos globalmente
 * Fornece: favorites, addToFavorites, removeFromFavorites, isFavorited
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { Product } from "../types/product";

// ============= TIPOS =============

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorited: (productId: number) => boolean;
  clearFavorites: () => void;
};

// ============= CRIAR CONTEXTO =============

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// ============= PROVIDER =============

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // 📌 Adicionar aos favoritos
  const addToFavorites = useCallback((product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }, []);

  // 📌 Remover dos favoritos
  const removeFromFavorites = useCallback((productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // 📌 Verificar se está nos favoritos
  const isFavorited = useCallback((productId: number) => {
    return favorites.some((item) => item.id === productId);
  }, [favorites]);

  // 📌 Limpar favoritos
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorited,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// ============= HOOK CUSTOMIZADO =============

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
