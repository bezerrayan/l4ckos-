/**
 * SEMPRE ALERTA - LOJA ESCOTEIRA
 * Gerenciamento de Produtos - Design Minimalista
 */

// URLs das imagens reais
const PRODUCT_IMAGES = {
    'camiseta': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/JXy9jMBcgXzXdfFGrJALXw-img-1_1770397704000_na1fn_cHJvZHVjdC0xLWNhbWlzZXRh.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'lenco': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/JXy9jMBcgXzXdfFGrJALXw-img-2_1770397704000_na1fn_cHJvZHVjdC0yLWxlbmNv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'garrafa': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/JXy9jMBcgXzXdfFGrJALXw-img-3_1770397700000_na1fn_cHJvZHVjdC0zLWdhcnJhZmE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'bussola': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/JXy9jMBcgXzXdfFGrJALXw-img-4_1770397709000_na1fn_cHJvZHVjdC00LWJ1c3NvbGE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'mochila': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/JXy9jMBcgXzXdfFGrJALXw-img-5_1770397708000_na1fn_cHJvZHVjdC01LW1vY2hpbGE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'caneca': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/bkAGmACi8gxE6kAWky60P5-img-1_1770397736000_na1fn_cHJvZHVjdC02LWNhbmVjYQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'cinto': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/bkAGmACi8gxE6kAWky60P5-img-2_1770397732000_na1fn_cHJvZHVjdC03LWNpbnRv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    'mapa': 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/bkAGmACi8gxE6kAWky60P5-img-3_1770397737000_na1fn_cHJvZHVjdC04LW1hcGEtYnVzc29sYQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
};

// Base de dados de produtos
const PRODUCTS = [
    {
        id: 1,
        name: 'Camiseta Premium',
        category: 'vestuario',
        price: 89.90,
        image: PRODUCT_IMAGES.camiseta,
        description: 'Camiseta de alta qualidade em algodão 100%',
        fullDescription: 'Camiseta confeccionada em algodão 100% premium, com acabamento impecável. Perfeita para o dia a dia ou para usar em atividades ao ar livre. Disponível em diversos tamanhos.',
        sizes: ['P', 'M', 'G', 'GG', 'XG'],
        colors: ['Verde Escuro', 'Preto', 'Branco']
    },
    {
        id: 2,
        name: 'Lenço Personalizado',
        category: 'vestuario',
        price: 59.90,
        image: PRODUCT_IMAGES.lenco,
        description: 'Lenço tradicional com detalhes em ouro',
        fullDescription: 'Lenço confeccionado em tecido de alta qualidade com acabamento em ouro. Ideal para complementar seu uniforme ou usar em atividades especiais. Pode ser personalizado com bordados.',
        colors: ['Verde com Ouro', 'Azul com Ouro', 'Vermelho com Ouro']
    },
    {
        id: 3,
        name: 'Garrafa Térmica',
        category: 'hidratacao',
        price: 129.90,
        image: PRODUCT_IMAGES.garrafa,
        description: 'Garrafa isolada de 750ml em aço inoxidável',
        fullDescription: 'Garrafa térmica de alta performance com isolamento duplo em vácuo. Mantém bebidas quentes por até 12 horas e frias por até 24 horas. Perfeita para trilhas e acampamentos.',
        capacity: '750ml',
        colors: ['Verde Escuro', 'Preto', 'Prata']
    },
    {
        id: 4,
        name: 'Bússola Profissional',
        category: 'acessorios',
        price: 149.90,
        image: PRODUCT_IMAGES.bussola,
        description: 'Bússola de latão com agulha magnética de precisão',
        fullDescription: 'Bússola profissional de latão com agulha magnética de alta precisão. Inclui escala de medição e protetor. Ideal para navegação e orientação em trilhas.',
        material: 'Latão',
        precision: 'Alta Precisão'
    },
    {
        id: 5,
        name: 'Mochila 40L',
        category: 'acessorios',
        price: 299.90,
        image: PRODUCT_IMAGES.mochila,
        description: 'Mochila de trekking com compartimentos organizadores',
        fullDescription: 'Mochila de trekking de 40 litros com estrutura ergonômica, compartimentos organizadores e alças ajustáveis. Fabricada em nylon resistente com costuras reforçadas.',
        capacity: '40L',
        material: 'Nylon Resistente',
        weight: '1.2kg'
    },
    {
        id: 6,
        name: 'Caneca Térmica',
        category: 'hidratacao',
        price: 79.90,
        image: PRODUCT_IMAGES.caneca,
        description: 'Caneca térmica 350ml com tampa hermética',
        fullDescription: 'Caneca térmica em aço inoxidável com isolamento duplo. Mantém bebidas quentes ou frias. Inclui tampa hermética à prova de vazamentos.',
        capacity: '350ml',
        colors: ['Verde Escuro', 'Preto', 'Prata']
    },
    {
        id: 7,
        name: 'Cinto Canvas',
        category: 'acessorios',
        price: 69.90,
        image: PRODUCT_IMAGES.cinto,
        description: 'Cinto em canvas com fivela de metal resistente',
        fullDescription: 'Cinto confeccionado em canvas de alta qualidade com fivela de metal resistente. Ajustável e durável para uso em atividades outdoor.',
        material: 'Canvas Premium',
        colors: ['Preto', 'Cinza', 'Marrom']
    },
    {
        id: 8,
        name: 'Kit Navegação',
        category: 'acessorios',
        price: 249.90,
        image: PRODUCT_IMAGES.mapa,
        description: 'Kit completo com mapa, bússola e caderneta',
        fullDescription: 'Kit completo de navegação incluindo mapa topográfico, bússola profissional, caderneta à prova d\'água e caneta. Perfeito para expedições e trilhas.',
        includes: ['Mapa Topográfico', 'Bússola', 'Caderneta', 'Caneta']
    }
];

