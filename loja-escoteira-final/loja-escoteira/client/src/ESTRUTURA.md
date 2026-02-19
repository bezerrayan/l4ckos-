# 📁 Estrutura do Projeto React + TypeScript

Este documento descreve a organização profissional do projeto frontend.

## 🎯 Visão Geral da Arquitetura

```
src/
├── components/          # Componentes React reutilizáveis
├── contexts/           # Contextos para estado global
├── hooks/              # Hooks customizados
├── lib/                # Utilitários, dados mock, configurações
├── pages/              # Páginas/rotas da aplicação
├── types/              # Definições TypeScript
├── App.tsx             # Componente raiz com rotas
├── main.tsx            # Ponto de entrada com Providers
└── index.css           # Estilos globais
```

---

## 📦 Pastas e Responsabilidades

### `components/` - Componentes Reutilizáveis

Componentes visuais e lógicos que podem ser reutilizados em várias páginas.

**Estrutura:**
```
components/
├── Header.tsx          # Cabeçalho com navegação e logo
├── ProductCard.tsx     # Card de produto (imagem, nome, preço)
├── ui/                 # Componentes UI base
│   ├── Button.tsx      # Botão reutilizável (primary, secondary, danger)
│   ├── Badge.tsx       # Tag/Badge para status (success, warning, danger)
│   ├── Card.tsx        # Container padrão (default, outlined, elevated)
│   ├── Modal.tsx       # Diálogo/Modal (sm, md, lg)
│   └── index.ts        # Exportador central
└── index.ts            # Exportador central
```

**Exemplos de uso:**
```tsx
// ❌ Não faça
import Button from '../components/ui/Button';

// ✅ Faça (mais limpo)
import { Button, Modal, Badge } from '../components';
```

---

### `contexts/` - Gerenciamento de Estado Global

Contextos React para estado global acessível em toda a app.

**Contextos disponíveis:**

1. **CartContext** 🛒
   - Gerencia: itens, total, quantidade de itens
   - Funções: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`
   - Hook: `useCart()`

2. **ThemeContext** 🎨
   - Gerencia: tema light/dark
   - Funções: `toggleTheme()`, `setTheme()`
   - Hook: `useTheme()`

3. **UserContext** 👤
   - Gerencia: usuário logado, sessão
   - Funções: `login()`, `logout()`, `setUser()`
   - Hook: `useUser()`

**Exemplo de uso:**
```tsx
import { useCart } from '../contexts';

export default function Produto() {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(produto, 1)}>
      Adicionar ao Carrinho
    </button>
  );
}
```

---

### `hooks/` - Hooks Customizados

Lógica reutilizável em forma de hooks.

**Hooks disponíveis:**

1. **usePersistFn** - Hook para funções persistentes (alternativa mais simples a useCallback)
2. **useComposition** - Hook para composição de eventos de teclado (útil para input, textarea)
3. **useMobile** - Hook para detectar se está em dispositivo mobile
4. **useSomething** - [Descrever conforme implementado]

**Exemplo de uso:**
```tsx
import { useMobile } from '../hooks';

export default function Layout() {
  const isMobile = useMobile();
  
  return (
    <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>
      {/* ... */}
    </div>
  );
}
```

---

### `lib/` - Utilitários e Configurações

Funções auxiliares, dados mock, e configurações.

**Arquivos:**

1. **utils.ts** - Funções utilitárias
   - `formatPrice(value: number)` → "R$ 150,00"
   - `formatDate(date)` → "07/02/2026"
   - `formatDateTime(date)` → "07/02/2026 10:30"
   - `truncate(str, length)` → "Hello..."
   - `capitalize(str)` → "Hello"
   - `createSlug(str)` → "hello-world"
   - `validateEmail(email)` → boolean
   - `generateId()` → "1644246839900-abc123xyz"
   - `delay(ms)` → Promise

2. **mockProducts.ts** - Dados simulados de produtos
   - `MOCK_PRODUCTS[]` - Array com produtos de teste
   - `getProducts()` - Retorna todos os produtos
   - `getProductById(id)` - Busca produto por ID
   - `getProductsByCategory(category)` - Filtra por categoria
   - `searchProducts(query)` - Busca por termo

3. **trpc.ts** - Configuração do tRPC para API

**Exemplo de uso:**
```tsx
import { getProducts, formatPrice } from '../lib';

