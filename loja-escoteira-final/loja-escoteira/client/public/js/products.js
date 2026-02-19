/**
 * PRODUTOS
 * Gerenciamento de dados de produtos e funcionalidades relacionadas
 */

// Dados de Produtos
const products = [
    {
        id: 1,
        name: 'Camiseta Scout Premium',
        category: 'vestuario',
        price: 89.90,
        description: 'Camiseta de algodão 100% com estampa exclusiva do movimento escoteiro. Confortável e durável para atividades ao ar livre.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-2_1770395263000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hcHBhcmVs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTJfMTc3MDM5NTI2MzAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhjSEJoY21Wcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cYBUVvnzbDOUv6tCoEStXMvit72VpS47~-pY8Ldesaj2jOwFhUIIdXtP6UsoCag5Yndiu9wszhSENH4ZDaqDsR1TYI287vJy3g8OKq9gBQu1AuVXmA~7KZLdLoLfcA45OhZ5Wk0VBwnuQj74Qh7fK4fpWUUspxseqg9KnWTS41qI1nNPUXRn5ElSS35m48ZUeHdsUjKLB0fkXoXmO~4xQgxeOFtuRJKkVxY3RL4rhBEGyyt~NaiheU7VUu-fCA3Y5qkOr7lPGDyiXc5deg7s9cf8hFXx~HrASi1ioLhbT8wt2QRZxgse1xDc8-D136AaG4sAhPniUSVdPO6Jy0VSxQ__'
    },
    {
        id: 2,
        name: 'Lenço Escoteiro Personalizado',
        category: 'vestuario',
        price: 45.90,
        description: 'Lenço de algodão puro com cores vibrantes. Pode ser personalizado com emblemas e insígnias.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-2_1770395263000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hcHBhcmVs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTJfMTc3MDM5NTI2MzAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhjSEJoY21Wcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cYBUVvnzbDOUv6tCoEStXMvit72VpS47~-pY8Ldesaj2jOwFhUIIdXtP6UsoCag5Yndiu9wszhSENH4ZDaqDsR1TYI287vJy3g8OKq9gBQu1AuVXmA~7KZLdLoLfcA45OhZ5Wk0VBwnuQj74Qh7fK4fpWUUspxseqg9KnWTS41qI1nNPUXRn5ElSS35m48ZUeHdsUjKLB0fkXoXmO~4xQgxeOFtuRJKkVxY3RL4rhBEGyyt~NaiheU7VUu-fCA3Y5qkOr7lPGDyiXc5deg7s9cf8hFXx~HrASi1ioLhbT8wt2QRZxgse1xDc8-D136AaG4sAhPniUSVdPO6Jy0VSxQ__'
    },
    {
        id: 3,
        name: 'Garrafa Scout Inox',
        category: 'hidratacao',
        price: 129.90,
        description: 'Garrafa térmica de aço inoxidável com capacidade de 1L. Mantém bebidas quentes ou frias por horas.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-3_1770395265000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hY2Nlc3Nvcmllcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTNfMTc3MDM5NTI2NTAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhZMk5sYzNOdmNtbGxjdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=P~txMXS0mRkavpnmFS4IpB5eQM239-5yHoG4nz~RXcyPLAr~eA0oKQLyBzpjaE~GR47-PSEUZnZsqVr8V-7LuxGMo4sHewGq6muqEKSSzPKMbEvKBPkqDbXOrsFs8d5qeCI6~m02Uw5A90ClkoCssekH~HIesoKR~33bGNBI6D09XNojpVOF1Xz49Ol7-J1Pug94HUNkXhKu7Ca1jW6-iqjNPeJVaHVXyYs6IWWQf6LlKfdtVfFh~cH0pFEe6UUdIpLaym6wxJwAWulMWl8XPCzMPHSv2KJQvzssZRRl5nueHBg4SfQ-Al9IY4KSgVhRx1WsbBs0V7e-FPbqpzCl3A__'
    },
    {
        id: 4,
        name: 'Bússola Vintage Scout',
        category: 'acessorios',
        price: 79.90,
        description: 'Bússola de latão com design vintage. Perfeita para orientação em trilhas e acampamentos.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-3_1770395265000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hY2Nlc3Nvcmllcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTNfMTc3MDM5NTI2NTAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhZMk5sYzNOdmNtbGxjdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=P~txMXS0mRkavpnmFS4IpB5eQM239-5yHoG4nz~RXcyPLAr~eA0oKQLyBzpjaE~GR47-PSEUZnZsqVr8V-7LuxGMo4sHewGq6muqEKSSzPKMbEvKBPkqDbXOrsFs8d5qeCI6~m02Uw5A90ClkoCssekH~HIesoKR~33bGNBI6D09XNojpVOF1Xz49Ol7-J1Pug94HUNkXhKu7Ca1jW6-iqjNPeJVaHVXyYs6IWWQf6LlKfdtVfFh~cH0pFEe6UUdIpLaym6wxJwAWulMWl8XPCzMPHSv2KJQvzssZRRl5nueHBg4SfQ-Al9IY4KSgVhRx1WsbBs0V7e-FPbqpzCl3A__'
    },
    {
        id: 5,
        name: 'Mochila Scout 40L',
        category: 'acessorios',
        price: 299.90,
        description: 'Mochila de trekking com capacidade de 40L. Feita com material resistente e à prova d\'água.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-3_1770395265000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hY2Nlc3Nvcmllcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTNfMTc3MDM5NTI2NTAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhZMk5sYzNOdmNtbGxjdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=P~txMXS0mRkavpnmFS4IpB5eQM239-5yHoG4nz~RXcyPLAr~eA0oKQLyBzpjaE~GR47-PSEUZnZsqVr8V-7LuxGMo4sHewGq6muqEKSSzPKMbEvKBPkqDbXOrsFs8d5qeCI6~m02Uw5A90ClkoCssekH~HIesoKR~33bGNBI6D09XNojpVOF1Xz49Ol7-J1Pug94HUNkXhKu7Ca1jW6-iqjNPeJVaHVXyYs6IWWQf6LlKfdtVfFh~cH0pFEe6UUdIpLaym6wxJwAWulMWl8XPCzMPHSv2KJQvzssZRRl5nueHBg4SfQ-Al9IY4KSgVhRx1WsbBs0V7e-FPbqpzCl3A__'
    },
    {
        id: 6,
        name: 'Caneca Scout Térmica',
        category: 'hidratacao',
        price: 59.90,
        description: 'Caneca térmica de 500ml com isolamento duplo. Ideal para manter bebidas na temperatura desejada.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-3_1770395265000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hY2Nlc3Nvcmllcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTNfMTc3MDM5NTI2NTAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhZMk5sYzNOdmNtbGxjdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=P~txMXS0mRkavpnmFS4IpB5eQM239-5yHoG4nz~RXcyPLAr~eA0oKQLyBzpjaE~GR47-PSEUZnZsqVr8V-7LuxGMo4sHewGq6muqEKSSzPKMbEvKBPkqDbXOrsFs8d5qeCI6~m02Uw5A90ClkoCssekH~HIesoKR~33bGNBI6D09XNojpVOF1Xz49Ol7-J1Pug94HUNkXhKu7Ca1jW6-iqjNPeJVaHVXyYs6IWWQf6LlKfdtVfFh~cH0pFEe6UUdIpLaym6wxJwAWulMWl8XPCzMPHSv2KJQvzssZRRl5nueHBg4SfQ-Al9IY4KSgVhRx1WsbBs0V7e-FPbqpzCl3A__'
    },
    {
        id: 7,
        name: 'Cinto Scout Resistente',
        category: 'vestuario',
        price: 34.90,
        description: 'Cinto de lona resistente com fivela de metal. Perfeito para uso diário e em atividades outdoor.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-2_1770395263000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hcHBhcmVs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTJfMTc3MDM5NTI2MzAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhjSEJoY21Wcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cYBUVvnzbDOUv6tCoEStXMvit72VpS47~-pY8Ldesaj2jOwFhUIIdXtP6UsoCag5Yndiu9wszhSENH4ZDaqDsR1TYI287vJy3g8OKq9gBQu1AuVXmA~7KZLdLoLfcA45OhZ5Wk0VBwnuQj74Qh7fK4fpWUUspxseqg9KnWTS41qI1nNPUXRn5ElSS35m48ZUeHdsUjKLB0fkXoXmO~4xQgxeOFtuRJKkVxY3RL4rhBEGyyt~NaiheU7VUu-fCA3Y5qkOr7lPGDyiXc5deg7s9cf8hFXx~HrASi1ioLhbT8wt2QRZxgse1xDc8-D136AaG4sAhPniUSVdPO6Jy0VSxQ__'
    },
    {
        id: 8,
        name: 'Mapa e Bússola Kit',
        category: 'acessorios',
        price: 149.90,
        description: 'Kit completo com mapa topográfico e bússola profissional. Essencial para orientação em trilhas.',
        image: 'https://private-us-east-1.manuscdn.com/sessionFile/dcndoke2KcrgXhJcfkLXhQ/sandbox/qTanpGAbW3HM60KwHWZgZj-img-3_1770395265000_na1fn_cHJvZHVjdC1jYXRlZ29yeS1hY2Nlc3Nvcmllcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZGNuZG9rZTJLY3JnWGhKY2ZrTFhoUS9zYW5kYm94L3FUYW5wR0FiVzNITTYwS3dIV1pnWmotaW1nLTNfMTc3MDM5NTI2NTAwMF9uYTFmbl9jSEp2WkhWamRDMWpZWFJsWjI5eWVTMWhZMk5sYzNOdmNtbGxjdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=P~txMXS0mRkavpnmFS4IpB5eQM239-5yHoG4nz~RXcyPLAr~eA0oKQLyBzpjaE~GR47-PSEUZnZsqVr8V-7LuxGMo4sHewGq6muqEKSSzPKMbEvKBPkqDbXOrsFs8d5qeCI6~m02Uw5A90ClkoCssekH~HIesoKR~33bGNBI6D09XNojpVOF1Xz49Ol7-J1Pug94HUNkXhKu7Ca1jW6-iqjNPeJVaHVXyYs6IWWQf6LlKfdtVfFh~cH0pFEe6UUdIpLaym6wxJwAWulMWl8XPCzMPHSv2KJQvzssZRRl5nueHBg4SfQ-Al9IY4KSgVhRx1WsbBs0V7e-FPbqpzCl3A__'
    }
];

