import { formatCurrency } from "../../utils/email/formatCurrency.js";

export const emailPreviewData = {
  comingSoonConfirmation: {
    email: "cliente@exemplo.com",
    name: "Yan",
    launchUrl: "https://l4ckos.com.br",
  },
  contactConfirmation: {
    email: "cliente@exemplo.com",
    name: "Yan",
  },
  newContactInternal: {
    name: "Yan",
    email: "cliente@exemplo.com",
    phone: "(61) 99999-9999",
    subject: "Duvida sobre entrega",
    message: "Quero confirmar prazo para Brasilia.",
  },
  welcomeAccount: {
    email: "cliente@exemplo.com",
    name: "Yan",
  },
  passwordReset: {
    email: "cliente@exemplo.com",
    name: "Yan",
    resetUrl: "https://l4ckos.com.br/reset?token=preview",
  },
  orderCreated: {
    customerEmail: "cliente@exemplo.com",
    customerName: "Yan",
    orderNumber: "1204",
    total: formatCurrency(249.9),
    items: [{ name: "Camiseta Explorer", quantity: 1, price: formatCurrency(149.9) }],
    orderUrl: "https://l4ckos.com.br/meus-pedidos/1204",
  },
  abandonedCartReminder1: {
    email: "cliente@exemplo.com",
    name: "Yan",
    cartUrl: "https://l4ckos.com.br/carrinho",
    products: [{ name: "Camiseta Explorer", price: formatCurrency(149.9) }],
  },
  paymentNotFinished: {
    customerEmail: "cliente@exemplo.com",
    customerName: "Yan",
    orderNumber: "1204",
    total: formatCurrency(249.9),
    paymentUrl: "https://l4ckos.com.br/checkout",
    recoveryWindowLabel: "enquanto a cobranca estiver ativa",
  },
  promotionEmail: {
    email: "cliente@exemplo.com",
    name: "Yan",
    promotionUrl: "https://l4ckos.com.br/produtos",
    couponCode: "VIP15",
    couponDescription: "15% off na proxima compra",
  },
};