export default function Produtos() {
  const produtos = getProducts();
  
  return (
    <p>Preço: {formatPrice(produto.price)}</p>
  );
}
```

---

### `types/` - Definições TypeScript

Tipos e interfaces TypeScript compartilhadas.

**Tipos disponíveis:**

1. **product.ts**
   ```typescript
   type Product = {
     id: number;
     name: string;
     description?: string;
     price: number;
     image: string;
     category?: string;
     stock?: number;
     rating?: number;
   }
   ```

2. **cart.ts**
   ```typescript
   type CartItem = {
     product: Product;
     quantity: number;
     addedAt: Date;
   }
   
   type Cart = {
     items: CartItem[];
     total: number;
     itemCount: number;
   }
   ```

3. **user.ts**
   ```typescript
   type User = {
     id: string;
     name: string;
     email: string;
     avatar?: string;
     isAuthenticated: boolean;
   }
   ```

**Exemplo de uso:**
```tsx
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
```

---

### `pages/` - Páginas/Rotas

Componentes que representam páginas completas (rotas).

**Páginas disponíveis:**

1. **Home.tsx** - Página inicial
   - Hero section
   - Destaques de produtos
   - Informações gerais

2. **Produtos.tsx** - Listagem de produtos
   - Busca por termo
   - Grade de produtos
   - Integração com CartContext

3. **Carrinho.tsx** - Carrinho de compras
   - Tabela de itens
   - Edição de quantidades
   - Resumo e total
   - Integração com CartContext

4. **NotFound.tsx** - Página 404
   - Exibida quando rota não existe
   - Link para voltar a home

**Exemplo de uso:**
```tsx
// Configurado em App.tsx
<Route path="/produtos" element={<Produtos />} />
```

---

## 🚀 Como Usar Esta Estrutura

### Importações Recomendadas

```tsx
// ✅ Usar os exportadores centrais (index.ts)
import { Button, Badge, Card, Modal } from '../components/ui';
import { CartProvider, useCart } from '../contexts';
import { useMobile, usePersistFn } from '../hooks';
import { formatPrice, getProducts } from '../lib';
import type { Product, Cart, User } from '../types';

// ❌ Evitar (mais verboso)
import Button from '../components/ui/Button';
import { CartProvider } from '../contexts/CartContext';
```

### Criar um Novo Componente

1. Crie seu arquivo em `components/`
2. Exporte em `components/index.ts`
3. Use em qualquer página

```tsx
// components/MyComponent.tsx
export default function MyComponent() {
  return <div>...</div>;
}

// components/index.ts
export { default as MyComponent } from './MyComponent';

// pages/Home.tsx
import { MyComponent } from '../components';
```

### Criar um Novo Hook

1. Crie seu arquivo em `hooks/`
2. Exporte em `hooks/index.ts`
3. Use em componentes

```tsx
// hooks/useMyHook.ts
export function useMyHook() {
  return { something: 'value' };
}

// hooks/index.ts
export { useMyHook } from './useMyHook';

// components/MyComponent.tsx
import { useMyHook } from '../hooks';
```

### Adicionar Novo Tipo

1. Crie ou atualize em `types/`
2. Exporte em `types/index.ts`

```tsx
// types/myType.ts
export type MyType = {
  id: number;
  name: string;
};

// types/index.ts
export type { MyType } from './myType';
```

---

## 📊 Diagrama de Fluxo de Dados

```
main.tsx (Providers)
    ↓
App.tsx (Rotas)
    ├─ Header (componente)
    └─ Pages (Home, Produtos, Carrinho, NotFound)
        ├─ useCart() (CartContext)
        ├─ useTheme() (ThemeContext)
        ├─ useUser() (UserContext)
        ├─ useMobile() (Hook)
        ├─ componentes (Button, Card, etc)
        └─ lib functions (formatPrice, etc)
```

---

## ✅ Checklist de Boas Práticas

- [ ] Componentes pequenos e reutilizáveis
- [ ] Separação clara de responsabilidades
- [ ] Imports usando exportadores centrais (`index.ts`)
- [ ] Tipos TypeScript bem definidos
- [ ] Contextos apenas para estado global
- [ ] Hooks para lógica reutilizável
- [ ] Utilitários em `lib/`
- [ ] Páginas apenas como rotas
- [ ] Comentários nos arquivos principais
- [ ] Nomes descritivos de funções e variáveis

---

## 📚 Próximos Passos

1. **Implementar API Real** - Substituir mockProducts por chamadas tRPC
2. **Adicionar Paginação** - Em Produtos.tsx
3. **Autenticação** - Implementar login/logout em UserContext
4. **Testes** - Adicionar testes unitários e integração
5. **Styling** - Considerar Tailwind CSS ou CSS Modules
6. **Performance** - Code splitting, lazy loading

---

## 🎯 Dúvidas Frequentes

**P: Onde colocar um novo arquivo?**
R: Identifique sua responsabilidade:
- Componente visual → `components/`
- Hook customizado → `hooks/`
- Tipo TypeScript → `types/`
- Função utilitária → `lib/`
- Página/rota → `pages/`
- Estado global → `contexts/`

**P: Como compartilhar estado entre componentes?**
R: Use `contexts/` para estado global, `props` para local.

**P: Preciso de mais contextos?**
R: Sim! Crie em `contexts/`, exporte em `contexts/index.ts`.

---

Projeto estruturado e pronto para desenvolvimento! 🚀
