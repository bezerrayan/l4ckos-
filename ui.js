/**
 * UI E INTERAÇÃO
 * Funcionalidades de navegação, modal, filtros e eventos gerais
 */

/**
 * Gerencia a navegação e links ativos
 */
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        // Event listeners para links de navegação
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigateTo(href);
                this.closeMenu();
            });
        });

        // Atualiza o link ativo ao fazer scroll
        window.addEventListener('scroll', () => this.updateActiveLink());

        // Atualiza links ativos ao carregar a página
        this.updateActiveLink();
    }

    /**
     * Navega para uma seção
     * @param {string} sectionId - ID da seção
     */
    navigateTo(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Atualiza o link ativo baseado na posição do scroll
     */
    updateActiveLink() {
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Fecha o menu mobile
     */
    closeMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
}

/**
 * Gerencia o modal de produtos
 */
class ProductModal {
    constructor() {
        this.modal = document.getElementById('productModal');
        this.closeBtn = document.getElementById('modalClose');
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Fecha o modal ao clicar no botão de fechar
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Fecha o modal ao clicar fora dele
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Fecha o modal ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    /**
     * Abre o modal
     */
    open() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Fecha o modal
     */
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

/**
 * Gerencia os filtros de categoria
 */
class CategoryFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove a classe active de todos os botões
                this.filterBtns.forEach(b => b.classList.remove('active'));

                // Adiciona a classe active ao botão clicado
                btn.classList.add('active');

                // Filtra os produtos
                const category = btn.dataset.category;
                filterProductsByCategory(category);
            });
        });
    }
}

/**
 * Gerencia o menu mobile
 */
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.navMenu) return;

        this.menuToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Gerencia o formulário de contato
 */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Coleta os dados do formulário
            const formData = new FormData(this.form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Valida os dados
            if (!this.validate(data)) {
                return;
            }

            // Simula envio do formulário
            this.submit(data);
        });
    }

    /**
     * Valida os dados do formulário
     * @param {Object} data - Dados do formulário
     * @returns {boolean} Se os dados são válidos
     */
    validate(data) {
        if (!data.name || data.name.trim().length < 3) {
            this.showError('Nome deve ter pelo menos 3 caracteres');
            return false;
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            this.showError('Email inválido');
            return false;
        }

        if (!data.subject) {
            this.showError('Selecione um assunto');
            return false;
        }

        if (!data.message || data.message.trim().length < 10) {
            this.showError('Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }

        return true;
    }

    /**
     * Valida um email
     * @param {string} email - Email a validar
     * @returns {boolean} Se o email é válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Simula o envio do formulário
     * @param {Object} data - Dados do formulário
     */
    submit(data) {
        // Aqui você poderia enviar os dados para um servidor
        console.log('Dados do formulário:', data);

        // Mostra mensagem de sucesso
        this.showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');

        // Limpa o formulário
        this.form.reset();
    }

    /**
     * Mostra mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Mostra mensagem de sucesso
     * @param {string} message - Mensagem de sucesso
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Mostra uma notificação
     * @param {string} message - Mensagem
     * @param {string} type - Tipo (success ou error)
     */
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#10B981' : '#EF4444';

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInUp 0.3s ease-out;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            max-width: 400px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove a notificação após 4 segundos
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

/**
 * Gerencia scroll suave
 */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Scroll suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/**
 * Adiciona animações ao scroll
 */
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        // Usa Intersection Observer para animações ao scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observa elementos com classe animável
        document.querySelectorAll('.product-card, .value-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// Inicializa todos os componentes de UI quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ProductModal();
    new CategoryFilter();
    new MobileMenu();
    new ContactForm();
    new SmoothScroll();
    new ScrollAnimations();
});


/**
 * Gerencia o ícone de favoritos no header
 */
class FavoritesHeaderIcon {
    constructor() {
        this.favoritesIcon = document.getElementById('favoritesIcon');
        this.init();
    }

    init() {
        if (!this.favoritesIcon) return;

        // Escuta mudanças nos favoritos
        window.addEventListener('favoritesChanged', () => {
            this.updateIcon();
        });

        // Clica no ícone para mostrar favoritos
        this.favoritesIcon.addEventListener('click', () => {
            if (favoritesManager) {
                const favorites = favoritesManager.getFavorites();
                this.showFavoritesModal(favorites);
            }
        });

        // Atualiza o ícone ao carregar
        this.updateIcon();
    }

    /**
     * Atualiza o ícone de favoritos
     */
    updateIcon() {
        if (!this.favoritesIcon || !favoritesManager) return;

        const count = favoritesManager.getFavoritesCount();
        const countBadge = document.getElementById('favoritesCount');

        if (countBadge) {
            countBadge.textContent = count;
            countBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Mostra um modal com os favoritos
     * @param {Array} favorites - Array de IDs de produtos favoritados
     */
    showFavoritesModal(favorites) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';

        let content = `
            <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 28px; cursor: pointer; color: #666;">&times;</button>
                <div style="padding: 30px;">
                    <h2 style="color: #1B4D3E; margin-bottom: 20px; font-family: 'Poppins', sans-serif; font-weight: bold;">Meus Favoritos</h2>
        `;

        if (favorites.length === 0) {
            content += `
                <p style="color: #999; text-align: center; padding: 40px 0;">
                    Você ainda não adicionou nenhum produto aos favoritos.
                </p>
            `;
        } else {
            content += '<ul style="list-style: none; padding: 0;">';
            favorites.forEach(productId => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    content += `
                        <li style="padding: 15px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="color: #1B4D3E;">${product.name}</strong>
                                <p style="color: #999; font-size: 14px; margin: 5px 0;">R$ ${formatPrice(product.price)}</p>
                            </div>
                            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 12px;" onclick="addToCart(${product.id})">Adicionar</button>
                        </li>
                    `;
                }
            });
            content += '</ul>';
        }

        content += `
                    <div style="margin-top: 20px; display: flex; gap: 10px;">
                        <button class="btn btn-primary" style="flex: 1;" onclick="document.querySelector('.favorites-modal').remove();">Fechar</button>
                        ${favorites.length > 0 ? `<button class="btn" style="flex: 1; background-color: #EF4444; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;" onclick="favoritesManager.clearFavorites(); document.querySelector('.favorites-modal').remove();">Limpar Favoritos</button>` : ''}
                    </div>
                </div>
            </div>
        `;

        modal.innerHTML = content;
        modal.className = 'modal favorites-modal';
        modal.style.display = 'flex';

        // Fecha ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Fecha ao clicar no X
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        document.body.appendChild(modal);
    }
}

// Inicializa o gerenciador de ícone de favoritos quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    new FavoritesHeaderIcon();
});
