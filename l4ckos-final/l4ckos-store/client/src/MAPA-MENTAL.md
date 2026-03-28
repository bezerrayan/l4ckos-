# 🗺️ Mapa Mental - Estrutura do Projeto

```
┌─────────────────────────────────────────────────────────────────────┐
│                        APLICAÇÃO REACT                              │
│                  client/src/main.tsx                                │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │   GLOBAL PROVIDERS       │
                    ├─────────────────────────┤
                    │ • tRPC + React Query    │
                    │ • ThemeProvider         │
                    │ • CartProvider          │
                    │ • UserProvider          │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │   App.tsx                │
                    │  (Rotas do Aplicativo)  │
                    ├─────────────────────────┤
                    │ • <Header />            │
                    │ • <Routes>              │
                    │   ├─ / ← Home           │
                    │   ├─ /produtos ← Prod.│
                    │   ├─ /carrinho ← Cart  │
                    │   └─ /* ← NotFound     │
                    └─────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                      CAMADAS DO PROJETO                              │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ 📄 PÁGINAS (pages/)                                                  │
├──────────────────────────────────────────────────────────────────────┤
│ • Home.tsx         → Página inicial com destaques                  │
│ • Produtos.tsx     → Listagem de produtos com busca               │
│ • Carrinho.tsx     → Gerenciamento do carrinho                    │
│ • NotFound.tsx     → Página 404                                   │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
All pages use ↓
┌──────────────────────────────────────────────────────────────────────┐
│ 🎨 COMPONENTES (components/)                                        │
├──────────────────────────────────────────────────────────────────────┤
│ • Header.tsx              → Cabeçalho/Navegação                    │
│ • ProductCard.tsx         → Card de Produto                        │
│ • ui/Button.tsx           → Botão (4 variantes)                   │
│ • ui/Badge.tsx            → Tag/Status (5 variantes)              │
│ • ui/Card.tsx             → Container (3 variantes)               │
│ • ui/Modal.tsx            → Diálogo modal (3 tamanhos)            │
└──────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 🧠 ESTADO GLOBAL (contexts/)                                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ CartContext ◄─────┐                                                │
│ ├─ cart           │                                                │
│ ├─ addToCart()    │────► Páginas                                │
│ ├─ removeFromCart │      podem acessar                            │
│ ├─ updateQuantity │      via useCart()                            │
│ └─ clearCart()    │                                                │
│                   │                                                │
│ ThemeContext ◄────┤                                                │
│ ├─ theme          │────► Componentes                             │
│ ├─ toggleTheme()  │      podem acessar                            │
│ └─ setTheme()     │      via useTheme()                           │
│                   │                                                │
│ UserContext ◄─────┤                                                │
│ ├─ user           │────► Hooks podem                              │
│ ├─ login()        │      acessar via                              │
│ ├─ logout()       │      useUser()                                │
│ └─ isAuth         │                                                │
│                   │                                                │
└──────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 🎣 HOOKS CUSTOMIZADOS (hooks/)                                      │
├──────────────────────────────────────────────────────────────────────┤
│ • usePersistFn()      → Função persistente (Alternativa a useCallback)
│ • useComposition()    → Eventos composição (Input/Textarea)         │
│ • useMobile()         → Detectar dispositivo mobile                │
│ • useSomething()      → Hook customizado [Seu uso específico]     │
└──────────────────────────────────────────────────────────────────────┘
         ↓ usados por ↓
┌──────────────────────────────────────────────────────────────────────┐
│ ⚙️ UTILITÁRIOS (lib/)                                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ utils.ts                                                             │
│ ├─ formatPrice(150) → "R$ 150,00"                                 │
│ ├─ formatDate()     → "07/02/2026"                                │
│ ├─ truncate()       → "Hel..."                                    │
│ ├─ capitalize()     → "Hello"                                     │
│ ├─ createSlug()     → "hello-world"                               │
│ ├─ validateEmail()  → boolean                                     │
│ ├─ generateId()     → uuid-like                                   │
│ └─ delay()          → Promise                                     │
│                                                                      │
│ mockProducts.ts                                                      │
│ ├─ getProducts()           → Product[]                             │
│ ├─ getProductById(id)      → Product                              │
│ ├─ getProductsByCategory() → Product[]                            │
│ └─ searchProducts(query)   → Product[]                            │
│                                                                      │
│ trpc.ts                                                              │
│ └─ Configuração tRPC para API                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 📝 TIPOS (types/)                                                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ product.ts                                                           │
│ └─ type Product = {                                                 │
│    id, name, description, price, image,                             │
│    category, stock, rating                                          │
│ }                                                                    │
│                                                                      │
│ cart.ts                                                              │
│ ├─ type CartItem = {                                               │
│ │  product, quantity, addedAt                                      │
│ │ }                                                                  │
│ └─ type Cart = {                                                   │
│    items, total, itemCount                                          │
│ }                                                                    │
│                                                                      │
│ user.ts                                                              │
│ ├─ type User = {                                                   │
│ │  id, name, email, avatar, isAuthenticated                       │
│ │ }                                                                  │
│ └─ type UserSession = {                                            │
│    user, isLoading, error                                           │
│ }                                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 📦 STRUCTURE DE IMPORTS                                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ✅ CERTO (Use os exportadores)                                     │
│ ─ import { Button, Modal } from './components'                     │
│ ─ import { useCart, useTheme } from './contexts'                   │
│ ─ import { useMobile } from './hooks'                             │
│ ─ import { formatPrice, getProducts } from './lib'                 │
│ ─ import type { Product, Cart } from './types'                     │
│                                                                      │
│ ❌ ERRADO (Não fazer)                                              │
│ ─ import Button from './components/ui/Button'                      │
│ ─ import { CartProvider } from './contexts/CartContext'            │
│ ─ import { formatPrice } from './lib/utils'                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘


                         ┌──────────────────────────┐
                         │  FLUXO DE DADOS TÍPICO   │
                         └──────────────────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │  Usuário clica "Comprar"       │
                    │  em ProductCard.tsx            │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │  Componente chama:             │
                    │  useCart().addToCart()         │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │  CartContext atualiza estado   │
                    │  (adiona item ao carrinho)     │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │  Componentes que usam          │
                    │  useCart() re-renderizam       │
                    │  automaticamente               │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │  Header mostra novo contador   │
                    │  Carrinho.tsx mostra item      │
                    │  novo                         │
                    └────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 🎓 PADRÕES UTILIZADOS                                              │
├──────────────────────────────────────────────────────────────────────┤
│ ✅ Container/Presentational Components                              │
│ ✅ Compound Components (Modal, Card)                               │
│ ✅ Hooks para lógica reutilizável                                 │
│ ✅ Context API para estado global                                 │
│ ✅ Composition over Inheritance                                    │
│ ✅ TypeScript Strict Mode                                         │
│ ✅ Relative Imports com index.ts                                  │
│ ✅ Single Responsibility Principle (SRP)                           │
│ ✅ Don't Repeat Yourself (DRY)                                    │
└──────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│ 🚀 PRONTO PARA COMEÇAR!                                            │
├──────────────────────────────────────────────────────────────────────┤
│ ✓ Estrutura profissional                                           │
│ ✓ Componentes reutilizáveis                                       │
│ ✓ Estado global organizado                                        │
│ ✓ Tipos TypeScript completos                                     │
│ ✓ Utilitários prontos para uso                                   │
│ ✓ Documentação clara                                              │
│ ✓ Padrões de código consistentes                                 │
│ ✓ Pronto para produção                                           │
└──────────────────────────────────────────────────────────────────────┘
