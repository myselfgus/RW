# Container Images - Cloudflare Workers

## 🇧🇷 Português

### O que são Workers como "Containers"?

Cloudflare Workers não são containers Docker tradicionais, mas funcionam de maneira similar como unidades isoladas de execução. Aqui está o que você precisa saber:

### Arquitetura

```
┌─────────────────────────────────────────────┐
│         Cloudflare Global Network           │
│                 (~300 DCs)                   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Worker 1 │  │ Worker 2 │  │ Worker 3 │  │
│  │ (V8)     │  │ (V8)     │  │ (V8)     │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                                             │
│  Edge Location (exemplo: São Paulo)         │
└─────────────────────────────────────────────┘
```

### Características dos "Container Images" (Workers)

| Característica | Docker Container | Cloudflare Worker |
|---------------|------------------|-------------------|
| **Startup** | Segundos | < 5ms |
| **Isolamento** | Namespaces/cgroups | V8 Isolates |
| **Distribuição** | Manual | Automática (global) |
| **Escala** | Containers | Isolates ilimitados |
| **Tamanho** | MB/GB | KB (max 1MB código) |
| **Runtime** | Qualquer | JavaScript/WASM |

### Workers Disponíveis ("Images")

#### 1. `hello-world` - Base Image
- **Tamanho**: ~1KB
- **Uso**: Template básico para novos workers
- **Dependências**: Nenhuma
- **Endpoints**: `/`, `/json`

#### 2. `api-proxy` - Proxy Image
- **Tamanho**: ~2KB
- **Uso**: Proxy reverso com CORS
- **Dependências**: Nenhuma
- **Features**: CORS, Error handling, JSONPlaceholder proxy

#### 3. `claude-agent` - AI Agent Image
- **Tamanho**: ~95KB (com dependências)
- **Uso**: Integração com Claude AI
- **Dependências**: `@anthropic-ai/sdk`
- **Features**: Chat com IA, Health checks, Error handling
- **Secrets necessários**: `ANTHROPIC_API_KEY`

### "Baixando" Workers (Deploy Local)

Para "baixar" e executar workers localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/myselfgus/RW.git
cd RW

# 2. Execute o setup (instala todas as "images")
./scripts/setup-environment.sh

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 4. "Inicie o container" (worker local)
cd workers/hello-world
npm run dev
```

### Gerenciamento de "Images" (Workers)

#### Listar Workers Disponíveis
```bash
ls -la workers/
```

#### Verificar Status
```bash
wrangler deployments list
```

#### Pull (Baixar configuração do deployed worker)
```bash
wrangler deployments view <deployment-id>
```

#### Push (Deploy)
```bash
cd workers/worker-name
npm run deploy
```

### Variáveis de Ambiente e Secrets

#### Secrets (Dados Sensíveis)
```bash
# Adicionar secret
wrangler secret put ANTHROPIC_API_KEY

# Listar secrets
wrangler secret list

