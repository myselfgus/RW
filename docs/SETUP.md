# Guia de Configuração / Setup Guide

## 🇧🇷 Português

### Configuração de Variáveis de Ambiente

Este repositório requer algumas variáveis de ambiente para funcionar corretamente:

#### 1. Variáveis Locais (.env)

Copie o arquivo `.env.example` para `.env` e preencha com seus valores:

```bash
cp .env.example .env
```

Variáveis necessárias:
- `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare
- `CLOUDFLARE_API_TOKEN`: Token de API do Cloudflare com permissões para Workers
- `ANTHROPIC_API_KEY`: Chave de API do Anthropic Claude (se usar integração com Claude)

#### 2. Secrets do Cloudflare Workers

Para configurar secrets nos seus workers:

```bash
# Para cada worker, navegue até o diretório e configure:
cd workers/hello-world

# Configure secrets usando wrangler
wrangler secret put ANTHROPIC_API_KEY
# Digite o valor quando solicitado

# Liste os secrets configurados
wrangler secret list
```

#### 3. Secrets do GitHub (para CI/CD)

Configure os seguintes secrets no seu repositório GitHub:
- `CLOUDFLARE_API_TOKEN`: Token de API do Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare
- `ANTHROPIC_API_KEY`: Chave de API do Anthropic

Para configurar:
1. Vá para Settings → Secrets and variables → Actions
2. Clique em "New repository secret"
3. Adicione cada secret com seu valor

### Como Obter as Credenciais

#### Cloudflare Account ID
1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Clique em "Workers & Pages"
3. O Account ID está visível no canto direito

#### Cloudflare API Token
1. Vá para [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Clique em "Create Token"
3. Use o template "Edit Cloudflare Workers"
4. Configure as permissões e crie o token

#### Anthropic API Key
1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Vá para "API Keys"
3. Crie uma nova chave de API

### Autenticação com Wrangler

```bash
# Método 1: Login interativo (recomendado para desenvolvimento local)
wrangler login

# Método 2: Usando variáveis de ambiente (CI/CD)
export CLOUDFLARE_API_TOKEN=your-token
export CLOUDFLARE_ACCOUNT_ID=your-account-id
```

---

## 🇬🇧 English

### Environment Variables Setup

This repository requires some environment variables to work correctly:

#### 1. Local Variables (.env)

Copy the `.env.example` file to `.env` and fill with your values:

```bash
cp .env.example .env
```

Required variables:
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers permissions
- `ANTHROPIC_API_KEY`: Anthropic Claude API key (if using Claude integration)

#### 2. Cloudflare Workers Secrets

To configure secrets in your workers:

```bash
# For each worker, navigate to the directory and configure:
cd workers/hello-world

# Configure secrets using wrangler
wrangler secret put ANTHROPIC_API_KEY
# Enter the value when prompted

# List configured secrets
wrangler secret list
```

#### 3. GitHub Secrets (for CI/CD)

Configure the following secrets in your GitHub repository:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `ANTHROPIC_API_KEY`: Anthropic API key

To configure:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with its value

### How to Obtain Credentials

#### Cloudflare Account ID
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on "Workers & Pages"
3. The Account ID is visible on the right side

#### Cloudflare API Token
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Configure permissions and create the token

#### Anthropic API Key
1. Access [console.anthropic.com](https://console.anthropic.com)
2. Go to "API Keys"
3. Create a new API key

### Wrangler Authentication

```bash
# Method 1: Interactive login (recommended for local development)
wrangler login

# Method 2: Using environment variables (CI/CD)
export CLOUDFLARE_API_TOKEN=your-token
export CLOUDFLARE_ACCOUNT_ID=your-account-id
```
