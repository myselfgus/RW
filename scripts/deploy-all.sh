#!/bin/bash

# Script para deploy de todos os workers / Script to deploy all workers
set -e

echo "🚀 Fazendo deploy de todos os workers / Deploying all workers..."
echo ""

# Verificar se está autenticado
if ! wrangler whoami &> /dev/null; then
    echo "❌ Não autenticado com Cloudflare / Not authenticated with Cloudflare"
    echo "   Execute: wrangler login"
    exit 1
fi

# Array para armazenar resultados
declare -a results

# Iterar sobre todos os workers
for worker_dir in workers/*/; do
    worker_name=$(basename "$worker_dir")

    echo "📦 Fazendo deploy de: $worker_name / Deploying: $worker_name"

    if [ -f "$worker_dir/package.json" ] && [ -f "$worker_dir/wrangler.toml" ]; then
        if (cd "$worker_dir" && npm run deploy); then
            echo "   ✅ Deploy de $worker_name concluído / $worker_name deployed successfully"
            results+=("✅ $worker_name")
        else
            echo "   ❌ Falha no deploy de $worker_name / Failed to deploy $worker_name"
            results+=("❌ $worker_name")
        fi
    else
        echo "   ⚠️  Configuração incompleta / Incomplete configuration"
        results+=("⚠️ $worker_name (skipped)")
    fi

    echo ""
done

# Mostrar resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Resumo do Deploy / Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for result in "${results[@]}"; do
    echo "$result"
done
echo ""

echo "🎉 Processo de deploy concluído! / Deployment process completed!"
