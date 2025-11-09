# Deployment Guide / Guia de Deploy

## 🇧🇷 Português

### Deploy via Cloudflare Pages

Quando você conectar este repositório ao Cloudflare Pages, use as seguintes configurações:

#### Configurações de Build

```
Build command: npm run deploy
Build output directory: (deixe vazio)
Root directory: (deixe vazio ou /)
```

#### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Cloudflare Pages:

1. `CLOUDFLARE_API_TOKEN` - Token de API do Cloudflare
2. `CLOUDFLARE_ACCOUNT_ID` - ID da sua conta Cloudflare
3. `ANTHROPIC_API_KEY` - Chave de API do Anthropic (para claude-agent)

#### Secrets do Worker

Após o primeiro deploy, você precisa configurar os secrets:

```bash
# Configurar secret para o worker principal
wrangler secret put ANTHROPIC_API_KEY --name rw-claude-agent

# Ou para workers individuais
cd workers/claude-agent
wrangler secret put ANTHROPIC_API_KEY
```

### Deploy Manual via CLI

#### Deploy do Worker Principal (claude-agent)

```bash
# Da raiz do projeto
npm run deploy
```

Este comando faz deploy do worker `claude-agent` como o worker principal do repositório.

#### Deploy de Workers Individuais

```bash
# Deploy do hello-world
npm run deploy:hello-world

# Deploy do api-proxy
npm run deploy:api-proxy

# Deploy do claude-agent
npm run deploy:claude-agent

# Ou navegue para o diretório do worker
cd workers/hello-world
npm run deploy
```

#### Deploy de Todos os Workers

```bash
# Usando o script de deploy
./scripts/deploy-all.sh
```

### Estrutura de Deploy

```
RW Repository
├── wrangler.toml          # Configuração principal (claude-agent)
└── workers/
    ├── hello-world/
    │   └── wrangler.toml  # Deploy independente
    ├── api-proxy/
    │   └── wrangler.toml  # Deploy independente
    └── claude-agent/
        └── wrangler.toml  # Deploy independente
```

### Workers Deployados

Após o deploy, seus workers estarão disponíveis em:

- **Worker Principal**: `https://rw-claude-agent.{seu-subdominio}.workers.dev`
- **Hello World**: `https://hello-world.{seu-subdominio}.workers.dev`
- **API Proxy**: `https://api-proxy.{seu-subdominio}.workers.dev`
- **Claude Agent**: `https://claude-agent.{seu-subdominio}.workers.dev`

### Verificar Deployments

```bash
# Ver todos os deployments
wrangler deployments list

# Ver deployment específico
wrangler deployments view <deployment-id>

# Ver logs em tempo real
wrangler tail
wrangler tail --name rw-claude-agent
```

### Ambientes (Staging/Production)

```bash
# Deploy para staging
wrangler deploy --env staging

# Deploy para production
wrangler deploy --env production

# Deploy de worker individual para staging
cd workers/claude-agent
npm run deploy -- --env staging
```

### Rollback de Deploy

```bash
# Listar deployments
wrangler deployments list

# Fazer rollback para deployment anterior
wrangler rollback <deployment-id>
```

### Configuração de Secrets via CI/CD

Se você estiver usando GitHub Actions ou outro CI/CD:

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

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Deploy to Cloudflare Workers
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: npm run deploy
```

### Troubleshooting

#### Erro: "Missing entry-point to Worker script"

**Problema**: O wrangler não encontrou o arquivo de configuração.

**Solução**:
- Certifique-se de estar no diretório correto
- Use `npm run deploy` da raiz do projeto
- Ou navegue para o diretório do worker: `cd workers/claude-agent && npm run deploy`

#### Erro: "Authentication error"

**Problema**: Não autenticado com Cloudflare.

**Solução**:
```bash
wrangler login
# ou configure o token manualmente
export CLOUDFLARE_API_TOKEN=your-token
export CLOUDFLARE_ACCOUNT_ID=your-account-id
```

#### Erro: "Secret not found: ANTHROPIC_API_KEY"

**Problema**: Secret não configurado no worker.

**Solução**:
```bash
wrangler secret put ANTHROPIC_API_KEY --name rw-claude-agent
# Digite sua chave quando solicitado
```

---

## 🇬🇧 English

### Deploy via Cloudflare Pages

When connecting this repository to Cloudflare Pages, use the following settings:

#### Build Settings

```
Build command: npm run deploy
Build output directory: (leave empty)
Root directory: (leave empty or /)
```

#### Environment Variables

Configure the following environment variables in the Cloudflare Pages dashboard:

1. `CLOUDFLARE_API_TOKEN` - Cloudflare API token
2. `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
3. `ANTHROPIC_API_KEY` - Anthropic API key (for claude-agent)

