import { Text } from "@react-email/components";
import { EmailButton } from "../components/EmailButton.jsx";
import { EmailLayout } from "../components/EmailLayout.jsx";

export function LaunchAnnouncement({ name, launchUrl }) {
  return (
    <EmailLayout preview="L4CKOS esta no ar" title="A espera acabou" subtitle="A loja abriu oficialmente">
      <Text>Ola, {name || "cliente"}.</Text>
      <Text>A L4CKOS entrou no ar. O drop inicial ja esta disponivel para quem acompanha a marca desde o pre-lancamento.</Text>
      {launchUrl ? <EmailButton href={launchUrl}>Entrar na loja</EmailButton> : null}
    </EmailLayout>
  );
}
