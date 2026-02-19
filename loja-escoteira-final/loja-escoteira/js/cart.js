/**
 * CARRINHO DE COMPRAS
 * Gerenciamento de itens, armazenamento local e interface do carrinho
 */

// Chave para localStorage
const CART_STORAGE_KEY = 'sempre_alerta_cart';

/**
 * Classe para gerenciar o carrinho de compras
 */
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
    }

    /**
     * Carrega o carrinho do localStorage
     * @returns {Array} Array de itens do carrinho
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar carrinho do localStorage:', error);
            return [];
        }
    }

    /**
     * Salva o carrinho no localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
        } catch (error) {
            console.error('Erro ao salvar carrinho no localStorage:', error);
        }
    }

    /**
     * Adiciona um item ao carrinho
     * @param {number} productId - ID do produto
     * @param {number} quantity - Quantidade a adicionar
     */
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Produto não encontrado:', productId);
            return;
        }

        // Verifica se o produto já está no carrinho
        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            // Se existe, aumenta a quantidade
            existingItem.quantity += quantity;
        } else {
            // Se não existe, adiciona novo item
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveToStorage();
        this.updateUI();
        this.showNotification(`${product.name} adicionado ao carrinho!`);
    }

    /**
     * Remove um item do carrinho
     * @param {number} productId - ID do produto
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateUI();
    }

    /**
     * Atualiza a quantidade de um item
     * @param {number} productId - ID do produto
     * @param {number} quantity - Nova quantidade
     */
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateUI();
            }
        }
    }

    /**
     * Limpa o carrinho
     */
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
    }

    /**
     * Calcula o total do carrinho
     * @returns {number} Total em reais
     */
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Obtém a quantidade total de itens
     * @returns {number} Quantidade total
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Atualiza a interface do carrinho
     */
    updateUI() {
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartTotal();
    }

    /**
     * Atualiza o contador de itens no ícone do carrinho
     */
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Renderiza os itens do carrinho na sidebar
     */
    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="cart-empty"><p>Seu carrinho está vazio</p></div>';
            return;
        }

        cartItems.innerHTML = '';

        this.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-product-id="${item.id}" data-action="decrease">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <button class="remove-btn" data-product-id="${item.id}">Remover</button>
                </div>
            `;

            // Event listeners para quantidade
            cartItem.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(btn.dataset.productId);
                    const action = btn.dataset.action;
                    const item = this.items.find(i => i.id === productId);

                    if (action === 'increase') {
                        this.updateQuantity(productId, item.quantity + 1);
                    } else if (action === 'decrease') {
                        this.updateQuantity(productId, item.quantity - 1);
                    }
                });
            });

            // Event listener para remover
            cartItem.querySelector('.remove-btn').addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.removeItem(productId);
            });

            cartItems.appendChild(cartItem);
        });
    }

    /**
     * Atualiza o total exibido no carrinho
     */
    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            const total = this.getTotal();
            cartTotal.textContent = `R$ ${formatPrice(total)}`;
        }
    }

    /**
     * Mostra uma notificação ao usuário
     * @param {string} message - Mensagem a exibir
     */
    showNotification(message) {
        // Cria um elemento de notificação simples
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #10B981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInUp 0.3s ease-out;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Instância global do carrinho
const cart = new ShoppingCart();

// Inicializa o carrinho quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a UI do carrinho
    cart.updateUI();

    // Event listener para adicionar ao carrinho (modal)
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productId = parseInt(addToCartBtn.dataset.productId);
            const quantity = parseInt(document.getElementById('quantity').value) || 1;

            if (productId && quantity > 0) {
                cart.addItem(productId, quantity);
                closeProductModal();
            }
        });
    }

    // Event listeners para abrir/fechar carrinho
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const continueShopping = document.getElementById('continueShopping');

    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });
    }

    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    if (continueShopping && cartSidebar) {
        continueShopping.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    // Fecha o carrinho ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (cartSidebar && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
});
