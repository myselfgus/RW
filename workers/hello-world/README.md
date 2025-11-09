# Hello World Worker

Simple Cloudflare Worker that demonstrates basic functionality.

## Features

- Returns "Hello World" message on root path
- Returns JSON response on `/json` path
- Demonstrates basic routing

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

## Endpoints

- `GET /` - Returns plain text hello world message
- `GET /json` - Returns JSON response with timestamp

## Configuration

Edit `wrangler.toml` to configure:
- Worker name
- Account ID (for deployment)
- Environment settings
