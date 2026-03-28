# 📁 Estrutura do Projeto - Loja Escoteira "Sempre Alerta"

## Visão Geral

```
loja-escoteira/
├── client/                      # Frontend (React + Vite)
├── server/                      # Backend (Express + TypeScript)
├── drizzle/                     # Database (Drizzle ORM)
├── css/                         # Estilos CSS
├── js/                          # JavaScript
├── public/                      # Arquivos estáticos
├── package.json                 # Dependências
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── drizzle.config.ts           # Configuração Drizzle
└── .env                        # Variáveis de ambiente
```

---

## 📂 Estrutura Detalhada

### 🖥️ Frontend (`client/`)

```
client/
├── index.html                  # Página principal (HTML)
├── src/
│   ├── main.tsx               # Entrada do Vite (vazio, apenas serve HTML)
│   └── pages/
│       └── Home.tsx           # Página de exemplo React (não usado)
└── public/
    └── index.html             # HTML servido ao usuário
```

**Arquivos principais:**
- `client/index.html` - Estrutura HTML da aplicação
- `client/src/main.tsx` - Ponto de entrada (mantém Vite funcionando)

---

### 🎨 Estilos (`css/`)

```
css/
├── styles.css                 # Estilos principais
│   ├── Variáveis CSS (cores, fontes, espaçamento)
│   ├── Tipografia
│   ├── Layout e Grid
│   ├── Componentes (header, cards, botões)
│   ├── Animações
│   └── Temas
│
└── responsive.css             # Responsividade
    ├── Mobile (480px)
    ├── Tablet (768px)
    └── Desktop (1024px+)
```

**Paleta de cores:**
- Verde Escuro: `#1a3a2a`
- Preto: `#000000`
- Branco: `#ffffff`
- Cinza: `#f5f5f5`

---

### 🔧 JavaScript (`js/`)

```
js/
├── main.js                    # Inicialização geral
│   ├── Carregamento de DOM
│   ├── Inicialização de módulos
│   └── Event listeners globais
│
├── products.js                # Gerenciamento de produtos
│   ├── Dados de produtos
│   ├── Renderização de cards
│   ├── Filtros por categoria
│   ├── Modal de detalhes
│   └── Busca
│
├── cart.js                    # Gerenciamento de carrinho
│   ├── Adicionar/remover itens
│   ├── Atualizar quantidade
│   ├── Cálculo de total
│   ├── localStorage
│   └── Notificações
│
├── ui.js                      # UI e interações
│   ├── Navegação
│   ├── Menu hamburger
│   ├── Scroll suave
│   ├── Modais
│   ├── Formulários
│   └── Validação
│
└── favorites.js               # Gerenciamento de favoritos
    ├── Adicionar/remover favoritos
    ├── Modal de favoritos
    ├── localStorage
    └── Contador de favoritos
```

**Fluxo de dados:**
```
main.js (inicializa)
  ├── products.js (carrega produtos)
  ├── cart.js (gerencia carrinho)
  ├── favorites.js (gerencia favoritos)
  └── ui.js (interações)
```

---

### 🖧 Backend (`server/`)

```
server/
├── index.ts                   # Servidor Express principal
│   ├── Middleware (JSON, CORS)
│   ├── Rotas de API
│   ├── Servir arquivos estáticos
│   └── Error handling
│
├── db.ts                      # Funções de banco de dados
│   ├── getProducts()
│   ├── getProductById()
│   ├── createProduct()
│   ├── updateProduct()
│   ├── deleteProduct()
│   ├── getCartItems()
│   ├── addToCart()
│   ├── removeFromCart()
│   ├── clearCart()
│   ├── createOrder()
│   ├── getOrdersByUserId()
│   ├── getFavorites()
│   ├── addFavorite()
│   └── removeFavorite()
│
├── storage.ts                 # Integração S3
│   ├── storagePut()           # Upload para S3
│   └── storageGet()           # Download do S3
│
├── routers/                   # APIs REST
│   ├── products.ts            # GET/POST/PUT/DELETE /api/products
│   ├── cart.ts                # GET/POST/DELETE /api/cart
│   ├── orders.ts              # GET/POST /api/orders
│   └── upload.ts              # POST /api/upload
│
├── seed-products.mjs          # Script para popular produtos
│
└── _core/                     # Configurações internas
    ├── env.ts                 # Variáveis de ambiente
    ├── cookies.ts             # Gerenciamento de cookies
    ├── trpc.ts                # tRPC setup
    └── index.ts               # Inicialização
```

**Fluxo de requisição:**
```
Cliente (fetch)
  ↓
Express (index.ts)
  ↓
Router (products.ts, cart.ts, etc)
  ↓
Database (db.ts)
  ↓
Drizzle ORM
  ↓
MySQL
  ↓
Resposta JSON
```

---

### 🗄️ Database (`drizzle/`)

```
drizzle/
├── schema.ts                  # Definição das tabelas
│   ├── users                  # Usuários do sistema
│   ├── products               # Catálogo de produtos
│   ├── orders                 # Pedidos realizados
│   ├── orderItems             # Itens de cada pedido
│   ├── cartItems              # Itens no carrinho
│   ├── favorites              # Produtos favoritados
│   └── productImages          # Múltiplas imagens por produto
│
├── migrations/                # Histórico de mudanças
│   ├── 0000_*.sql            # Primeira migração (users)
│   └── 0001_*.sql            # Segunda migração (produtos, pedidos, etc)
│
├── meta/                      # Metadados do Drizzle
│   ├── _journal.json          # Histórico de migrações
│   ├── 0000_snapshot.json     # Snapshot da primeira migração
│   └── 0001_snapshot.json     # Snapshot da segunda migração
│
└── relations.ts               # Relações entre tabelas (vazio)
```

