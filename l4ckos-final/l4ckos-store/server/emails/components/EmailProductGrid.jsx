import { Section, Text } from "@react-email/components";
import { EmailPanel } from "./EmailPanel.jsx";
import { EmailSectionTitle } from "./EmailSectionTitle.jsx";

export function EmailProductGrid({ title = "Produtos em destaque", products = [] }) {
  if (!products.length) return null;

  return (
    <>
      <EmailSectionTitle>{title}</EmailSectionTitle>
      {products.slice(0, 4).map((product, index) => (
        <EmailPanel key={`${product.name}-${index}`}>
          <Section>
            <Text style={styles.name}>{product.name}</Text>
            {product.description ? <Text style={styles.description}>{product.description}</Text> : null}
            {product.price ? <Text style={styles.price}>{product.price}</Text> : null}
          </Section>
        </EmailPanel>
      ))}
    </>
  );
}

const styles = {
  name: {
    margin: "0 0 6px",
    color: "#f0ede8",
    fontSize: "15px",
    fontWeight: "800",
  },
  description: {
    margin: "0 0 6px",
    color: "#b6b6b6",
    fontSize: "13px",
    lineHeight: "1.6",
  },
  price: {
    margin: 0,
    color: "#f0ede8",
    fontSize: "14px",
    fontWeight: "700",
  },
};
