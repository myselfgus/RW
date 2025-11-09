# Workers Documentation / Documentação dos Workers

## 🇧🇷 Português

### Workers Disponíveis

Este repositório contém os seguintes Cloudflare Workers:

#### 1. Hello World (`workers/hello-world`)

Worker básico de demonstração que responde com mensagens simples.

**Endpoints:**
- `GET /` - Retorna "Hello World"
- `GET /json` - Retorna resposta JSON com timestamp

**Uso:**
```bash
cd workers/hello-world
npm run dev
# Acesse: http://localhost:8787
```

#### 2. API Proxy (`workers/api-proxy`)

Worker que atua como proxy para APIs externas, incluindo CORS.

**Endpoints:**
- `GET /` - Documentação da API
- `GET /api/*` - Proxy para JSONPlaceholder API

**Uso:**
```bash
cd workers/api-proxy
npm run dev
# Acesse: http://localhost:8787/api/posts
```

#### 3. Claude Agent (`workers/claude-agent`)

Worker integrado com Anthropic Claude AI para processamento de linguagem natural.

**Endpoints:**
- `GET /` - Documentação da API
- `GET /health` - Health check
- `POST /chat` - Chat com Claude AI

**Configuração necessária:**
```bash
cd workers/claude-agent
wrangler secret put ANTHROPIC_API_KEY
# Cole sua chave de API do Anthropic
```

**Uso:**
```bash
npm run dev

# Testar:
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá, Claude!"}'
```

### Container Images (Workers)

Na Cloudflare, os Workers funcionam como "containers" leves que executam em edge locations globalmente. Cada worker é:

1. **Isolado**: Executa em um ambiente V8 isolate
2. **Rápido**: Inicia em menos de 5ms
3. **Global**: Distribuído automaticamente para ~300 data centers
4. **Serverless**: Sem servidores para gerenciar

### Estrutura de um Worker

```
worker-name/
├── src/
│   └── index.js          # Código principal do worker
├── package.json          # Dependências e scripts
├── wrangler.toml         # Configuração do Cloudflare
└── README.md            # Documentação específica
```

### Como Criar um Novo Worker

```bash
# Usando o script de criação
npm run create-worker meu-worker

# Ou manualmente:
mkdir -p workers/meu-worker/src
cd workers/meu-worker
npm init -y
npm install wrangler --save-dev
```

### Comandos Comuns

```bash
# Desenvolvimento local
npm run dev              # Inicia servidor local
npm run dev -- --port 8788  # Porta customizada

# Deploy
npm run deploy          # Deploy para produção
npm run deploy -- --env staging  # Deploy para staging

# Logs
npm run tail            # Visualizar logs em tempo real

# Secrets
wrangler secret put SECRET_NAME    # Adicionar secret
wrangler secret list               # Listar secrets
wrangler secret delete SECRET_NAME # Remover secret
```

### Scripts Úteis

```bash
# Setup inicial do ambiente
./scripts/setup-environment.sh

# Deploy de todos os workers
./scripts/deploy-all.sh

# Testar todos os workers
./scripts/test-workers.sh
```

### Melhores Práticas

1. **Secrets**: Use `wrangler secret` para dados sensíveis
2. **Variáveis**: Configure em `wrangler.toml` para não-sensíveis
3. **CORS**: Sempre configure CORS headers para APIs
4. **Error Handling**: Implemente tratamento de erros robusto
5. **Logging**: Use `console.log` para debugging (visível com `wrangler tail`)

---

## 🇬🇧 English

### Available Workers

This repository contains the following Cloudflare Workers:

#### 1. Hello World (`workers/hello-world`)

Basic demonstration worker that responds with simple messages.

**Endpoints:**
- `GET /` - Returns "Hello World"
- `GET /json` - Returns JSON response with timestamp

**Usage:**
```bash
cd workers/hello-world
npm run dev
# Access: http://localhost:8787
```

#### 2. API Proxy (`workers/api-proxy`)

Worker that acts as a proxy for external APIs, including CORS support.

**Endpoints:**
- `GET /` - API documentation
- `GET /api/*` - Proxy to JSONPlaceholder API

**Usage:**
```bash
cd workers/api-proxy
npm run dev
# Access: http://localhost:8787/api/posts
```

#### 3. Claude Agent (`workers/claude-agent`)

Worker integrated with Anthropic Claude AI for natural language processing.

**Endpoints:**
- `GET /` - API documentation
- `GET /health` - Health check
- `POST /chat` - Chat with Claude AI

**Required configuration:**
```bash
cd workers/claude-agent
wrangler secret put ANTHROPIC_API_KEY
# Paste your Anthropic API key
```

**Usage:**
```bash
npm run dev

# Test:
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, Claude!"}'
```

### Container Images (Workers)

In Cloudflare, Workers function as lightweight "containers" that run on edge locations globally. Each worker is:

1. **Isolated**: Runs in a V8 isolate environment
2. **Fast**: Starts in less than 5ms
3. **Global**: Automatically distributed to ~300 data centers
4. **Serverless**: No servers to manage

### Worker Structure

```
worker-name/
├── src/
│   └── index.js          # Main worker code
├── package.json          # Dependencies and scripts
├── wrangler.toml         # Cloudflare configuration
└── README.md            # Specific documentation
```

### How to Create a New Worker

```bash
# Using the creation script
npm run create-worker my-worker

# Or manually:
mkdir -p workers/my-worker/src
cd workers/my-worker
npm init -y
npm install wrangler --save-dev
```

### Common Commands

```bash
# Local development
npm run dev              # Start local server
npm run dev -- --port 8788  # Custom port

# Deploy
npm run deploy          # Deploy to production
npm run deploy -- --env staging  # Deploy to staging

# Logs
npm run tail            # View real-time logs

# Secrets
wrangler secret put SECRET_NAME    # Add secret
wrangler secret list               # List secrets
wrangler secret delete SECRET_NAME # Remove secret
```

### Useful Scripts

```bash
# Initial environment setup
./scripts/setup-environment.sh

# Deploy all workers
./scripts/deploy-all.sh

# Test all workers
./scripts/test-workers.sh
```

### Best Practices

1. **Secrets**: Use `wrangler secret` for sensitive data
2. **Variables**: Configure in `wrangler.toml` for non-sensitive data
3. **CORS**: Always configure CORS headers for APIs
4. **Error Handling**: Implement robust error handling
5. **Logging**: Use `console.log` for debugging (visible with `wrangler tail`)
