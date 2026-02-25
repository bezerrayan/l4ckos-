/**
 * CartContext - Gerencia o carrinho de compras global
 * Fornece: items, addToCart, removeFromCart, clearCart, updateQuantity, total
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { CartItem, Cart, SelectedOptions } from "../types/cart";
import type { Product } from "../types/product";
import { calculateCartTotal, calculateItemCount } from "../types/cart";

// ============= TIPOS =============

type CartContextType = {
  cart: Cart;
  addToCart: (product: Product, quantity: number, selectedOptions?: SelectedOptions) => void;
  removeFromCart: (productId: number, selectedOptions?: SelectedOptions) => void;
  updateQuantity: (productId: number, quantity: number, selectedOptions?: SelectedOptions) => void;
  clearCart: () => void;
};

// ============= CRIAR CONTEXTO =============

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============= PROVIDER =============

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const normalizeOptions = (selectedOptions?: SelectedOptions) => {
    if (!selectedOptions) return "";
    return JSON.stringify(
      Object.keys(selectedOptions)
        .sort()
        .reduce((acc, key) => {
          acc[key] = selectedOptions[key];
          return acc;
        }, {} as SelectedOptions)
    );
  };

  const cart: Cart = {
    items,
    total: calculateCartTotal(items),
    itemCount: calculateItemCount(items),
  };

  // 📌 Adicionar produto ao carrinho
  const addToCart = useCallback((product: Product, quantity: number = 1, selectedOptions?: SelectedOptions) => {
    setItems((prev) => {
      const currentOptionsKey = normalizeOptions(selectedOptions);
      const existing = prev.find(
        (item) => item.product.id === product.id && normalizeOptions(item.selectedOptions) === currentOptionsKey
      );
      
      if (existing) {
        // Se já existe, aumenta a quantidade
        return prev.map((item) =>
          item.product.id === product.id && normalizeOptions(item.selectedOptions) === currentOptionsKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Senão, adiciona novo
      return [...prev, { product, quantity, selectedOptions, addedAt: new Date() }];
    });
  }, []);

  // 📌 Remover produto do carrinho
  const removeFromCart = useCallback((productId: number, selectedOptions?: SelectedOptions) => {
    const currentOptionsKey = normalizeOptions(selectedOptions);
    setItems((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (!selectedOptions) return false;
        return normalizeOptions(item.selectedOptions) !== currentOptionsKey;
      })
    );
  }, []);

  // 📌 Atualizar quantidade
  const updateQuantity = useCallback((productId: number, quantity: number, selectedOptions?: SelectedOptions) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedOptions);
      return;
    }
    const currentOptionsKey = normalizeOptions(selectedOptions);
    
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && (!selectedOptions || normalizeOptions(item.selectedOptions) === currentOptionsKey)
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  // 📌 Limpar carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============= HOOK =============

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
