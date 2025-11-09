#!/bin/bash

# Script de configuração do ambiente / Environment setup script
# Este script ajuda a configurar o ambiente de desenvolvimento
# This script helps set up the development environment

set -e

echo "🚀 Configurando ambiente RW Cloudflare Workers..."
echo "🚀 Setting up RW Cloudflare Workers environment..."
echo ""

# Verificar Node.js
echo "Verificando Node.js... / Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 16+ / Node.js not found. Please install Node.js 16+"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Verificar npm
echo "Verificando npm... / Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado / npm not found"
    exit 1
fi
echo "✅ npm $(npm --version)"

# Instalar dependências raiz
echo ""
echo "📦 Instalando dependências do projeto... / Installing project dependencies..."
npm install

# Instalar dependências dos workers
echo ""
echo "📦 Instalando dependências dos workers... / Installing workers dependencies..."
for worker_dir in workers/*/; do
    if [ -f "$worker_dir/package.json" ]; then
        echo "  → Instalando dependências de $(basename $worker_dir)..."
        (cd "$worker_dir" && npm install)
    fi
done

# Verificar arquivo .env
echo ""
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado / .env file not found"
    echo "📝 Criando .env a partir de .env.example... / Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Por favor, edite com suas credenciais / .env file created. Please edit with your credentials"
    echo "   Edite o arquivo: .env / Edit the file: .env"
else
    echo "✅ Arquivo .env encontrado / .env file found"
fi

# Verificar wrangler
echo ""
echo "Verificando wrangler... / Checking wrangler..."
if ! command -v wrangler &> /dev/null; then
    echo "⚠️  wrangler não encontrado globalmente / wrangler not found globally"
    echo "   Você pode usar: npx wrangler / You can use: npx wrangler"
else
    echo "✅ wrangler $(wrangler --version)"
fi

echo ""
echo "✅ Configuração concluída! / Setup completed!"
echo ""
echo "📚 Próximos passos / Next steps:"
echo "   1. Edite o arquivo .env com suas credenciais / Edit .env file with your credentials"
echo "   2. Execute 'wrangler login' para autenticar / Run 'wrangler login' to authenticate"
echo "   3. Navegue para um worker e execute 'npm run dev' / Navigate to a worker and run 'npm run dev'"
echo ""
echo "📖 Documentação completa em / Full documentation at: docs/SETUP.md"
