/**
 * ARQUIVO PRINCIPAL
 * Inicialização geral e configurações globais
 */

/**
 * Configuração global da aplicação
 */
const AppConfig = {
    name: 'L4CKOS',
    version: '1.0.0',
    currency: 'BRL',
    currencySymbol: 'R$',
    language: 'pt-BR'
};

/**
 * Inicializa a aplicação
 */
function initializeApp() {
    console.log(`${AppConfig.name} v${AppConfig.version} iniciado`);

    // Verifica suporte a localStorage
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage não disponível. Alguns recursos podem não funcionar.');
    }

    // Inicializa o header sticky
    initializeStickyHeader();

    // Adiciona estilos dinâmicos para animações
    addAnimationStyles();

    // Verifica se é primeira visita
    checkFirstVisit();
}

/**
 * Verifica se localStorage está disponível
 * @returns {boolean} Se localStorage está disponível
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Inicializa o header sticky com sombra ao scroll basicamente 
 */
function initializeStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            header.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

/**
 * Adiciona estilos de animação dinâmicos
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        @keyframes slideInUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .fade-in {
            animation: slideInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Verifica se é primeira visita
 */
function checkFirstVisit() {
    const firstVisit = localStorage.getItem('first_visit');
    if (!firstVisit) {
        localStorage.setItem('first_visit', new Date().toISOString());
        console.log('Primeira visita detectada');
    }
}

/**
 * Função utilitária para formatar preço
 * @param {number} price - Preço a formatar
 * @returns {string} Preço formatado
 */
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

/**
 * Função utilitária para log com timestamp
 * @param {string} message - Mensagem a logar
 * @param {string} level - Nível de log (log, warn, error)
 */
function logWithTimestamp(message, level = 'log') {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console[level](`[${timestamp}] ${message}`);
}

/**
 * Detecta se o dispositivo é mobile
 * @returns {boolean} Se é mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta se é tablet
 * @returns {boolean} Se é tablet
 */
function isTabletDevice() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
}

/**
 * Obtém informações do dispositivo
 * @returns {Object} Informações do dispositivo
 */
function getDeviceInfo() {
    return {
        isMobile: isMobileDevice(),
        isTablet: isTabletDevice(),
        userAgent: navigator.userAgent,
        language: navigator.language
    };
}

/**
 * Gerencia o tema (preparado para dark mode no futuro)
 */
class ThemeManager {
    constructor() {
        this.theme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupThemeToggle();
    }

    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        // Detecta preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    setupThemeToggle() {
        // Aqui você pode adicionar um botão de toggle de tema se necessário
    }
}

/**
 * Gerencia analytics básico (sem dependências externas)
 */
class SimpleAnalytics {
    constructor() {
        this.init();
    }

    init() {
        // Rastreia visualizações de página
        this.trackPageView();

        // Rastreia cliques em botões
        this.trackButtonClicks();

        // Rastreia adições ao carrinho
        this.trackCartAdditions();
    }

    trackPageView() {
        const pageInfo = {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString()
        };
        logWithTimestamp(`Página visualizada: ${pageInfo.title}`);
    }

    trackButtonClicks() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                logWithTimestamp(`Botão clicado: ${e.target.textContent.trim()}`);
            }
        });
    }

    trackCartAdditions() {
        // Rastreado no arquivo cart.js
    }
}

/**
 * Verifica compatibilidade do navegador
 */
function checkBrowserCompatibility() {
    const requiredFeatures = {
        'localStorage': typeof Storage !== 'undefined',
        'fetch': typeof fetch !== 'undefined',
        'Promise': typeof Promise !== 'undefined',
        'Array.find': Array.prototype.find !== undefined
    };

    const unsupported = Object.entries(requiredFeatures)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

    if (unsupported.length > 0) {
        console.warn('Recursos não suportados:', unsupported);
    }

    return unsupported.length === 0;
}

/**
 * Inicializa a aplicação quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    // Verifica compatibilidade
    if (!checkBrowserCompatibility()) {
        console.error('Seu navegador não suporta todos os recursos necessários');
    }

    // Inicializa a aplicação
    initializeApp();

    // Inicializa o gerenciador de tema
    new ThemeManager();

    // Inicializa analytics básico
    new SimpleAnalytics();

    // Log de sucesso
    logWithTimestamp('Aplicação inicializada com sucesso', 'log');
});

/**
 * Trata erros não capturados
 */
window.addEventListener('error', (event) => {
    console.error('Erro não capturado:', event.error);
});

/**
 * Trata rejeições de Promise não capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejeitada não capturada:', event.reason);
});

/**
 * Limpa recursos ao sair da página
 */
window.addEventListener('beforeunload', () => {
    logWithTimestamp('Página sendo descarregada');
});
