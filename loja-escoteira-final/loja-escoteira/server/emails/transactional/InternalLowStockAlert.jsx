import { Text } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout.jsx";
import { EmailPanel } from "../components/EmailPanel.jsx";
import { EmailSectionTitle } from "../components/EmailSectionTitle.jsx";

export function InternalLowStockAlert({ products = [] }) {
  return (
    <EmailLayout preview="Produtos com estoque baixo" title="Alerta de estoque baixo" subtitle="Itens que cruzaram o limite operacional">
      <Text>Um ou mais produtos acabaram de atingir o limite de estoque baixo.</Text>
      <EmailSectionTitle>Itens monitorados</EmailSectionTitle>
      {products.map(product => (
        <EmailPanel key={product.id} title={product.name}>
          <Text style={{ margin: 0 }}>Estoque atual: {product.stock}</Text>
        </EmailPanel>
      ))}
    </EmailLayout>
  );
}
