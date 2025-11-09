# API Proxy Worker

Cloudflare Worker that acts as an API proxy with CORS support.

## Features

- Proxies requests to external APIs
- CORS headers enabled
- Error handling
- Example implementation with JSONPlaceholder API

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:8787` to test the worker.

## Deployment

```bash
# Deploy to default environment
npm run deploy

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## Usage

### Example Requests

```bash
# Get posts
curl http://localhost:8787/api/posts

# Get specific user
curl http://localhost:8787/api/users/1

# Get comments
curl http://localhost:8787/api/comments
```

## Configuration

Edit `wrangler.toml` to configure:
- Worker name
- Account ID (for deployment)
- Environment settings

To proxy to a different API, modify the `targetUrl` in `src/index.js`.
