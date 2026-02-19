/**
 * Página Termos de Serviço
 */

import { useEffect } from "react";
import type { CSSProperties } from "react";

export default function Termos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container as CSSProperties}>
      {/* Hero */}
      <div style={styles.hero as CSSProperties}>
        <h1 style={styles.title}>Termos de Serviço</h1>
        <p style={styles.subtitle}>
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>

      {/* Conteúdo */}
      <div style={styles.content as CSSProperties}>
        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>1. Aceitação dos Termos</h2>
          <p style={styles.text as CSSProperties}>
            Ao acessar e usar o site da L4ckos - Loja Escoteira, você concorda em
            estar vinculado por estes termos e condições de serviço. Se você não
            concorda com qualquer parte destes termos, não prossiga usando o site.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>2. Licença de Uso</h2>
          <p style={styles.text as CSSProperties}>
            É concedida a você uma licença limitada, não exclusiva e não transferível
            para acessar e usar o site e seus conteúdos para fins pessoais e não
            comerciais. Você não pode modificar, copiar, distribuir ou reproduzir o
            conteúdo sem permissão prévia.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>3. Contas de Usuário</h2>
          <p style={styles.text as CSSProperties}>
            Ao criar uma conta, você é responsável por manter a confidencialidade de
            sua senha e por todas as atividades que ocorrem em sua conta. Você
            concorda em fornecer informações precisas, precisas e completas no
            registro.
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Você deve ter pelo menos 18 anos para usar o site</li>
            <li>Você é responsável por toda atividade em sua conta</li>
            <li>Você concorda em notificar sobre qualquer uso não autorizado</li>
            <li>Uma conta por pessoa é permitida</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>4. Pedidos e Compras</h2>
          <p style={styles.text as CSSProperties}>
            Ao fazer um pedido, você concorda com os seguintes termos:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Os preços estão sujeitos a alterações sem aviso prévio</li>
            <li>
              Reservamos o direito de recusar ou cancelar qualquer pedido sem
              justificativa
            </li>
            <li>As descrições dos produtos são aproximadas, não obrigatórias</li>
            <li>
              As imagens são para ilustração e podem não refletir exatamente o
              produto
            </li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>5. Política de Retorno</h2>
          <p style={styles.text as CSSProperties}>
            Produtos podem ser devolvidos dentro de 30 dias da compra, desde que:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Estejam em perfeito estado</li>
            <li>Incluam todos os acessórios e embalagem original</li>
            <li>Não tenham sido usados ou danificados</li>
            <li>O cliente arque com o frete de retorno (exceto em caso de defeito)</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>
            6. Isenção de Responsabilidade
          </h2>
          <p style={styles.text as CSSProperties}>
            O site e os produtos são fornecidos "conforme estão" sem garantias de
            qualquer tipo. A L4ckos não se responsabiliza por:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Danos diretos, indiretos ou consequentes</li>
            <li>Interrupção do serviço</li>
            <li>Perda de dados ou lucros</li>
            <li>Qualquer conteúdo de terceiros</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>7. Limitação de Responsabilidade</h2>
          <p style={styles.text as CSSProperties}>
            Em nenhuma circunstância a L4ckos será responsável por perdas ou danos
            superiores ao valor total da compra, independentemente da causa.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>8. Propriedade Intelectual</h2>
          <p style={styles.text as CSSProperties}>
            Todo o conteúdo do site, incluindo textos, imagens, gráficos e logotipos,
            é propriedade da L4ckos e protegido por leis de propriedade intelectual.
            Reprodução não autorizada é proibida.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>9. Links Externos</h2>
          <p style={styles.text as CSSProperties}>
            O site pode conter links para sites de terceiros. Não somos responsáveis
            pelo conteúdo, precisão ou práticas de privacidade desses sites.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>10. Modificação dos Termos</h2>
          <p style={styles.text as CSSProperties}>
            Reservamos o direito de modificar estes termos a qualquer momento. As
            modificações entram em vigor imediatamente após a publicação. Seu uso
            contínuo do site após alterações constitui aceição dos novos termos.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>11. Contato</h2>
          <p style={styles.text as CSSProperties}>
            Para dúvidas sobre estes Termos de Serviço, entre em contato:
          </p>
          <div style={styles.contactBox as CSSProperties}>
            <p>
              <strong>Email:</strong> contato@l4ckos.com
            </p>
            <p>
              <strong>Telefone:</strong> (11) 99999-9999
            </p>
            <p>
              <strong>Endereço:</strong> Rua da Loja, 123 - São Paulo, SP
            </p>
          </div>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>12. Lei Aplicável</h2>
          <p style={styles.text as CSSProperties}>
            Estes termos são regidos pelas leis da República Federativa do Brasil,
            sem considerar seus conflitos de disposições legais.
          </p>
        </section>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    paddingBottom: 80,
  },
  hero: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    color: "white",
    padding: "60px 40px",
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    margin: 0,
    marginBottom: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 40px 60px",
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: "0 0 16px 0",
  },
  text: {
    fontSize: 15,
    color: "#555555",
    lineHeight: "1.8",
    margin: "0 0 16px 0",
  },
  list: {
    fontSize: 15,
    color: "#555555",
    lineHeight: "1.8",
    paddingLeft: 24,
    margin: 0,
  },
  contactBox: {
    padding: 24,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    marginTop: 16,
  },
};
