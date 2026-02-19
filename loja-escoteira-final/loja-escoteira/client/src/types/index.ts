/**
 * Exporter central para Tipos
 * Facilita imports: import type { Product, Cart, User } from './types'
 */

export type { Product, PRODUCT_EXAMPLE } from "./product";
export type { CartItem, Cart } from "./cart";
export { calculateCartTotal, calculateItemCount } from "./cart";
export type { User, UserSession } from "./user";
