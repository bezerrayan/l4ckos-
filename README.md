# Sempre Alerta - Loja Escoteira

Um site de e-commerce completo e responsivo para venda de materiais escoteiros, desenvolvido com HTML, CSS e JavaScript puros.

##  Descrição

**Sempre Alerta** é uma loja online dedicada a fornecer materiais de qualidade premium para o movimento escoteiro. O site oferece uma experiência moderna, intuitiva e totalmente responsiva, com foco nos valores de aventura, fraternidade, natureza, disciplina e crescimento pessoal.

##  Características Principais

### Funcionalidades
-  Catálogo de produtos com filtros por categoria
-  Carrinho de compras funcional (front-end com localStorage)
-  Modal de detalhes do produto
-  Página "Sobre a marca" com valores escoteiros
-  Formulário de contato com validação
-  Menu responsivo para mobile
-  Navegação fluida com scroll suave
-  Sistema de notificações
-  Suporte a localStorage para persistência de dados

### Design
-  Design moderno e profissional
-  Paleta de cores inspirada na natureza (verde floresta, marrom quente, bege natural)
-  Tipografia ousada (Poppins Bold para headings, Outfit para corpo)
-  Espaçamento generoso para sofisticação
-  Animações fluidas e feedback visual claro

### Responsividade
-  Totalmente responsivo (mobile, tablet, desktop)
-  Mobile-first approach
-  Breakpoints otimizados (480px, 768px, 1024px)
-  Menu hamburger para dispositivos pequenos

##  Estrutura de Pastas

```
loja-escoteira/
├── index.html                 # Arquivo HTML principal
├── css/
│   ├── styles.css            # Estilos principais
│   └── responsive.css        # Estilos responsivos
├── js/
│   ├── main.js               # Inicialização geral
│   ├── products.js           # Gerenciamento de produtos
│   ├── cart.js               # Gerenciamento do carrinho
│   └── ui.js                 # Funcionalidades de UI
├── README.md                 # Este arquivo
└── .gitignore               # Arquivos a ignorar no Git
```

## 🚀 Como Usar

### Abrir o Site
1. Abra o arquivo `index.html` em um navegador web moderno
2. Ou acesse através de um servidor local (recomendado para melhor performance)

### Usar um Servidor Local
```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server

# PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos responsivos com variáveis CSS
- **JavaScript ES6+**: Lógica da aplicação sem dependências externas
- **Google Fonts**: Tipografia (Poppins, Outfit)
- **localStorage**: Persistência de dados do carrinho

##  Produtos

O site inclui 3 produtos de exemplo

### Vestuário
- Camisetas Premium

##  Design Philosophy

O design segue a filosofia de **Modernismo Terrestre com Tipografia Ousada**:

- **Tipografia como Protagonista**: Fontes grandes e ousadas que criam hierarquia clara
- **Espaçamento Generoso**: Whitespace abundante para sofisticação
- **Paleta Terrestre Refinada**: Cores que evocam natureza e tradição escoteira
- **Assimetria Controlada**: Layouts dinâmicos que mantêm harmonia
- **Animações Fluidas**: Transições suaves que transmitem profissionalismo

##  Personalização

### Alterar Cores
Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --color-primary: #1B4D3E;           /* Verde Floresta */
    --color-secondary: #8B6F47;         /* Marrom Quente */
    --color-accent: #D97706;            /* Laranja Queimado */
    /* ... mais cores ... */
}
```

### Adicionar Produtos
Edite o array `products` em `js/products.js`:

```javascript
const products = [
    {
        id: 9,
        name: 'Novo Produto',
        category: 'acessorios',
        price: 99.90,
        description: 'Descrição do produto',
        image: 'url-da-imagem.jpg'
    },
    // ... mais produtos ...
];
```

### Alterar Tipografia
Edite as fontes em `css/styles.css`:

```css
--font-display: 'Poppins', sans-serif;
--font-body: 'Outfit', sans-serif;
```

##  Responsividade

O site é totalmente responsivo com breakpoints em:
- **480px**: Pequenos celulares
- **768px**: Tablets e celulares grandes
- **1024px**: Tablets grandes e desktops

##  Acessibilidade

- Estrutura HTML semântica
- Atributos `aria-label` em elementos interativos
- Contraste de cores adequado
- Suporte a navegação por teclado
- Modo reduzido de movimento (`prefers-reduced-motion`)

##  Segurança

- Validação de formulário no front-end
- Proteção contra XSS com textContent
- Sem dados sensíveis no JavaScript
- Pronto para integração com backend seguro

##  Performance

- Imagens otimizadas
- CSS minificado e bem organizado
- JavaScript sem dependências externas
- Lazy loading preparado para imagens
- Scroll suave sem impacto na performance

##  Preparado Para

- ✅ HTTPS
- ✅ Autenticação futura
- ✅ Integração com meios de pagamento (PIX, cartão, boleto)
- ✅ Backend para processamento de pedidos
- ✅ Banco de dados para produtos e pedidos
- ✅ Sistema de usuários e contas

## 📝 Comentários no Código

Todo o código está bem comentado e organizado:

- Seções claramente delimitadas
- Funções documentadas com JSDoc
- Explicações de lógica complexa
- Fácil de editar e manter

##  Troubleshooting

### Carrinho não persiste
Verifique se localStorage está habilitado no navegador.

### Imagens não carregam
Verifique se as URLs das imagens estão corretas em `js/products.js`.

### Menu mobile não funciona
Certifique-se de que JavaScript está habilitado.

### Estilos não aplicam
Limpe o cache do navegador (Ctrl+Shift+Delete ou Cmd+Shift+Delete).

##  Suporte e Contato

Para dúvidas ou sugestões sobre o site, use o formulário de contato na seção "Entre em Contato".

##  Licença

Este projeto é fornecido como está para uso educacional e comercial.

##  Aprendizado

Este projeto demonstra:
- Estrutura HTML semântica
- CSS moderno com variáveis e responsividade
- JavaScript ES6+ sem frameworks
- Padrões de design (MVC, Observer)
- Boas práticas de desenvolvimento web
- Acessibilidade web
- Performance web

##  Histórico de Versões

### v1.0.0 (2024)
- Lançamento inicial
- 8 produtos de exemplo
- Carrinho de compras funcional
- Formulário de contato
- Design responsivo completo

##  Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

**L4ckos** - Materiais Premium  
Desenvolvido com para o movimento escoteiro
