import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailProductGrid } from "../components/EmailProductGrid.jsx";

export function NewDropAnnouncement({ name, dropUrl, products = [] }) {
  return (
    <EmailLayout preview="Novo drop L4CKOS" title="Novo drop no ar" subtitle="Pecas e equipamentos em edicao ativa">
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>Entrou uma nova selecao no catalogo da L4CKOS. A curadoria desta rodada foi montada para performance urbana e aventura premium.</Text>
      <EmailProductGrid title="Destaques do drop" products={products} />
      {dropUrl ? <EmailButton href={dropUrl}>Ver novo drop</EmailButton> : null}
    </EmailLayout>
  );
}