**Tabelas principais:**

| Tabela | Colunas | Descrição |
|--------|---------|-----------|
| `users` | id, openId, name, email, role | Usuários do sistema |
| `products` | id, name, description, category, price, imageUrl, stock | Catálogo |
| `orders` | id, userId, status, totalPrice, createdAt | Pedidos |
| `orderItems` | id, orderId, productId, quantity, price | Itens do pedido |
| `cartItems` | id, userId, productId, quantity | Carrinho |
| `favorites` | id, userId, productId | Favoritos |
| `productImages` | id, productId, imageUrl, alt, order | Imagens |

---

### 📦 Configurações

```
package.json                   # Dependências do projeto
├── dependencies               # Pacotes necessários
│   ├── express               # Framework web
│   ├── drizzle-orm           # ORM para banco de dados
│   ├── mysql2                # Driver MySQL
│   ├── multer                # Upload de arquivos
│   └── ...
│
└── devDependencies           # Pacotes de desenvolvimento
    ├── typescript            # Type checking
    ├── vite                  # Build tool
    ├── tsx                   # TypeScript executor
    └── ...

vite.config.ts                # Configuração do Vite
├── Entrada (client/src/main.tsx)
├── Saída (dist/)
└── Servidor dev (port 3000)

tsconfig.json                 # Configuração TypeScript
├── Target (ES2020)
├── Module (ESM)
└── Strict mode

drizzle.config.ts             # Configuração Drizzle
├── Schema (drizzle/schema.ts)
├── Migrations (drizzle/migrations/)
└── Database (MySQL)

.env                          # Variáveis de ambiente
├── DATABASE_URL              # Conexão MySQL
├── JWT_SECRET                # Chave JWT
├── OAUTH_SERVER_URL          # URL OAuth
└── ...
```

---

## 🔄 Fluxo de Dados

### 1. Carregar Produtos

```
1. Cliente acessa http://localhost:3000
2. HTML carrega js/products.js
3. products.js faz fetch('/api/products')
4. Express router recebe em /api/products
5. products.ts chama db.getProducts()
6. Drizzle query executa SELECT no MySQL
7. Dados retornam como JSON
8. products.js renderiza cards
```

### 2. Adicionar ao Carrinho

```
1. Usuário clica "Adicionar ao Carrinho"
2. cart.js faz POST('/api/cart', { productId, quantity })
3. Express router recebe em POST /api/cart
4. cart.ts chama db.addToCart()
5. Drizzle INSERT no MySQL
6. Retorna sucesso
7. cart.js atualiza UI e localStorage
```

### 3. Criar Pedido

```
1. Usuário clica "Finalizar Compra"
2. cart.js faz POST('/api/orders', { totalPrice })
3. Express router recebe em POST /api/orders
4. orders.ts chama db.createOrder()
5. Drizzle INSERT no MySQL
6. Retorna ID do pedido
7. cart.js limpa carrinho e localStorage
8. Redireciona para confirmação
```

---

## 🔐 Segurança

### Autenticação (TODO)
- [ ] Implementar JWT
- [ ] Proteger rotas de admin
- [ ] Validar userId em requisições

### Validação (Parcial)
- ✅ Validação de formulário no frontend
- ✅ Validação de campos no backend
- [ ] Sanitização de entrada
- [ ] Rate limiting

### HTTPS
- ✅ Pronto para HTTPS em produção
- [ ] Configurar certificado SSL

---

## 📈 Performance

### Frontend
- ✅ CSS inline (sem requisições extras)
- ✅ JavaScript modular
- ✅ localStorage para cache
- [ ] Lazy loading de imagens
- [ ] Service Worker para offline

### Backend
- ✅ Queries otimizadas com Drizzle
- [ ] Caching de produtos
- [ ] Compressão GZIP
- [ ] Índices no banco de dados

---

## 🚀 Deployment

### Estrutura para Produção

```
dist/
├── public/                    # Frontend compilado
│   └── index.html
│
├── server/                    # Backend compilado
│   ├── index.js
│   ├── db.js
│   └── routers/
│
└── drizzle/                   # Migrations
    └── migrations/
```

### Comandos

```bash
# Build
pnpm build

# Start produção
NODE_ENV=production node dist/server/index.js
```

---

## 📚 Referências Rápidas

### Adicionar nova tabela

1. Edite `drizzle/schema.ts`
2. Execute `pnpm db:push`
3. Crie funções em `server/db.ts`
4. Crie router em `server/routers/`
5. Registre em `server/index.ts`

### Adicionar nova API

1. Crie `server/routers/novo.ts`
2. Implemente rotas (GET, POST, etc)
3. Importe em `server/index.ts`
4. Registre: `app.use("/api/novo", novoRouter)`

### Editar estilos

1. Edite `css/styles.css` (estilos principais)
2. Edite `css/responsive.css` (responsividade)
3. Mudanças recarregam automaticamente

### Adicionar novo produto

```bash
# Edite server/seed-products.mjs
# Adicione novo objeto ao array seedProducts
# Execute:
node server/seed-products.mjs
```

---

**Última atualização:** Fevereiro 2026
