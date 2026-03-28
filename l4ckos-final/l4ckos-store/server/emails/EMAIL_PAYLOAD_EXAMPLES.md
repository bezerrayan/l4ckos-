# L4CKOS Email Flows

## Base transacional ja conectada

### Contato
`POST /api/contact`

```json
{
  "name": "Yan",
  "email": "yandev@l4ckos.com.br",
  "subject": "Duvida sobre pedido",
  "message": "Quero saber o prazo de entrega."
}
```

### Lista de espera
`POST /api/waitlist`

```json
{
  "email": "cliente@exemplo.com"
}
```

### Pedido criado + pagamento pendente
Disparo automatico no fluxo `orders.createAsaasCharge`.

### Pagamento aprovado / falhou
Disparo automatico no webhook Asaas:
- `/api/webhooks/asaas`
- `/webhook/asaas`

### Pedido em separacao / enviado / entregue
Disparo automatico quando o admin muda o status em `admin.orderUpdate`.

## Fase 2: como disparar

### 1. Carrinho abandonado
Mutation administrativa:

`admin.lifecycleEmailSend`

```ts
await caller.admin.lifecycleEmailSend({
  flow: "abandonedCart1",
  userId: 12,
});
```

Valores aceitos em `flow`:
- `abandonedCart1`
- `abandonedCart2`
- `abandonedCart3`

### 2. Pagamento nao finalizado
Mutation administrativa:

```ts
await caller.admin.lifecycleEmailSend({
  flow: "paymentNotFinished",
  userId: 12,
  orderId: 77,
});
```

### 3. Lancamento de colecao / drop / novos produtos / promocao / cross-sell / fidelizacao
Mutation administrativa:

`admin.marketingCampaignSend`

Campos principais:
- `campaign`: `drop | newProducts | promotion | crossSell | loyaltyCoupon`
- `audience`: `waitlist | allUsers | vipUsers | custom`
- `customEmails`: lista opcional quando `audience=custom`
- `productIds`: IDs opcionais para vitrine do email
- `couponCode`: obrigatorio em `loyaltyCoupon`, opcional em `promotion`
- `couponDescription`: texto do incentivo
- `url`: link principal da campanha

Exemplo:

```ts
await caller.admin.marketingCampaignSend({
  campaign: "promotion",
  audience: "vipUsers",
  couponCode: "VIP15",
  couponDescription: "15% off na proxima compra",
  url: "https://l4ckos.com.br/produtos",
  batchSize: 25,
  delayMs: 500,
});
```

### 4. Lançamento para waitlist
Mutation ja existente:

```ts
await caller.admin.waitlistLaunchSend({
  couponCode: "EARLY15",
  discountPercent: 15,
  launchUrl: "https://l4ckos.com.br",
  batchSize: 25,
  delayMs: 700,
});
```

## Alertas internos automaticos

### Nova venda
Enviado automaticamente quando o webhook da Asaas confirma pagamento.

### Estoque baixo
Enviado automaticamente quando um pagamento confirmado faz um produto cruzar o limite de `5` unidades ou menos.

### Falha de pagamento
Enviado automaticamente quando o webhook da Asaas recebe evento de falha.

## Descadastro de marketing

Todo email de marketing agora sai com link assinado para:

`GET /api/email/unsubscribe?token=...`

Esse link grava o email na tabela `emailUnsubscribes` e bloqueia envios futuros de marketing sem afetar emails transacionais.

## Variaveis de ambiente novas

Adicione no ambiente:

```env
EMAIL_FROM_MARKETING=no-reply@l4ckos.com.br
ALERTS_NOTIFICATION_EMAIL=operacao@l4ckos.com.br
EMAIL_UNSUBSCRIBE_SECRET=gere-um-segredo-forte
```

## Migracao necessaria

Aplicar a migracao da fase 2:

```powershell
pnpm db:push
```

Ou executar o SQL de `drizzle/0011_email_unsubscribes.sql`.
