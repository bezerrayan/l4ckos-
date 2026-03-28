import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS com Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um número como moeda em Real
 * @param value Valor numérico
 * @returns String formatada com R$
 * @example formatPrice(150.5) → "R$ 150,50"
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata uma data para formato brasileiro
 * @param date Data para formatar
 * @returns String formatada (DD/MM/YYYY)
 * @example formatDate(new Date()) → "07/02/2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR").format(d);
}

/**
 * Formata uma data com hora
 * @param date Data para formatar
 * @returns String formatada (DD/MM/YYYY HH:mm)
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Trunca uma string até um máximo de caracteres
 * @param str String para truncar
 * @param length Tamanho máximo
 * @returns String truncada com "..." ao final
 * @example truncate("Hello World", 5) → "Hello..."
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Capitaliza a primeira letra de uma string
 * @param str String para capitalizar
 * @returns String com primeira letra maiúscula
 * @example capitalize("hello") → "Hello"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Cria um slug a partir de uma string
 * @param str String para converter
 * @returns String em formato slug
 * @example createSlug("Hello World") → "hello-world"
 */
export function createSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Valida um email
 * @param email Email para validar
 * @returns true se email é válido
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Gera um ID único
 * @returns String com ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Delay assíncrono
 * @param ms Milissegundos para esperar
 * @returns Promise que resolve após o tempo especificado
 * @example await delay(1000); // Aguarda 1 segundo
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
