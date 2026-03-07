import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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
