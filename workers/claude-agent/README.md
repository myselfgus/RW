# Claude Agent Worker

Worker do Cloudflare integrado com Anthropic Claude AI / Cloudflare Worker integrated with Anthropic Claude AI.

## 🇧🇷 Português

### Descrição

Este worker permite interagir com o Claude AI através de uma API HTTP simples. Ele atua como um proxy seguro entre seus aplicativos e a API do Anthropic.

### Configuração

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure a chave de API do Anthropic:
   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   # Cole sua chave de API quando solicitado
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Endpoints

#### `GET /health`
Verifica se o worker está funcionando corretamente.

**Resposta:**
```json
{
  "status": "healthy",
  "worker": "claude-agent",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "hasApiKey": true
}
```

#### `POST /chat`
Envia uma mensagem para o Claude e recebe uma resposta.

**Corpo da requisição:**
```json
{
  "message": "Olá, Claude! Como você está?",
  "model": "claude-3-5-sonnet-20241022"
}
```

**Resposta:**
```json
{
  "response": "Olá! Estou bem, obrigado por perguntar...",
  "model": "claude-3-5-sonnet-20241022",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 25
  }
}
```

### Exemplo de Uso

```bash
# Health check
curl http://localhost:8787/health

# Chat com Claude
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explique o que é edge computing"}'
```

### Deploy

```bash
npm run deploy
```

---

## 🇬🇧 English

### Description

This worker allows you to interact with Claude AI through a simple HTTP API. It acts as a secure proxy between your applications and the Anthropic API.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure the Anthropic API key:
   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   # Paste your API key when prompted
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Endpoints

#### `GET /health`
Checks if the worker is functioning correctly.

**Response:**
```json
{
  "status": "healthy",
  "worker": "claude-agent",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "hasApiKey": true
}
```

#### `POST /chat`
Sends a message to Claude and receives a response.

**Request body:**
```json
{
  "message": "Hello, Claude! How are you?",
  "model": "claude-3-5-sonnet-20241022"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing well, thank you for asking...",
  "model": "claude-3-5-sonnet-20241022",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 25
  }
}
```

### Usage Example

```bash
# Health check
curl http://localhost:8787/health

# Chat with Claude
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain what edge computing is"}'
```

### Deploy

```bash
npm run deploy
```