/**
 * Renderiza a grade de produtos
 * @param {Array} productsToRender - Array de produtos a renderizar
 */
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Limpa a grade
    productsGrid.innerHTML = '';
    
    // Se não há produtos, mostra mensagem
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }
    
    // Renderiza cada produto
    productsToRender.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        
        // Animação de entrada escalonada
        setTimeout(() => {
            productCard.classList.add('slide-in-up');
        }, index * 50);
    });
}

/**
 * Cria um card de produto
 * @param {Object} product - Objeto do produto
 * @returns {HTMLElement} Card do produto
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="favorite-btn" data-product-id="${product.id}" aria-label="Adicionar aos favoritos">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="product-info">
            <span class="product-category">${getCategoryLabel(product.category)}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">R$ ${formatPrice(product.price)}</span>
                <button class="btn btn-primary product-btn" data-product-id="${product.id}">Ver</button>
            </div>
        </div>
    `;
    
    // Event listener para abrir modal
    card.querySelector('.product-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openProductModal(product);
    });
    
    // Event listener para favorito
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (favoritesManager) {
                favoritesManager.toggleFavorite(product.id);
            }
        });
    }
    
    return card;
}

/**
 * Filtra produtos por categoria
 * @param {string} category - Categoria a filtrar
 */
function filterProductsByCategory(category) {
    if (category === 'all' || category === 'todos') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

/**
 * Obtém o label da categoria
 * @param {string} category - Chave da categoria
 * @returns {string} Label da categoria
 */
function getCategoryLabel(category) {
    const labels = {
        'vestuario': 'Vestuário',
        'acessorios': 'Acessórios',
        'hidratacao': 'Hidratação'
    };
    return labels[category] || category;
}

/**
 * Formata o preço para o padrão brasileiro
 * @param {number} price - Preço a formatar
 * @returns {string} Preço formatado
 */
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

/**
 * Abre o modal de detalhes do produto
 * @param {Object} product - Objeto do produto
 */
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    // Monta o conteúdo do modal dinamicamente (compatível com public/index.html)
    modalBody.innerHTML = `
        <div class="product-detail">
            <div>
                <img id="modalProductImage" src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <h2 id="modalProductName">${product.name}</h2>
                <p id="modalProductDescription">${product.description}</p>
                <div id="modalProductPrice" class="product-detail-price">R$ ${formatPrice(product.price)}</div>
                <div class="product-detail-actions">
                    <label for="quantity">Quantidade:</label>
                    <input type="number" id="quantity" min="1" value="1">
                    <button type="button" class="btn btn-primary" id="addToCartBtn" data-product-id="${product.id}">Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    `;

    const addBtn = document.getElementById('addToCartBtn');
    const quantityInput = document.getElementById('quantity');
    if (addBtn && typeof cart !== 'undefined' && cart) {
        addBtn.addEventListener('click', () => {
            const qty = quantityInput ? Math.max(1, parseInt(quantityInput.value, 10) || 1) : 1;
            cart.addItem(product.id, qty);
            closeProductModal();
        });
    } else if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = quantityInput ? Math.max(1, parseInt(quantityInput.value, 10) || 1) : 1;
            if (typeof getProductById === 'function') {
                const p = getProductById(product.id);
                if (p && typeof window.addToCart === 'function') window.addToCart(p.id, qty);
            }
            closeProductModal();
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha o modal de detalhes do produto
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Obtém um produto pelo ID
 * @param {number} productId - ID do produto
 * @returns {Object|null} Objeto do produto ou null
 */
function getProductById(productId) {
    return products.find(p => p.id === productId) || null;
}

// Inicializa a renderização de produtos quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
