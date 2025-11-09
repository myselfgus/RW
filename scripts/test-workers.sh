#!/bin/bash

# Script para testar todos os workers localmente / Script to test all workers locally
set -e

echo "🧪 Testando workers localmente / Testing workers locally..."
echo ""

# Função para testar um worker
test_worker() {
    local worker_dir=$1
    local worker_name=$(basename "$worker_dir")
    local port=$2

    echo "🔍 Testando: $worker_name na porta $port / Testing: $worker_name on port $port"

    if [ ! -f "$worker_dir/package.json" ]; then
        echo "   ⚠️  package.json não encontrado / package.json not found"
        return
    fi

    # Verificar se há testes
    if grep -q "\"test\"" "$worker_dir/package.json"; then
        echo "   Executando testes... / Running tests..."
        if (cd "$worker_dir" && npm test); then
            echo "   ✅ Testes passaram / Tests passed"
        else
            echo "   ❌ Testes falharam / Tests failed"
        fi
    else
        echo "   ℹ️  Sem testes configurados / No tests configured"
    fi

    echo ""
}

# Testar cada worker
port=8787
for worker_dir in workers/*/; do
    test_worker "$worker_dir" $port
    ((port++))
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Testes concluídos! / Testing completed!"
echo ""
echo "💡 Para testar individualmente / To test individually:"
echo "   cd workers/<worker-name>"
echo "   npm run dev"
echo ""
echo "   O worker estará disponível em / The worker will be available at:"
echo "   http://localhost:8787"