function renderProducts(productsToRender = PRODUCTS) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    productsToRender.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <button class="favorite-btn" data-product-id="${product.id}" aria-label="Adicionar aos favoritos">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                <button class="btn btn-primary product-btn" onclick="openProductModal(${product.id})">Ver Detalhes</button>
            </div>
        </div>
    `;

    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(product.id, favoriteBtn);
    });

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(product.id)) {
        favoriteBtn.classList.add('active');
    }

    return card;
}

function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    let detailsHTML = `
        <div class="product-detail">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">R$ ${product.price.toFixed(2)}</div>
                <p class="product-detail-description">${product.fullDescription}</p>
    `;

    if (product.sizes) {
        detailsHTML += `<div style="margin-bottom: 1rem;"><strong>Tamanhos:</strong> ${product.sizes.join(', ')}</div>`;
    }
    if (product.colors) {
        detailsHTML += `<div style="margin-bottom: 1rem;"><strong>Cores:</strong> ${product.colors.join(', ')}</div>`;
    }
    if (product.capacity) {
        detailsHTML += `<div style="margin-bottom: 1rem;"><strong>Capacidade:</strong> ${product.capacity}</div>`;
    }
    if (product.material) {
        detailsHTML += `<div style="margin-bottom: 1rem;"><strong>Material:</strong> ${product.material}</div>`;
    }
    if (product.includes) {
        detailsHTML += `<div style="margin-bottom: 1rem;"><strong>Incluso:</strong> ${product.includes.join(', ')}</div>`;
    }

    detailsHTML += `
                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                    <button class="btn btn-secondary" onclick="toggleFavoriteFromModal(${product.id})">❤️ Favorito</button>
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = detailsHTML;
    modal.classList.add('active');

    const favoriteBtn = modalBody.querySelector('.btn-secondary');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(product.id)) {
        favoriteBtn.style.backgroundColor = '#1a3a2e';
        favoriteBtn.style.color = 'white';
    }
}

function toggleFavoriteFromModal(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    renderProducts(getFilteredProducts());
    openProductModal(productId);
}

function getFilteredProducts(category = 'todos') {
    if (category === 'todos') {
        return PRODUCTS;
    }
    return PRODUCTS.filter(p => p.category === category);
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const countElement = document.getElementById('favoritesCount');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

function toggleFavorite(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1);
        button.classList.remove('active');
    } else {
        favorites.push(productId);
        button.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('productModal').classList.remove('active');
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1a3a2e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideInUp 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    updateFavoritesCount();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            renderProducts(getFilteredProducts(category));
        });
    });

    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('productModal').classList.remove('active');
    });

    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            document.getElementById('productModal').classList.remove('active');
        }
    });
});

window.openProductModal = openProductModal;
window.addToCart = addToCart;
window.toggleFavoriteFromModal = toggleFavoriteFromModal;
