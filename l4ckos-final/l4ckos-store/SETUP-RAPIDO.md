# ⚡ Setup Rápido - Loja Escoteira "Sempre Alerta"

## 1️⃣ Extrair e Instalar (2 minutos)

```bash
# Extrair o ZIP
unzip loja-escoteira-completo.zip -d loja-escoteira
cd loja-escoteira

# Instalar dependências
pnpm install
```

## 2️⃣ Configurar Banco de Dados (3 minutos)

### Opção A: MySQL Local (Recomendado para desenvolvimento)

```bash
# 1. Criar banco de dados
mysql -u root -p -e "CREATE DATABASE loja_escoteira;"

# 2. Criar arquivo .env na raiz do projeto com:
DATABASE_URL=mysql://root:password@localhost:3306/loja_escoteira
JWT_SECRET=sua-chave-secreta-muito-segura-aqui
NODE_ENV=development
PORT=3000

# 3. Aplicar migrations
pnpm db:push

# 4. Popular com produtos (opcional)
node server/seed-products.mjs
```

### Opção B: Usar Manus (Se estiver usando a plataforma)

```bash
# As variáveis de ambiente já estão configuradas
# Apenas execute:
pnpm db:push
node server/seed-products.mjs
```

## 3️⃣ Iniciar o Servidor (1 minuto)

```bash
pnpm dev
```

Acesse: **http://localhost:3000**

---

## 🔍 Testar as APIs

### Com cURL:

```bash
# Listar produtos
curl http://localhost:3000/api/products

# Adicionar ao carrinho
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "productId": 1, "quantity": 2}'

# Obter carrinho
curl http://localhost:3000/api/cart?userId=1
```

### Com Thunder Client (VS Code):

1. Instale a extensão "Thunder Client"
2. Crie uma nova request
3. GET `http://localhost:3000/api/products`
4. Clique em "Send"

---

## 📝 Editar no VS Code

1. Abra a pasta `loja-escoteira` no VS Code
2. Edite os arquivos:
   - **Frontend**: `client/index.html`, `css/styles.css`, `js/products.js`
   - **Backend**: `server/routers/products.ts`, `server/db.ts`
   - **Database**: `drizzle/schema.ts`

3. As mudanças serão recarregadas automaticamente (HMR)

---

## 🚀 Próximos Passos

### 1. Conectar Frontend com APIs

Edite `js/products.js` para chamar as APIs:

```javascript
// Antes (dados locais):
const products = [{ id: 1, name: "Camiseta", price: 89.90 }, ...];

// Depois (API):
async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  renderProducts(products);
}
```

### 2. Adicionar Autenticação

Edite `server/routers/products.ts` para verificar permissões:

```typescript
// Adicionar middleware de autenticação
router.post("/", requireAuth, async (req, res) => {
  // Apenas usuários autenticados podem criar produtos
  // ...
});
```

### 3. Integrar Pagamento

Use Stripe, Mercado Pago ou PIX:

```typescript
// Em server/routers/orders.ts
router.post("/checkout", async (req, res) => {
  // Integrar com Stripe/Mercado Pago
  // Criar pedido no banco
  // Retornar link de pagamento
});
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Cannot find module" | `pnpm install` |
| "Port 3000 in use" | `PORT=3001 pnpm dev` |
| "Database connection error" | Verifique `DATABASE_URL` no `.env` |
| "Migrations failed" | `pnpm db:push` |
| "Hot reload não funciona" | Reinicie: `pnpm dev` |

---

## 📦 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `client/index.html` | Página principal (HTML) |
| `css/styles.css` | Estilos (CSS) |
| `js/products.js` | Lógica de produtos (JS) |
| `server/index.ts` | Servidor Express |
| `server/db.ts` | Funções de banco de dados |
| `drizzle/schema.ts` | Schema do banco de dados |
| `package.json` | Dependências do projeto |
| `.env` | Variáveis de ambiente |

---

## 💡 Dicas

- ✅ Use `pnpm db:studio` para visualizar o banco graficamente
- ✅ Use `pnpm format` para formatar o código
- ✅ Use `pnpm lint` para verificar erros
- ✅ Commit `.gitignore` para não versionare `node_modules`

---

## ✅ Checklist

- [ ] Extraiu o ZIP
- [ ] Instalou dependências (`pnpm install`)
- [ ] Criou `.env` com `DATABASE_URL`
- [ ] Rodou `pnpm db:push`
- [ ] Rodou `pnpm dev`
- [ ] Acessou `http://localhost:3000`
- [ ] Testou `/api/products`
- [ ] Abriu no VS Code

**Pronto! 🎉 Seu projeto está rodando localmente!**

---

Para mais detalhes, veja `INSTRUCOES-INSTALACAO.md`
