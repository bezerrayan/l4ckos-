# 🔍 Guia de Atualização de Importações Após Reorganização

Após mover os arquivos, você precisa atualizar os caminhos de importação em vários arquivos.

---

## 📝 Arquivos que Precisam de Atualização

### 1. **server/index.ts** - Importação de Routers

**Antes:**
```typescript
import cartRoutes from "./cart";
import ordersRoutes from "./orders";
import productsRoutes from "./products";
import uploadRoutes from "./upload";
import mainRouter from "./routers";
```

**Depois:**
```typescript
import mainRouter from "./routers";
import cartRoutes from "./routers/cart";
import ordersRoutes from "./routers/orders";
import productsRoutes from "./routers/products";
import uploadRoutes from "./routers/upload";
```

---

### 2. **server/routers/index.ts** - (Novo arquivo renomeado de routers.ts)

Se o arquivo tiver importações relativas, precisam ser atualizadas.

**Exemplo - Antes:**
```typescript
import { db } from "../db";
import cartRouter from "./cart";
```

**Exemplo - Depois:**
```typescript
import { db } from "../db";
import cartRouter from "./cart"; // Permanece igual
```

---

### 3. **vite.config.ts** - Referência a Arquivos Estáticos

Verifique se a configuração de `publicDir` está correta:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  publicDir: "client/public", // Verifique este caminho
  root: "client"
});
```

---

### 4. **drizzle.config.ts** - Referência ao Schema

**Antes:**
```typescript
export default defineConfig({
  schema: "./schema.ts",
  // ...
});
```

**Depois:**
```typescript
export default defineConfig({
  schema: "./drizzle/schema.ts",
  // ...
});
```

---

### 5. **client/src/main.tsx** - Verificar se existe

Se foi movido de `main.tsx` para `client/src/main.tsx`, o Vite não precisa de alterações (este é o arquivo de entrada padrão).

---

### 6. **Importações em Arquivos JavaScript do Servidor**

Se há imports de rotas em arquivos como `server/_core/trpc.ts`:

**Exemplo:**
```typescript
// Antes
import cartRouter from "../cart";

// Depois
import cartRouter from "../routers/cart";
```

---

## ✅ Checklist de Verificação

Após realizar as movimentações, execute este checklist:

```bash
# 1. Verificar estrutura de pastas
ls -la client/public/
ls -la client/public/css/
ls -la client/public/js/
ls -la server/
ls -la server/routers/
ls -la drizzle/

# 2. Verificar se os arquivos foram movidos
file client/public/css/styles.css     # Deve existir
file server/routers/cart.ts           # Deve existir
file drizzle/schema.ts                # Deve existir

# 3. Instalar dependências (caso estejam quebradas)
pnpm install

# 4. Tipo-checar o TypeScript
pnpm tsc --noEmit

# 5. Tentar iniciar o servidor de dev
pnpm dev
```

---

## 🐛 Erros Comuns e Soluções

### Erro: `Cannot find module './routers/cart'`

**Solução:** Verifique se o arquivo `server/routers/cart.ts` foi movido corretamente.

```bash
ls -la server/routers/cart.ts
```

---

### Erro: `ENOENT: no such file or directory, scandir 'client/public'`

**Solução:** A pasta `client/public` não foi criada. Execute:

```bash
mkdir -p client/public/css client/public/js
```

---

### Erro: `Cannot find schema.ts`

**Solução:** Verifique o arquivo `drizzle.config.ts`:

```bash
# Verifique o caminho
grep "schema:" drizzle.config.ts

# Se necessário, corrija para:
# schema: "./drizzle/schema.ts"
```

---

### Erro: Ao executar `pnpm dev`, diz que não encontra `index.html`

**Solução:** Verifique o `vite.config.ts`:

```typescript
// Deve ter
root: "client"
```

---

## 🔧 Scripts Auxiliares

### Verificar Todos os Imports (PowerShell)

```powershell
# Procurar por imports incorretos
Get-ChildItem -Recurse -Include "*.ts" -Exclude "node_modules" | 
  Select-String -Pattern 'from ["\']\./(cart|orders|products|upload)' |
  Format-Table Path, Line
```

### Validar Estrutura Completa (PowerShell)

```powershell
# Verificar se todos os arquivos esperados existem
$requiredFiles = @(
    "client/public/css/styles.css",
    "client/public/css/responsive.css",
    "client/public/index.html",
    "client/public/js/main.js",
    "server/db.ts",
    "server/routers/cart.ts",
    "server/routers/index.ts",
    "drizzle/schema.ts"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ $file (FALTA)" -ForegroundColor Red
    }
}
```

---

## 📚 Recursos Adicionais

- [Documentação Vite](https://vitejs.dev/)
- [Documentação Express.js](https://expressjs.com/)
- [Documentação Drizzle ORM](https://orm.drizzle.team/)
- [Documentação TypeScript](https://www.typescriptlang.org/)

