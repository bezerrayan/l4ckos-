# L4CKOS Email Payload Examples

## Contato (`POST /api/contact`)
```json
{
  "name": "Yan",
  "email": "yandev@l4ckos.com.br",
  "subject": "Duvida sobre pedido",
  "message": "Quero saber o prazo de entrega."
}
```

## Boas-vindas
```js
await sendWelcomeEmail({
  name: "Yan",
  email: "yandev@l4ckos.com.br"
});
```

## Pedido recebido
```js
await sendOrderReceivedEmail({
  customerName: "Yan",
  customerEmail: "yandev@l4ckos.com.br",
  orderNumber: "12345",
  items: [
    { name: "Camisa Escoteira", quantity: 1, price: "R$ 119,90" },
    { name: "Distintivo", quantity: 2, price: "R$ 19,90" }
  ],
  total: "R$ 159,70"
});
```

## Pagamento aprovado
```js
await sendPaymentApprovedEmail({
  customerName: "Yan",
  customerEmail: "yandev@l4ckos.com.br",
  orderNumber: "12345",
  total: "R$ 159,70"
});
```

## Pedido enviado
```js
await sendOrderShippedEmail({
  customerName: "Yan",
  customerEmail: "yandev@l4ckos.com.br",
  orderNumber: "12345",
  trackingCode: "BR123456789",
  trackingUrl: "https://rastreamento.exemplo.com/BR123456789"
});
```

## Redefinicao de senha
```js
await sendResetPasswordEmail({
  name: "Yan",
  email: "yandev@l4ckos.com.br",
  resetUrl: "https://l4ckos.com.br/reset-password?token=abc123"
});
```
