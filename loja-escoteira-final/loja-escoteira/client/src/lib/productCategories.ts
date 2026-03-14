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
    description: "Peças pensadas para uso frequente, identidade visual e montagem mais organizada da sua base.",
  },
  {
    value: "camisas",
    label: "Camisas",
    headline: "Camisas para presença e uso diário",
    description: "Modelos com foco em visual forte, conforto e combinação fácil com o restante da coleção.",
  },
  {
    value: "calcas",
    label: "Calças",
    headline: "Calças para mobilidade e presença",
    description: "Opções voltadas para rotina outdoor, deslocamento e uso prolongado com mais versatilidade.",
  },
  {
    value: "bermudas",
    label: "Bermudas",
    headline: "Bermudas para clima quente e uso leve",
    description: "Seleção prática para dias de movimento, trilha leve e rotina mais casual.",
  },
  {
    value: "acessorios",
    label: "Acessórios",
    headline: "Acessórios para completar a carga",
    description: "Itens de apoio que ajudam na organização, no visual e no uso do dia a dia.",
  },
  {
    value: "equipamentos",
    label: "Equipamentos",
    headline: "Equipamentos para uso real",
    description: "Produtos com foco em utilidade, rotina de campo e preparação mais funcional.",
  },
  {
    value: "camping",
    label: "Camping",
    headline: "Camping com curadoria objetiva",
    description: "Itens pensados para acampamento, organização de carga e rotina outdoor com mais clareza.",
  },
  {
    value: "insignias",
    label: "Insígnias",
    headline: "Insígnias e detalhes de identidade",
    description: "Peças para complementar uniforme, progressão e apresentação visual com consistência.",
  },
  {
    value: "calcados",
    label: "Calçados",
    headline: "Calçados para ritmo e deslocamento",
    description: "Opções para acompanhar rotina ativa, trilha e uso urbano com mais estabilidade.",
  },
  {
    value: "mochilas",
    label: "Mochilas",
    headline: "Mochilas para carga e deslocamento",
    description: "Modelos para organizar equipamento, rotina diária e saída de campo com mais praticidade.",
  },
  {
    value: "trilha",
    label: "Trilha",
    headline: "Trilha com seleção mais focada",
    description: "Produtos ligados a movimento, percurso, leveza e preparação para uso outdoor.",
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
