# 🔧 Script para Reorganizar Arquivos da Loja Escoteira
# Execução: ./reorganizar-arquivos.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Reorganizando Estrutura do Projeto   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Definir diretório raiz
$projectRoot = "loja-escoteira-final\loja-escoteira"
$rootPath = (Get-Location).Path

# Verificar se está no diretório correto
if (!(Test-Path "$projectRoot")) {
    Write-Host "❌ Erro: Não encontrado '$projectRoot'" -ForegroundColor Red
    Write-Host "Execute este script do diretório raiz do projeto" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Diretório do projeto encontrado: $projectRoot" -ForegroundColor Green
Write-Host ""

# ═══════════════════════════════════════════════════════════
# 1. CRIAR ESTRUTURA DE PASTAS
# ═══════════════════════════════════════════════════════════

Write-Host "📁 Criando estrutura de pastas..." -ForegroundColor Yellow

@(
    "$projectRoot/client/public/css",
    "$projectRoot/client/public/js",
    "$projectRoot/client/src/types",
    "$projectRoot/server/routers"
) | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
        Write-Host "  ✓ Criados: $_" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Já existe: $_" -ForegroundColor Gray
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 2. MOVER ARQUIVOS CSS
# ═══════════════════════════════════════════════════════════

Write-Host "📄 Movendo arquivos CSS..." -ForegroundColor Yellow

$cssFiles = @("styles.css", "responsive.css")
$cssFiles | ForEach-Object {
    $source = "$rootPath/$_"
    $dest = "$rootPath/$projectRoot/client/public/css/$_"
    
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  ✓ Movido: $_ → client/public/css/" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Não encontrado: $_" -ForegroundColor Yellow
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 3. MOVER ARQUIVOS JAVASCRIPT (CLIENT)
# ═══════════════════════════════════════════════════════════

Write-Host "🔨 Movendo arquivos JavaScript (Frontend)..." -ForegroundColor Yellow

$jsFiles = @("main.js", "products.js", "cart.js", "favorites.js", "ui.js")
$jsFiles | ForEach-Object {
    $source = "$rootPath/$_"
    $dest = "$rootPath/$projectRoot/client/public/js/$_"
    
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  ✓ Movido: $_ → client/public/js/" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Não encontrado: $_" -ForegroundColor Yellow
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 4. MOVER HTML
# ═══════════════════════════════════════════════════════════

Write-Host "🌐 Movendo arquivo HTML..." -ForegroundColor Yellow

$source = "$rootPath/index.html"
$dest = "$rootPath/$projectRoot/client/public/index.html"

if (Test-Path $source) {
    Move-Item -Path $source -Destination $dest -Force
    Write-Host "  ✓ Movido: index.html → client/public/" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Não encontrado: index.html" -ForegroundColor Yellow
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 5. MOVER ARQUIVOS DO SERVIDOR
# ═══════════════════════════════════════════════════════════

Write-Host "🖥️  Movendo arquivos do servidor..." -ForegroundColor Yellow

$serverFiles = @("db.ts", "storage.ts", "seed-products.mjs")
$serverFiles | ForEach-Object {
    $source = "$rootPath/$_"
    $dest = "$rootPath/$projectRoot/server/$_"
    
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  ✓ Movido: $_ → server/" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Não encontrado: $_" -ForegroundColor Yellow
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 6. MOVER ROUTERS
# ═══════════════════════════════════════════════════════════

Write-Host "🛣️  Movendo arquivos de rotas..." -ForegroundColor Yellow

# Renomear routers.ts → routers/index.ts
$source = "$rootPath/routers.ts"
$dest = "$rootPath/$projectRoot/server/routers/index.ts"

if (Test-Path $source) {
    Move-Item -Path $source -Destination $dest -Force
    Write-Host "  ✓ Movido: routers.ts → server/routers/index.ts" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Não encontrado: routers.ts" -ForegroundColor Yellow
}

# Mover roures específicas
$routerFiles = @("cart.ts", "orders.ts", "products.ts", "upload.ts")
$routerFiles | ForEach-Object {
    $source = "$rootPath/$_"
    $dest = "$rootPath/$projectRoot/server/routers/$_"
    
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "  ✓ Movido: $_ → server/routers/" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Não encontrado: $_" -ForegroundColor Yellow
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 7. MOVER SCHEMA DO BANCO
# ═══════════════════════════════════════════════════════════

Write-Host "🗄️  Movendo arquivo de schema..." -ForegroundColor Yellow

$source = "$rootPath/schema.ts"
$dest = "$rootPath/$projectRoot/drizzle/schema.ts"

if (Test-Path $source) {
    Move-Item -Path $source -Destination $dest -Force
    Write-Host "  ✓ Movido: schema.ts → drizzle/" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Não encontrado: schema.ts" -ForegroundColor Yellow
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 8. MOVER MAIN.TSX
# ═══════════════════════════════════════════════════════════

Write-Host "⚛️  Movendo arquivo React..." -ForegroundColor Yellow

$source = "$rootPath/main.tsx"
$dest = "$rootPath/$projectRoot/client/src/main.tsx"

if (Test-Path $source) {
    Move-Item -Path $source -Destination $dest -Force
    Write-Host "  ✓ Movido: main.tsx → client/src/" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Não encontrado: main.tsx" -ForegroundColor Yellow
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 9. DELETAR PASTA ANTIGA (OPCIONAL)
# ═══════════════════════════════════════════════════════════

Write-Host "🗑️  Limpando pastas antigas..." -ForegroundColor Yellow

$oldFolder = "$rootPath/loja-escoteira-final"
if (Test-Path $oldFolder) {
    $response = Read-Host "Deseja deletar a pasta 'loja-escoteira-final'? (s/n)"
    if ($response -eq "s") {
        Remove-Item -Path $oldFolder -Recurse -Force
        Write-Host "  ✓ Deletado: loja-escoteira-final/" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Pasta mantida" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✓ Pasta 'loja-escoteira-final' não encontrada" -ForegroundColor Gray
}

Write-Host ""

# ═══════════════════════════════════════════════════════════
# 10. RESUMO
# ═══════════════════════════════════════════════════════════

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✓ Reorganização Concluída!          " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Revisar importações nos arquivos de código" -ForegroundColor Gray
Write-Host "  2. Executar: cd $projectRoot" -ForegroundColor Gray
Write-Host "  3. Executar: pnpm install" -ForegroundColor Gray
Write-Host "  4. Executar: pnpm dev" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Documentação: Veja REORGANIZACAO-ARQUIVOS.md" -ForegroundColor Cyan
Write-Host ""
