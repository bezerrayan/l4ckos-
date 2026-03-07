export async function sendContactEmail(name, email, message) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const from = process.env.EMAIL_FROM || "L4CKOS <contato@l4ckos.com.br>";
  const payload = {
    from,
    to: ["contato@l4ckos.com.br"],
    subject: "Novo contato do site - L4CKOS",
    text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errorText}`);
  }
}
