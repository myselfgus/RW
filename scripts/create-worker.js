#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const workerName = process.argv[2];

if (!workerName) {
  console.error('Usage: npm run create-worker <worker-name>');
  process.exit(1);
}

const workerDir = path.join(__dirname, '..', 'workers', workerName);
const srcDir = path.join(workerDir, 'src');

// Check if worker already exists
if (fs.existsSync(workerDir)) {
  console.error(`Worker "${workerName}" already exists!`);
  process.exit(1);
}

// Create directories
fs.mkdirSync(workerDir, { recursive: true });
fs.mkdirSync(srcDir, { recursive: true });

// Create index.js
const indexContent = `export default {
  async fetch(request, env, ctx) {
    return new Response('Hello from ${workerName}!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
`;

fs.writeFileSync(path.join(srcDir, 'index.js'), indexContent);

// Create wrangler.toml
const wranglerContent = `name = "${workerName}"
main = "src/index.js"
compatibility_date = "2024-01-01"

# Uncomment and configure for production deployment
# account_id = "your-account-id"
# workers_dev = true

[env.production]
name = "${workerName}-production"

[env.staging]
name = "${workerName}-staging"
`;

fs.writeFileSync(path.join(workerDir, 'wrangler.toml'), wranglerContent);

// Create package.json
const packageJsonContent = {
  name: `${workerName}-worker`,
  version: '1.0.0',
  description: `Cloudflare Worker: ${workerName}`,
  main: 'src/index.js',
  scripts: {
    dev: 'wrangler dev',
    deploy: 'wrangler deploy',
    'deploy:staging': 'wrangler deploy --env staging',
    'deploy:production': 'wrangler deploy --env production',
    tail: 'wrangler tail',
  },
  keywords: ['cloudflare', 'worker', workerName],
  author: 'myselfgus',
  license: 'MIT',
  devDependencies: {
    wrangler: '^3.0.0',
  },
};

fs.writeFileSync(
  path.join(workerDir, 'package.json'),
  JSON.stringify(packageJsonContent, null, 2)
);

// Create README.md
const readmeContent = `# ${workerName} Worker

Cloudflare Worker for ${workerName}.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit \`http://localhost:8787\` to test the worker.

## Deployment

\`\`\`bash
# Deploy to default environment
npm run deploy

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
\`\`\`

## Configuration

Edit \`wrangler.toml\` to configure:
- Worker name
- Account ID (for deployment)
- Environment settings
`;

fs.writeFileSync(path.join(workerDir, 'README.md'), readmeContent);

console.log(`✅ Worker "${workerName}" created successfully at workers/${workerName}`);
console.log('\nNext steps:');
console.log(`  cd workers/${workerName}`);
console.log('  npm install');
console.log('  npm run dev');
