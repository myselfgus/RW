# Getting Started with Cloudflare Workers

This guide will help you get started with developing and deploying Cloudflare Workers.

## Prerequisites

1. **Node.js**: Install Node.js version 16 or higher
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm or yarn**: Package manager (comes with Node.js)
   - Verify: `npm --version`

3. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)

4. **Wrangler CLI**: Cloudflare's command-line tool
   ```bash
   npm install -g wrangler
   ```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/myselfgus/RW.git
cd RW
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### 4. Choose a Worker

Navigate to one of the example workers:

```bash
cd workers/hello-world
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

The worker will be available at `http://localhost:8787`

### 6. Test Your Worker

Open your browser and visit:
- `http://localhost:8787/` - Main endpoint
- `http://localhost:8787/json` - JSON endpoint (if available)

### 7. Deploy to Cloudflare

Before deploying, update `wrangler.toml` with your account ID:

```toml
account_id = "your-account-id-here"
```

You can find your account ID in the Cloudflare dashboard under Workers.

Then deploy:

```bash
npm run deploy
```

## Creating a New Worker

Use the built-in script to create a new worker:

```bash
npm run create-worker my-new-worker
```

This will create a new worker in `workers/my-new-worker` with all necessary files.

## Project Structure

```
RW/
├── workers/
│   ├── hello-world/       # Simple example
│   │   ├── src/
│   │   │   └── index.js   # Worker code
│   │   ├── wrangler.toml  # Configuration
│   │   ├── package.json   # Dependencies
│   │   └── README.md      # Documentation
│   └── api-proxy/         # API proxy example
├── shared/                # Shared utilities
├── docs/                  # Documentation
└── scripts/               # Helper scripts
```

## Common Commands

### Development

```bash
npm run dev              # Start development server
npm run dev -- --port 8080  # Use custom port
```

### Deployment

```bash
npm run deploy              # Deploy to default environment
npm run deploy:staging      # Deploy to staging
npm run deploy:production   # Deploy to production
```

### Logs

```bash
npm run tail               # Stream production logs
```

## Environment Variables

To use environment variables in your worker:

1. Create a `.dev.vars` file in your worker directory:
   ```
   API_KEY=your-api-key
   SECRET=your-secret
   ```

2. Access in your worker code:
   ```javascript
   export default {
     async fetch(request, env, ctx) {
       const apiKey = env.API_KEY;
       // Use your environment variables
     }
   }
   ```

3. For production, use Cloudflare dashboard to set secrets:
   ```bash
   wrangler secret put API_KEY
   ```

## Next Steps

- Read the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- Explore the example workers in `workers/`
- Join the [Cloudflare Workers Discord](https://discord.gg/cloudflaredev)

## Troubleshooting

### "No account_id found"

Add your account ID to `wrangler.toml`:
```toml
account_id = "your-account-id"
```

### "Port already in use"

Use a different port:
```bash
npm run dev -- --port 8080
```

### Authentication issues

Re-authenticate with Cloudflare:
```bash
wrangler logout
wrangler login
```
