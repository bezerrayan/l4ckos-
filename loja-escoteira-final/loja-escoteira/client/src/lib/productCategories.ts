export type ProductCategoryOption = {
  value: string;
  label: string;
};

export const PRODUCT_CATEGORIES: ProductCategoryOption[] = [
  { value: "uniformes", label: "Uniformes" },
  { value: "camisas", label: "Camisas" },
  { value: "calcas", label: "Calças" },
  { value: "bermudas", label: "Bermudas" },
  { value: "acessorios", label: "Acessórios" },
  { value: "equipamentos", label: "Equipamentos" },
  { value: "camping", label: "Camping" },
  { value: "insignias", label: "Insígnias" },
  { value: "calcados", label: "Calçados" },
  { value: "mochilas", label: "Mochilas" },
  { value: "trilha", label: "Trilha" },
];

export function normalizeCategoryValue(value?: string | null) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryLabel(value?: string | null) {
  const normalized = normalizeCategoryValue(value);
  const known = PRODUCT_CATEGORIES.find(item => item.value === normalized);
  if (known) return known.label;
  if (!normalized) return "Sem categoria";
  return normalized
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
