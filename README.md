# RW - Cloudflare Workers Repository

## 🇧🇷 Português

Este é um repositório para todos os meus contêineres Cloudflare Workers e suas imagens, especificamente voltado para que o Claude Code web possa trabalhar com eles, instanciá-los, etc.

### O que é este repositório?

Este repositório contém uma coleção de Cloudflare Workers prontos para uso. Cada worker está organizado em sua própria pasta com toda a configuração necessária.

### Estrutura do Repositório

```
RW/
├── workers/               # Diretório principal de workers
│   ├── hello-world/      # Worker de exemplo básico
│   ├── api-proxy/        # Worker de proxy de API
│   ├── claude-agent/     # Worker com integração Claude AI
│   └── ...               # Outros workers
├── shared/               # Código compartilhado entre workers
├── docs/                 # Documentação adicional
│   ├── SETUP.md         # Guia de configuração
│   ├── WORKERS.md       # Documentação dos workers
│   └── CONTAINERS.md    # Container images e arquitetura
├── scripts/              # Scripts utilitários
│   ├── setup-environment.sh  # Setup inicial
│   ├── deploy-all.sh         # Deploy de todos os workers
│   └── test-workers.sh       # Testes locais
└── README.md            # Este arquivo
```

### Como Usar

#### Pré-requisitos

1. Node.js (versão 16 ou superior)
2. npm ou yarn
3. Conta Cloudflare
4. Wrangler CLI instalado globalmente:
   ```bash
   npm install -g wrangler
   ```
5. (Opcional) Chave de API do Anthropic Claude para usar o worker `claude-agent`

#### Configuração Inicial

1. Clone este repositório:
   ```bash
   git clone https://github.com/myselfgus/RW.git
   cd RW
   ```

2. Execute o script de setup (recomendado):
   ```bash
   ./scripts/setup-environment.sh
   ```

   Ou instale manualmente:
   ```bash
   npm install
   cd workers/hello-world && npm install
   cd ../api-proxy && npm install
   cd ../claude-agent && npm install
   ```

3. Configure variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```

4. Autentique com Cloudflare:
   ```bash
   wrangler login
   ```

5. (Opcional) Configure secrets para o claude-agent:
   ```bash
   cd workers/claude-agent
   wrangler secret put ANTHROPIC_API_KEY
   # Cole sua chave de API do Anthropic
   ```

#### Desenvolvendo um Worker

1. Navegue até o worker desejado:
   ```bash
   cd workers/hello-world
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. O worker estará disponível em `http://localhost:8787`

#### Deploy de um Worker

```bash
cd workers/hello-world
npm run deploy
```

### Usando com Claude Code Web

Este repositório foi estruturado para facilitar o trabalho com Claude Code web:

1. **Estrutura Clara**: Cada worker tem sua própria pasta com arquivos bem organizados
2. **Configuração Padronizada**: Todos os workers usam a mesma estrutura de configuração
3. **Documentação**: Cada worker tem sua própria documentação
4. **Scripts Npm**: Scripts padronizados para desenvolvimento e deploy
5. **Claude SDK Integrado**: Worker `claude-agent` com Anthropic SDK pré-configurado

### Workers Disponíveis

- **hello-world**: Worker básico de demonstração
- **api-proxy**: Proxy reverso com suporte a CORS
- **claude-agent**: Integração com Claude AI (requer API key do Anthropic)

Para mais detalhes, consulte: [docs/WORKERS.md](docs/WORKERS.md)

### Criando um Novo Worker

```bash
npm run create-worker <nome-do-worker>
```

### Scripts Úteis

```bash
# Setup do ambiente
./scripts/setup-environment.sh

# Deploy de todos os workers
./scripts/deploy-all.sh

# Testar workers localmente
./scripts/test-workers.sh
```

### Documentação Adicional

- [SETUP.md](docs/SETUP.md) - Guia completo de configuração
- [WORKERS.md](docs/WORKERS.md) - Documentação de todos os workers
- [CONTAINERS.md](docs/CONTAINERS.md) - Arquitetura e container images

---

## 🇬🇧 English

This is a repository for all my Cloudflare Workers containers and their images, specifically designed to allow Claude Code web to work with them, instantiate them, etc.

### What is this repository?

This repository contains a collection of ready-to-use Cloudflare Workers. Each worker is organized in its own folder with all the necessary configuration.

### Repository Structure

```
RW/
├── workers/               # Main workers directory
│   ├── hello-world/      # Basic example worker
│   ├── api-proxy/        # API proxy worker
│   ├── claude-agent/     # Worker with Claude AI integration
│   └── ...               # Other workers
├── shared/               # Shared code between workers
├── docs/                 # Additional documentation
│   ├── SETUP.md         # Setup guide
│   ├── WORKERS.md       # Workers documentation
│   └── CONTAINERS.md    # Container images and architecture
├── scripts/              # Utility scripts
│   ├── setup-environment.sh  # Initial setup
│   ├── deploy-all.sh         # Deploy all workers
│   └── test-workers.sh       # Local tests
└── README.md            # This file
```

### How to Use

#### Prerequisites

1. Node.js (version 16 or higher)
2. npm or yarn
3. Cloudflare account
4. Wrangler CLI installed globally:
   ```bash
   npm install -g wrangler
   ```
5. (Optional) Anthropic Claude API key to use the `claude-agent` worker

#### Initial Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/myselfgus/RW.git
   cd RW
   ```

2. Run the setup script (recommended):
   ```bash
   ./scripts/setup-environment.sh
   ```

   Or install manually:
   ```bash
   npm install
   cd workers/hello-world && npm install
   cd ../api-proxy && npm install
   cd ../claude-agent && npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit the .env file with your credentials
   ```

4. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

5. (Optional) Configure secrets for claude-agent:
   ```bash
   cd workers/claude-agent
   wrangler secret put ANTHROPIC_API_KEY
   # Paste your Anthropic API key
   ```

#### Developing a Worker

1. Navigate to the desired worker:
   ```bash
   cd workers/hello-world
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The worker will be available at `http://localhost:8787`

#### Deploying a Worker

```bash
cd workers/hello-world
npm run deploy
```

### Using with Claude Code Web

This repository is structured to facilitate working with Claude Code web:

1. **Clear Structure**: Each worker has its own folder with well-organized files
2. **Standardized Configuration**: All workers use the same configuration structure
3. **Documentation**: Each worker has its own documentation
4. **Npm Scripts**: Standardized scripts for development and deployment
5. **Claude SDK Integrated**: `claude-agent` worker with pre-configured Anthropic SDK

### Available Workers

- **hello-world**: Basic demonstration worker
- **api-proxy**: Reverse proxy with CORS support
- **claude-agent**: Claude AI integration (requires Anthropic API key)

For more details, see: [docs/WORKERS.md](docs/WORKERS.md)

### Creating a New Worker

```bash
npm run create-worker <worker-name>
```

### Useful Scripts

```bash
# Environment setup
./scripts/setup-environment.sh

# Deploy all workers
./scripts/deploy-all.sh

# Test workers locally
./scripts/test-workers.sh
```

### Additional Documentation

- [SETUP.md](docs/SETUP.md) - Complete setup guide
- [WORKERS.md](docs/WORKERS.md) - Documentation for all workers
- [CONTAINERS.md](docs/CONTAINERS.md) - Architecture and container images

---

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.