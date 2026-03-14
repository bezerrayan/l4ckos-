export type ProductCategoryOption = {
  value: string;
  label: string;
  headline?: string;
  description?: string;
};

export const PRODUCT_CATEGORIES: ProductCategoryOption[] = [
  {
    value: "uniformes",
    label: "Uniformes",
    headline: "Uniformes prontos para rotina e campo",
    description: "Pecas pensadas para uso frequente, identidade visual e montagem mais organizada da sua base.",
  },
  {
    value: "camisas",
    label: "Camisas",
    headline: "Camisas para presenca e uso diario",
    description: "Modelos com foco em visual forte, conforto e combinacao facil com o restante da colecao.",
  },
  {
    value: "calcas",
    label: "Calcas",
    headline: "Calcas para mobilidade e presenca",
    description: "Opcoes voltadas para rotina outdoor, deslocamento e uso prolongado com mais versatilidade.",
  },
  {
    value: "bermudas",
    label: "Bermudas",
    headline: "Bermudas para clima quente e uso leve",
    description: "Selecao pratica para dias de movimento, trilha leve e rotina mais casual.",
  },
  {
    value: "acessorios",
    label: "Acessorios",
    headline: "Acessorios para completar a carga",
    description: "Itens de apoio que ajudam na organizacao, no visual e no uso do dia a dia.",
  },
  {
    value: "equipamentos",
    label: "Equipamentos",
    headline: "Equipamentos para uso real",
    description: "Produtos com foco em utilidade, rotina de campo e preparacao mais funcional.",
  },
  {
    value: "camping",
    label: "Camping",
    headline: "Camping com curadoria objetiva",
    description: "Itens pensados para acampamento, organizacao de carga e rotina outdoor com mais clareza.",
  },
  {
    value: "insignias",
    label: "Insignias",
    headline: "Insignias e detalhes de identidade",
    description: "Pecas para complementar uniforme, progressao e apresentacao visual com consistencia.",
  },
  {
    value: "calcados",
    label: "Calcados",
    headline: "Calcados para ritmo e deslocamento",
    description: "Opcoes para acompanhar rotina ativa, trilha e uso urbano com mais estabilidade.",
  },
  {
    value: "mochilas",
    label: "Mochilas",
    headline: "Mochilas para carga e deslocamento",
    description: "Modelos para organizar equipamento, rotina diaria e saida de campo com mais praticidade.",
  },
  {
    value: "trilha",
    label: "Trilha",
    headline: "Trilha com selecao mais focada",
    description: "Produtos ligados a movimento, percurso, leveza e preparacao para uso outdoor.",
  },
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

export function getCategoryMeta(value?: string | null) {
  const normalized = normalizeCategoryValue(value);
  return PRODUCT_CATEGORIES.find(item => item.value === normalized) ?? null;
}
