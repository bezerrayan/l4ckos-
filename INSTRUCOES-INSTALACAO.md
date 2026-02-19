# 🚀 Instruções de Instalação - Loja Escoteira "Sempre Alerta"

## 📦 O que está incluído no ZIP

O arquivo `loja-escoteira-completo.zip` contém:

- ✅ **Código-fonte completo** (HTML, CSS, JavaScript, TypeScript)
- ✅ **Schema do banco de dados** com Drizzle ORM
- ✅ **Migrations** do banco de dados
- ✅ **APIs REST** (produtos, carrinho, pedidos, upload)
- ✅ **Configurações** (package.json, tsconfig, drizzle.config.ts)
- ✅ **Scripts** (seed de produtos, build, dev)
- ✅ **Documentação** (README.md)

**NÃO incluído** (será instalado automaticamente):
- `node_modules/` - será instalado com `pnpm install`
- `dist/` - será gerado no build
- `.git/` - você pode inicializar um novo repositório

---

## 🛠️ Passo a Passo de Instalação

### 1. **Extrair o ZIP**
```bash
unzip loja-escoteira-completo.zip -d loja-escoteira
cd loja-escoteira
```

### 2. **Instalar Node.js e pnpm** (se não tiver)
- **Node.js**: https://nodejs.org/ (versão 18+)
- **pnpm**: `npm install -g pnpm`

### 3. **Instalar dependências**
```bash
pnpm install
```

### 4. **Configurar variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/loja_escoteira

# OAuth (Manus)
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=seu-open-id-aqui

# Storage (S3)
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api-aqui

# JWT
JWT_SECRET=sua-chave-secreta-jwt-aqui

# App
VITE_APP_TITLE=Sempre Alerta
VITE_APP_ID=loja-escoteira
```

**Nota**: Se estiver usando um banco de dados local, você pode usar:
```env
DATABASE_URL=mysql://root:password@localhost:3306/loja_escoteira
```

### 5. **Criar o banco de dados**

Se estiver usando MySQL localmente:

```bash
# Criar banco de dados
mysql -u root -p -e "CREATE DATABASE loja_escoteira;"

# Aplicar migrations
pnpm db:push
```

### 6. **Popular o banco com produtos** (opcional)

```bash
node server/seed-products.mjs
```

### 7. **Iniciar o servidor de desenvolvimento**

```bash
pnpm dev
```

O site estará disponível em: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
loja-escoteira/
├── client/                 # Frontend (HTML, CSS, JS)
│   ├── index.html         # Página principal
│   └── src/
│       └── main.tsx       # Entrada do Vite
├── server/                # Backend (Node.js/Express)
│   ├── index.ts           # Servidor principal
│   ├── db.ts              # Funções de banco de dados
│   ├── storage.ts         # Integração S3
│   ├── routers/           # APIs REST
│   │   ├── products.ts    # GET/POST/PUT/DELETE produtos
│   │   ├── cart.ts        # Gerenciar carrinho
│   │   ├── orders.ts      # Gerenciar pedidos
│   │   └── upload.ts      # Upload de arquivos
│   └── seed-products.mjs  # Script para popular dados
├── drizzle/               # Schema e migrations
│   ├── schema.ts          # Definição das tabelas
│   ├── migrations/        # Arquivos de migração
│   └── 0001_*.sql         # SQL gerado
├── css/                   # Estilos
│   ├── styles.css         # Estilos principais
│   └── responsive.css     # Responsividade
├── js/                    # JavaScript
│   ├── products.js        # Gerenciar produtos
│   ├── cart.js            # Gerenciar carrinho
│   ├── ui.js              # UI e interações
│   ├── favorites.js       # Gerenciar favoritos
│   └── main.js            # Inicialização
├── package.json           # Dependências
├── drizzle.config.ts      # Configuração Drizzle
├── tsconfig.json          # Configuração TypeScript
└── vite.config.ts         # Configuração Vite
```

---

## 🔌 APIs Disponíveis

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Obter um produto
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Carrinho
- `GET /api/cart?userId=1` - Obter itens do carrinho
- `POST /api/cart` - Adicionar item ao carrinho
- `DELETE /api/cart/:id` - Remover item do carrinho
- `DELETE /api/cart?userId=1` - Limpar carrinho

### Pedidos
- `GET /api/orders?userId=1` - Listar pedidos do usuário
- `POST /api/orders` - Criar novo pedido

### Upload
- `POST /api/upload` - Upload de arquivo para S3

---

## 🗄️ Schema do Banco de Dados

### Tabelas criadas:

1. **users** - Usuários do sistema
2. **products** - Catálogo de produtos
3. **orders** - Pedidos realizados
4. **orderItems** - Itens de cada pedido
5. **cartItems** - Itens no carrinho
6. **favorites** - Produtos favoritados
7. **productImages** - Múltiplas imagens por produto

---

## 📝 Editar no VS Code

1. Abra a pasta `loja-escoteira` no VS Code
2. Instale as extensões recomendadas:
   - **Prettier** - Formatação de código
   - **ESLint** - Verificação de código
   - **Thunder Client** ou **REST Client** - Testar APIs

3. Edite os arquivos:
   - **Frontend**: `client/index.html`, `css/styles.css`, `js/products.js`
   - **Backend**: `server/routers/*.ts`, `drizzle/schema.ts`

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Iniciar servidor dev

# Build
pnpm build            # Fazer build para produção

# Banco de dados
pnpm db:push          # Aplicar migrations
pnpm db:studio        # Abrir Drizzle Studio (GUI)

# Seed
node server/seed-products.mjs  # Popular produtos

# Testes
pnpm test             # Rodar testes

# Linting
pnpm lint             # Verificar código
pnpm format           # Formatar código
```

---

## 🔐 Segurança

⚠️ **Importante**: 

- Nunca commit o arquivo `.env` com credenciais reais
- Use `.env.example` para documentar variáveis necessárias
- Mude `JWT_SECRET` para uma chave forte e aleatória
- Implemente autenticação antes de fazer deploy

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'mysql2'"
```bash
pnpm install mysql2
```

### Erro: "Database connection failed"
- Verifique se o MySQL está rodando
- Verifique a `DATABASE_URL` no `.env`
- Crie o banco de dados: `CREATE DATABASE loja_escoteira;`

### Erro: "Port 3000 already in use"
```bash
# Mude a porta no .env ou use:
PORT=3001 pnpm dev
```

---

## 📞 Suporte

Para dúvidas sobre o código, consulte:
- `README.md` - Documentação do projeto
- `server/routers/` - Exemplos de APIs
- `drizzle/schema.ts` - Estrutura do banco de dados

---

## ✅ Checklist de Implementação

Após instalar, você pode:

- [ ] Testar as APIs com Thunder Client/Postman
- [ ] Editar produtos no banco de dados
- [ ] Customizar estilos CSS
- [ ] Adicionar novas funcionalidades no backend
- [ ] Integrar sistema de pagamento
- [ ] Implementar autenticação de usuários
- [ ] Fazer deploy em produção

---

**Bom desenvolvimento! 🚀**