# Remover secret
wrangler secret delete ANTHROPIC_API_KEY
```

#### Variáveis (Dados Não-Sensíveis)
Configure no `wrangler.toml`:
```toml
[vars]
ENVIRONMENT = "production"
API_VERSION = "v1"
```

### Registry de Workers

Este repositório funciona como um "registry" de workers:

```
RW (Registry)
├── workers/
│   ├── hello-world/     → Image: hello-world:latest
│   ├── api-proxy/       → Image: api-proxy:latest
│   └── claude-agent/    → Image: claude-agent:latest
└── shared/              → Shared libraries
```

### Networking e Comunicação

#### Entre Workers
```javascript
// Worker A chamando Worker B
const response = await fetch('https://worker-b.example.workers.dev/api');
```

#### Service Bindings (Workers se comunicando diretamente)
```toml
# wrangler.toml
[[services]]
binding = "WORKER_B"
service = "worker-b"
environment = "production"
```

```javascript
// No código
const response = await env.WORKER_B.fetch(request);
```

### Volumes (Durable Objects & KV)

#### KV Storage (Key-Value)
```toml
# wrangler.toml
[[kv_namespaces]]
binding = "MY_KV"
id = "your-namespace-id"
```

```javascript
// Uso
await env.MY_KV.put("key", "value");
const value = await env.MY_KV.get("key");
```

#### Durable Objects (Stateful)
```toml
# wrangler.toml
[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"
script_name = "my-worker"
```

### Logs e Monitoring

```bash
# Ver logs em tempo real (como docker logs -f)
wrangler tail

# Com filtros
wrangler tail --format pretty --status error
```

### Health Checks

Todos os workers devem implementar um endpoint `/health`:

```javascript
if (url.pathname === '/health') {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString()
  }));
}
```

### CI/CD - GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Workers
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## 🇬🇧 English

### What are Workers as "Containers"?

Cloudflare Workers are not traditional Docker containers, but they function similarly as isolated execution units. Here's what you need to know:

### Architecture

```
┌─────────────────────────────────────────────┐
│         Cloudflare Global Network           │
│                 (~300 DCs)                   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Worker 1 │  │ Worker 2 │  │ Worker 3 │  │
│  │ (V8)     │  │ (V8)     │  │ (V8)     │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│                                             │
│  Edge Location (example: São Paulo)         │
└─────────────────────────────────────────────┘
```

### "Container Images" (Workers) Characteristics

| Characteristic | Docker Container | Cloudflare Worker |
|---------------|------------------|-------------------|
| **Startup** | Seconds | < 5ms |
| **Isolation** | Namespaces/cgroups | V8 Isolates |
| **Distribution** | Manual | Automatic (global) |
| **Scale** | Containers | Unlimited isolates |
| **Size** | MB/GB | KB (max 1MB code) |
| **Runtime** | Any | JavaScript/WASM |

### Available Workers ("Images")

#### 1. `hello-world` - Base Image
- **Size**: ~1KB
- **Use**: Basic template for new workers
- **Dependencies**: None
- **Endpoints**: `/`, `/json`

#### 2. `api-proxy` - Proxy Image
- **Size**: ~2KB
- **Use**: Reverse proxy with CORS
- **Dependencies**: None
- **Features**: CORS, Error handling, JSONPlaceholder proxy

#### 3. `claude-agent` - AI Agent Image
- **Size**: ~95KB (with dependencies)
- **Use**: Claude AI integration
- **Dependencies**: `@anthropic-ai/sdk`
- **Features**: AI chat, Health checks, Error handling
- **Required secrets**: `ANTHROPIC_API_KEY`

### "Pulling" Workers (Local Deploy)

To "pull" and run workers locally:

```bash
# 1. Clone the repository
git clone https://github.com/myselfgus/RW.git
cd RW

# 2. Run setup (installs all "images")
./scripts/setup-environment.sh

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. "Start the container" (local worker)
cd workers/hello-world
npm run dev
```

### "Images" Management (Workers)

#### List Available Workers
```bash
ls -la workers/
```

#### Check Status
```bash
wrangler deployments list
```

#### Pull (Download deployed worker config)
```bash
wrangler deployments view <deployment-id>
```

#### Push (Deploy)
```bash
cd workers/worker-name
npm run deploy
```

### Environment Variables and Secrets

#### Secrets (Sensitive Data)
```bash
# Add secret
wrangler secret put ANTHROPIC_API_KEY

# List secrets
wrangler secret list

# Remove secret
wrangler secret delete ANTHROPIC_API_KEY
```

#### Variables (Non-Sensitive Data)
Configure in `wrangler.toml`:
```toml
[vars]
ENVIRONMENT = "production"
API_VERSION = "v1"
```

### Workers Registry

This repository functions as a workers "registry":

```
RW (Registry)
├── workers/
│   ├── hello-world/     → Image: hello-world:latest
│   ├── api-proxy/       → Image: api-proxy:latest
│   └── claude-agent/    → Image: claude-agent:latest
└── shared/              → Shared libraries
```

### Networking and Communication

#### Between Workers
```javascript
// Worker A calling Worker B
const response = await fetch('https://worker-b.example.workers.dev/api');
```

#### Service Bindings (Workers communicating directly)
```toml
# wrangler.toml
[[services]]
binding = "WORKER_B"
service = "worker-b"
environment = "production"
```

```javascript
// In code
const response = await env.WORKER_B.fetch(request);
```

### Volumes (Durable Objects & KV)

#### KV Storage (Key-Value)
```toml
# wrangler.toml
[[kv_namespaces]]
binding = "MY_KV"
id = "your-namespace-id"
```

```javascript
// Usage
await env.MY_KV.put("key", "value");
const value = await env.MY_KV.get("key");
```

#### Durable Objects (Stateful)
```toml
# wrangler.toml
[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"
script_name = "my-worker"
```

### Logs and Monitoring

```bash
# View real-time logs (like docker logs -f)
wrangler tail

# With filters
wrangler tail --format pretty --status error
```

### Health Checks

All workers should implement a `/health` endpoint:

```javascript
if (url.pathname === '/health') {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString()
  }));
}
```

### CI/CD - GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Workers
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```
