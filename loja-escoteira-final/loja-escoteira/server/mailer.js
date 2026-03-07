import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export async function sendContactEmail(name, email, message) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "contato@l4ckos.com.br",
    subject: "Novo contato do site - L4CKOS",
    text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
  });
}

export { transporter };
