# 🛍️ YC Store - E-commerce Escoteiro

> Aplicação React + TypeScript profissional para venda de materiais do Movimento Escoteiro

## 📱 Demo

Acesse a aplicação em desenvolvimento: **http://localhost:5173**

---

## 🎯 Características

✨ **Estrutura Profissional**
- Organização em camadas (componentes, contextos, utilitários)
- TypeScript com tipagem completa
- Padrões de código consistentes

🛒 **Funcionalidades de E-commerce**
- Catálogo de produtos com busca
- Carrinho de compras funcional
- Sistema de temas (light/dark)
- Autenticação (scaffold)

⚡ **Performance**
- React Query para cache
- tRPC para API type-safe
- Componentes otimizados

🎨 **UI/UX**
- Componentes reutilizáveis
- Design responsivo
- Acessibilidade em mente

---

## 📁 Estrutura do Projeto

```
client/src/
├── components/          # Componentes React
│   ├── Header.tsx       # Cabeçalho/navegação
│   ├── ProductCard.tsx  # Card de produto
│   └── ui/              # Componentes base
│
├── contexts/            # Estado global
│   ├── CartContext.tsx   # Gerenciamento de carrinho
│   ├── ThemeContext.tsx  # Tema light/dark
│   └── UserContext.tsx   # Usuário/autenticação
│
├── hooks/               # Hooks customizados
│   ├── useMobile.tsx    # Detectar mobile
│   ├── usePersistFn.ts  # Função persistente
│   └── ...
│
├── lib/                 # Utilitários
│   ├── mockProducts.ts  # Dados de teste
│   ├── utils.ts         # Funções auxiliares
│   └── trpc.ts          # Configuração tRPC
│
├── types/               # Tipos TypeScript
│   ├── product.ts       # Tipo Product
│   ├── cart.ts          # Tipos do carrinho
│   └── user.ts          # Tipos de usuário
│
├── pages/               # Rotas/Páginas
│   ├── Home.tsx         # Página inicial
│   ├── Produtos.tsx     # Lista de produtos
│   ├── Carrinho.tsx     # Carrinho
│   └── NotFound.tsx     # Página 404
│
├── App.tsx              # Rotas principais
├── main.tsx             # Entrada com Providers
└── index.css            # Estilos globais
```

Veja a documentação completa em [ESTRUTURA.md](./ESTRUTURA.md)

---

## 🚀 Começar Rapidamente

### Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone <url>
cd loja-escoteira

# Instale dependências
cd client
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

### Build para Produção

```bash
pnpm build
pnpm preview
```

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [ESTRUTURA.md](./ESTRUTURA.md) | Guia completo da arquitetura |
| [GUIA-COMPLETO.md](./GUIA-COMPLETO.md) | Resumo das mudanças realizadas |
| [MAPA-MENTAL.md](./MAPA-MENTAL.md) | Visualização da estrutura |
| [CHECKLIST.md](./CHECKLIST.md) | Checklist do que foi implementado |

---

## 💻 Exemplos de Uso

### Usar o CartContext

```tsx
import { useCart } from './contexts';

export default function ProductPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  
  return (
    <>
      <button onClick={() => addToCart(product, 1)}>
        Add to Cart
      </button>
      <p>Items: {cart.itemCount}</p>
    </>
  );
}
```

### Usar Componentes UI

```tsx
import { Button, Badge, Card, Modal } from './components';

export default function Page() {
  const [open, setOpen] = useState(false);
  
  return (
    <Card>
      <Badge variant="success">Active</Badge>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Content
      </Modal>
    </Card>
  );
}
```

### Usar Utilitários

```tsx
import { formatPrice, getProducts, useMobile } from './lib';

export default function Shop() {
  const isMobile = useMobile();
  const products = getProducts();
  
  return (
    <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>
      {products.map(p => (
        <p key={p.id}>{formatPrice(p.price)}</p>
      ))}
    </div>
  );
}
```

---

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Tipagem
- **React Router** - Roteamento
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **tRPC** - API type-safe
- **React Query** - Cache de dados
- **React Context** - Estado global

---

## 📦 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor dev
pnpm build        # Build para produção
pnpm preview      # Preview do build
pnpm lint         # Verifica ESLint
pnpm type-check   # Verifica tipos TypeScript
pnpm test         # Rodas testes
```

---

## 🤝 Como Contribuir

1. Create uma branch de feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

---

## 📝 Notas Importantes

⚠️ **Mock Data**: O projeto usa dados mock para produtos. Integre com sua API real substituindo `mockProducts.ts`.

⚠️ **Autenticação**: O contexto `UserContext` é um scaffold. Implemente com sua camada de autenticação real.

⚠️ **Persistência**: O carrinho está em memoria. Considere usar localStorage ou salvar no servidor.

---

## 🐛 Debugging

### TypeScript Errors
```bash
pnpm tsc --noEmit
```

### Verificar imports
```bash
# Os imports devem usar os exportadores index.ts
❌ import { Button } from './components/ui/Button'
✅ import { Button } from './components'
```

---

## 📊 Status

- ✅ Estrutura base
- ✅ Componentes principais
- ✅ Contextos de estado
- ✅ Páginas funcionais
- ⏳ Integração com API real
- ⏳ Testes automatizados
- ⏳ Documentação de componentes

---

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

## 👥 Autor

Desenvolvido como projeto de e-commerce para o Movimento Escoteiro.

---

## 📞 Suporte

Consulte a documentação em `src/ESTRUTURA.md` ou veja exemplos nos arquivos existentes.

---

## 🎉 Agradecimentos

Obrigado por usar YC Store! Happy coding! 🚀
