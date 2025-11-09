# RW - Cloudflare Workers Repository

## 🇧🇷 Português

Este é um repositório para todos os meus contêineres Cloudflare Workers e suas imagens, especificamente voltado para que o Claude Code web possa trabalhar com eles, instanciá-los, etc.

### O que é este repositório?

Este repositório contém uma coleção de Cloudflare Workers prontos para uso. Cada worker está organizado em sua própria pasta com toda a configuração necessária.

### Estrutura do Repositório

```
RW/
├── workers/               # Diretório principal de workers
│   ├── hello-world/      # Worker de exemplo
│   ├── api-proxy/        # Worker de proxy de API
│   └── ...               # Outros workers
├── shared/               # Código compartilhado entre workers
├── docs/                 # Documentação adicional
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

#### Configuração Inicial

1. Clone este repositório:
   ```bash
   git clone https://github.com/myselfgus/RW.git
   cd RW
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Autentique com Cloudflare:
   ```bash
   wrangler login
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

### Criando um Novo Worker

```bash
npm run create-worker <nome-do-worker>
```

---

## 🇬🇧 English

This is a repository for all my Cloudflare Workers containers and their images, specifically designed to allow Claude Code web to work with them, instantiate them, etc.

### What is this repository?

This repository contains a collection of ready-to-use Cloudflare Workers. Each worker is organized in its own folder with all the necessary configuration.

### Repository Structure

```
RW/
├── workers/               # Main workers directory
│   ├── hello-world/      # Example worker
│   ├── api-proxy/        # API proxy worker
│   └── ...               # Other workers
├── shared/               # Shared code between workers
├── docs/                 # Additional documentation
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

#### Initial Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/myselfgus/RW.git
   cd RW
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Authenticate with Cloudflare:
   ```bash
   wrangler login
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

### Creating a New Worker

```bash
npm run create-worker <worker-name>
```

---

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.