#### Worker Secrets

After the first deployment, you need to configure the secrets:

```bash
# Configure secret for the main worker
wrangler secret put ANTHROPIC_API_KEY --name rw-claude-agent

# Or for individual workers
cd workers/claude-agent
wrangler secret put ANTHROPIC_API_KEY
```

### Manual Deploy via CLI

#### Deploy Main Worker (claude-agent)

```bash
# From project root
npm run deploy
```

This command deploys the `claude-agent` worker as the main repository worker.

#### Deploy Individual Workers

```bash
# Deploy hello-world
npm run deploy:hello-world

# Deploy api-proxy
npm run deploy:api-proxy

# Deploy claude-agent
npm run deploy:claude-agent

# Or navigate to the worker directory
cd workers/hello-world
npm run deploy
```

#### Deploy All Workers

```bash
# Using the deployment script
./scripts/deploy-all.sh
```

### Deployment Structure

```
RW Repository
├── wrangler.toml          # Main configuration (claude-agent)
└── workers/
    ├── hello-world/
    │   └── wrangler.toml  # Independent deployment
    ├── api-proxy/
    │   └── wrangler.toml  # Independent deployment
    └── claude-agent/
        └── wrangler.toml  # Independent deployment
```

### Deployed Workers

After deployment, your workers will be available at:

- **Main Worker**: `https://rw-claude-agent.{your-subdomain}.workers.dev`
- **Hello World**: `https://hello-world.{your-subdomain}.workers.dev`
- **API Proxy**: `https://api-proxy.{your-subdomain}.workers.dev`
- **Claude Agent**: `https://claude-agent.{your-subdomain}.workers.dev`

### Check Deployments

```bash
# View all deployments
wrangler deployments list

# View specific deployment
wrangler deployments view <deployment-id>

# View real-time logs
wrangler tail
wrangler tail --name rw-claude-agent
```

### Environments (Staging/Production)

```bash
# Deploy to staging
wrangler deploy --env staging

# Deploy to production
wrangler deploy --env production

# Deploy individual worker to staging
cd workers/claude-agent
npm run deploy -- --env staging
```

### Deployment Rollback

```bash
# List deployments
wrangler deployments list

# Rollback to previous deployment
wrangler rollback <deployment-id>
```

### Secrets Configuration via CI/CD

If you're using GitHub Actions or another CI/CD:

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

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Deploy to Cloudflare Workers
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: npm run deploy
```

### Troubleshooting

#### Error: "Missing entry-point to Worker script"

**Problem**: Wrangler couldn't find the configuration file.

**Solution**:
- Make sure you're in the correct directory
- Use `npm run deploy` from the project root
- Or navigate to the worker directory: `cd workers/claude-agent && npm run deploy`

#### Error: "Authentication error"

**Problem**: Not authenticated with Cloudflare.

**Solution**:
```bash
wrangler login
# or configure the token manually
export CLOUDFLARE_API_TOKEN=your-token
export CLOUDFLARE_ACCOUNT_ID=your-account-id
```

#### Error: "Secret not found: ANTHROPIC_API_KEY"

**Problem**: Secret not configured in the worker.

**Solution**:
```bash
wrangler secret put ANTHROPIC_API_KEY --name rw-claude-agent
# Enter your key when prompted
```
