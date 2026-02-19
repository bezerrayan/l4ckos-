/**
 * Página Política de Privacidade
 */

import { useEffect } from "react";
import type { CSSProperties } from "react";

export default function Privacidade() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container as CSSProperties}>
      {/* Hero */}
      <div style={styles.hero as CSSProperties}>
        <h1 style={styles.title}>Política de Privacidade</h1>
        <p style={styles.subtitle}>
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>

      {/* Conteúdo */}
      <div style={styles.content as CSSProperties}>
        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>1. Introdução</h2>
          <p style={styles.text as CSSProperties}>
            A L4ckos - Loja Escoteira ("nós" ou "a Empresa") é comprometida com a
            proteção de sua privacidade. Esta Política de Privacidade explica como
            coletamos, usamos, divulgamos e protegemos suas informações quando você
            usa nosso site.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>
            2. Informações que Coletamos
          </h2>
          <p style={styles.text as CSSProperties}>
            Podemos coletar informações sobre você de várias formas:
          </p>
          <h3 style={styles.subTitle as CSSProperties}>Informações Fornecidas por Você:</h3>
          <ul style={styles.list as CSSProperties}>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Endereço postal</li>
            <li>Informações de pagamento</li>
            <li>Preferências pessoais</li>
          </ul>
          <h3 style={styles.subTitle as CSSProperties}>Informações Coletadas Automaticamente:</h3>
          <ul style={styles.list as CSSProperties}>
            <li>Endereço IP</li>
            <li>Tipo de navegador</li>
            <li>Páginas visitadas</li>
            <li>Tempo gasto no site</li>
            <li>Cookies e dados similares</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>3. Como Usamos as Informações</h2>
          <p style={styles.text as CSSProperties}>
            Usamos as informações coletadas para:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Processar suas compras e enviar pedidos</li>
            <li>Fornecer atendimento ao cliente</li>
            <li>Enviar atualizações de pedidos e notificações</li>
            <li>Melhorar e personalizar sua experiência</li>
            <li>Enviar comunicações de marketing (com seu consentimento)</li>
            <li>Prevenir fraude e atividades ilegais</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>4. Compartilhamento de Informações</h2>
          <p style={styles.text as CSSProperties}>
            Não vendemos suas informações pessoais. Podemos compartilhar suas
            informações apenas:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Com fornecedores e prestadores de serviço necessários</li>
            <li>Com parceiros de página (empresas de envio, processadores de pagamento)</li>
            <li>Quando exigido por lei ou ordem judicial</li>
            <li>Para proteger direitos, privacidade ou segurança</li>
            <li>Em caso de venda ou fusão da empresa</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>5. Cookies e Rastreamento</h2>
          <p style={styles.text as CSSProperties}>
            Usamos cookies e tecnologias similares para melhorar sua experiência. Os
            cookies são pequenos arquivos armazenados em seu dispositivo que ajudam a:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Manter você conectado</li>
            <li>Lembrar suas preferências</li>
            <li>Analisar como você usa o site</li>
            <li>Fornecer conteúdo e anúncios personalizados</li>
          </ul>
          <p style={styles.text as CSSProperties}>
            Você pode desabilitar cookies em seu navegador, mas alguns recursos do
            site podem não funcionarem corretamente.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>6. Segurança das Informações</h2>
          <p style={styles.text as CSSProperties}>
            Implementamos medidas de segurança apropriadas para proteger suas
            informações pessoais contra acesso não autorizado, alteração ou
            destruição. Isso inclui:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Criptografia SSL/TLS</li>
            <li>Firewalls de segurança</li>
            <li>Controle de acesso restrito</li>
            <li>Monitoramento regular de segurança</li>
          </ul>
          <p style={styles.text as CSSProperties}>
            Porém, nenhum sistema é completamente seguro. Você é responsável por
            manter sua senha confidencial.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>7. Retenção de Dados</h2>
          <p style={styles.text as CSSProperties}>
            Retemos suas informações pessoais pelo tempo necessário para fornecer
            nossos serviços e cumprir obrigações legais. Você pode solicitar a
            exclusão de suas informações a qualquer momento entrando em contato
            conosco.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>8. Seus Direitos</h2>
          <p style={styles.text as CSSProperties}>
            Você tem o direito de:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir informações imprecisas</li>
            <li>Solicitar exclusão de seus dados</li>
            <li>Optar por não receber comunicações de marketing</li>
            <li>Solicitar uma cópia de suas informações</li>
          </ul>
          <p style={styles.text as CSSProperties}>
            Para exercer qualquer um desses direitos, entre em contato conosco.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>9. LGPD (Lei Geral de Proteção de Dados)</h2>
          <p style={styles.text as CSSProperties}>
            Se você é residente no Brasil, suas informações são processadas de
            acordo com a Lei Geral de Proteção de Dados (LGPD). Você tem direitos
            adicionais sob a LGPD, incluindo:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Direito de confirmar a existência de seus dados</li>
            <li>Direito de acesso a seus dados personais</li>
            <li>Direito de correção de dados incompletos ou incorretos</li>
            <li>Direito ao apagamento ou anonimização de dados</li>
            <li>Direito de portabilidade dos dados</li>
            <li>Direito de oposição ao processamento dos dados</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>10. Marketing e Comunicações</h2>
          <p style={styles.text as CSSProperties}>
            Podemos enviar e-mails de marketing com ofertas especiais, novos
            produtos e atualizações. Você pode:
          </p>
          <ul style={styles.list as CSSProperties}>
            <li>Optar por não receber esses e-mails a qualquer momento</li>
            <li>Usar o link "Unsubscribe" no final de nossos e-mails</li>
            <li>Contatar-nos diretamente para remover-se da lista</li>
          </ul>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>11. Links Externos</h2>
          <p style={styles.text as CSSProperties}>
            Nosso site pode conter links para sites de terceiros. Esta Política de
            Privacidade não se aplica a sites de terceiros, e somos responsáveis
            por suas práticas de privacidade. Recomendamos que você leia a política
            de privacidade deles.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>12. Crianças</h2>
          <p style={styles.text as CSSProperties}>
            Nosso site não é direcionado a crianças menores de 13 anos, e não
            coletamos intencionalmente informações de crianças. Se descobrir que
            coletamos informações de uma criança menor de 13 anos, notificaremos
            imediatamente e tomaremos medidas para remover essas informações.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>13. Alterações na Política</h2>
          <p style={styles.text as CSSProperties}>
            Podemos atualizar esta Política de Privacidade de tempos em tempos. As
            alterações serão publicadas nesta página com a nova data de atualização.
            Seu uso contínuo do site após alterações constitui aceição da nova
            política.
          </p>
        </section>

        <section style={styles.section as CSSProperties}>
          <h2 style={styles.sectionTitle as CSSProperties}>14. Entre em Contato</h2>
          <p style={styles.text as CSSProperties}>
            Se tiver dúvidas sobre esta Política de Privacidade ou nossas práticas
            de privacidade, entre em contato:
          </p>
          <div style={styles.contactBox as CSSProperties}>
            <p>
              <strong>Email:</strong> privacidade@l4ckos.com
            </p>
            <p>
              <strong>Telefone:</strong> (11) 99999-9999
            </p>
            <p>
              <strong>Endereço:</strong> Rua da Loja, 123 - São Paulo, SP
            </p>
          </div>
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
  subTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#333333",
    margin: "24px 0 12px 0",
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
    margin: "0 0 16px 0",
  },
  contactBox: {
    padding: 24,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    marginTop: 16,
  },
};
