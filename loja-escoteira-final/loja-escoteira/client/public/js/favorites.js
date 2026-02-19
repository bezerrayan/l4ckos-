/**
 * GERENCIADOR DE FAVORITOS
 * Funcionalidades para salvar, carregar e gerenciar lista de desejos
 */

/**
 * Classe para gerenciar favoritos
 */
class FavoritesManager {
    constructor() {
        this.storageKey = 'sempre_alerta_favorites';
        this.favorites = this.loadFavorites();
        this.init();
    }

    /**
     * Inicializa o gerenciador
     */
    init() {
        // Atualiza os botões de favorito ao carregar a página
        this.updateFavoriteButtons();

        // Escuta mudanças no localStorage de outras abas
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.favorites = JSON.parse(e.newValue || '[]');
                this.updateFavoriteButtons();
            }
        });

        // Atualiza favoritos quando o modal é aberto
        document.addEventListener('productModalOpened', () => {
            this.updateFavoriteButtons();
        });
    }

    /**
     * Carrega favoritos do localStorage
     * @returns {Array} Array de IDs de produtos favoritados
     */
    loadFavorites() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Erro ao carregar favoritos:', e);
            return [];
        }
    }

    /**
     * Salva favoritos no localStorage
     */
    saveFavorites() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
            // Dispara evento customizado para sincronização
            window.dispatchEvent(new Event('favoritesChanged'));
        } catch (e) {
            console.error('Erro ao salvar favoritos:', e);
        }
    }

    /**
     * Adiciona um produto aos favoritos
     * @param {number} productId - ID do produto
     */
    addFavorite(productId) {
        if (!this.favorites.includes(productId)) {
            this.favorites.push(productId);
            this.saveFavorites();
            this.showNotification(`Produto adicionado aos favoritos!`, 'success');
            logWithTimestamp(`Produto ${productId} adicionado aos favoritos`);
        }
    }

    /**
     * Remove um produto dos favoritos
     * @param {number} productId - ID do produto
     */
    removeFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            this.showNotification(`Produto removido dos favoritos`, 'info');
            logWithTimestamp(`Produto ${productId} removido dos favoritos`);
        }
    }

    /**
     * Alterna o status de favorito
     * @param {number} productId - ID do produto
     */
    toggleFavorite(productId) {
        if (this.isFavorite(productId)) {
            this.removeFavorite(productId);
        } else {
            this.addFavorite(productId);
        }
        this.updateFavoriteButtons();
    }

    /**
     * Verifica se um produto é favorito
     * @param {number} productId - ID do produto
     * @returns {boolean} Se o produto é favorito
     */
    isFavorite(productId) {
        return this.favorites.includes(productId);
    }

    /**
     * Obtém todos os favoritos
     * @returns {Array} Array de IDs de produtos favoritados
     */
    getFavorites() {
        return [...this.favorites];
    }

    /**
     * Obtém o número de favoritos
     * @returns {number} Quantidade de favoritos
     */
    getFavoritesCount() {
        return this.favorites.length;
    }

    /**
     * Limpa todos os favoritos
     */
    clearFavorites() {
        this.favorites = [];
        this.saveFavorites();
        this.showNotification('Todos os favoritos foram removidos', 'info');
    }

    /**
     * Atualiza os botões de favorito na página
     */
    updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            if (this.isFavorite(productId)) {
                btn.classList.add('active');
                btn.setAttribute('aria-label', 'Remover dos favoritos');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-label', 'Adicionar aos favoritos');
            }
        });

        // Atualiza o contador de favoritos
        this.updateFavoritesCount();
    }

    /**
     * Atualiza o contador de favoritos no header
     */
    updateFavoritesCount() {
        const favoritesCount = document.getElementById('favoritesCount');
        if (favoritesCount) {
            const count = this.getFavoritesCount();
            favoritesCount.textContent = count;
            favoritesCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Mostra uma notificação
     * @param {string} message - Mensagem
     * @param {string} type - Tipo (success, info, error)
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6';

        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: ${bgColor};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 999;
            animation: slideInUp 0.3s ease-out;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Exporta favoritos como JSON
     * @returns {string} JSON dos favoritos
     */
    exportFavorites() {
        return JSON.stringify(this.favorites, null, 2);
    }

    /**
     * Importa favoritos de um JSON
     * @param {string} jsonData - JSON dos favoritos
     */
    importFavorites(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.favorites = imported;
                this.saveFavorites();
                this.showNotification('Favoritos importados com sucesso!', 'success');
            }
        } catch (e) {
            console.error('Erro ao importar favoritos:', e);
            this.showNotification('Erro ao importar favoritos', 'error');
        }
    }
}

/**
 * Inicializa o gerenciador de favoritos quando o DOM está pronto
 */
let favoritesManager;

document.addEventListener('DOMContentLoaded', () => {
    favoritesManager = new FavoritesManager();
});

/**
 * Função global para adicionar aos favoritos
 * @param {number} productId - ID do produto
 */
function addToFavorites(productId) {
    if (favoritesManager) {
        favoritesManager.toggleFavorite(productId);
    }
}

/**
 * Função global para obter favoritos
 * @returns {Array} Array de IDs de produtos favoritados
 */
function getFavorites() {
    return favoritesManager ? favoritesManager.getFavorites() : [];
}
