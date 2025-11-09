# Using with Claude Code Web

This repository is specifically designed to work seamlessly with Claude Code web for developing and managing Cloudflare Workers.

## Overview

Claude Code web can help you:
- Create new workers
- Edit existing workers
- Debug issues
- Add new features
- Deploy workers
- Review code

## Best Practices

### 1. Clear Communication

When working with Claude Code web, be specific about what you want:

**Good:**
- "Create a new worker that proxies requests to the GitHub API"
- "Add rate limiting to the hello-world worker"
- "Fix the CORS headers in api-proxy worker"

**Not as helpful:**
- "Make it better"
- "Add features"
- "Update the code"

### 2. Incremental Changes

Work in small steps:
1. Create or modify one worker at a time
2. Test changes locally
3. Deploy and verify
4. Move to next change

### 3. Use the Structure

The repository structure helps Claude Code web understand your project:

```
workers/
├── worker-name/
│   ├── src/
│   │   └── index.js      # Main worker code
│   ├── wrangler.toml     # Configuration
│   ├── package.json      # Dependencies
│   └── README.md         # Documentation
```

Each worker is self-contained, making it easy to work on them independently.

## Common Tasks

### Creating a New Worker

Ask Claude Code web:
> "Create a new Cloudflare Worker called 'auth-handler' that validates JWT tokens"

### Modifying Existing Worker

Ask Claude Code web:
> "Update the api-proxy worker to add caching for GET requests"

### Adding Features

Ask Claude Code web:
> "Add request logging to the hello-world worker"

### Debugging

Ask Claude Code web:
> "The api-proxy worker is returning 500 errors. Can you help debug?"

### Deployment

Ask Claude Code web:
> "Help me deploy the hello-world worker to production"

## Repository Organization

### Why This Structure Works

1. **Isolated Workers**: Each worker is in its own directory
   - No conflicts between workers
   - Easy to test independently
   - Clear ownership of files

2. **Consistent Layout**: All workers follow the same pattern
   - Claude Code web knows where to find things
   - Easy to understand and navigate
   - Predictable file locations

3. **Good Documentation**: Each worker has its own README
   - Claude Code web can read context
   - New developers can understand quickly
   - Examples are readily available

4. **Shared Resources**: Common code in `shared/`
   - Reusable utilities
   - Consistent patterns
   - DRY principle

## Working with Multiple Workers

When you have multiple workers, you can:

1. **Work on one at a time**: Focus on a single worker directory
2. **Share code**: Use the `shared/` directory for common utilities
3. **Test together**: Run multiple workers locally on different ports
4. **Deploy independently**: Each worker deploys separately

## Tips for Success

### 1. Keep Workers Simple

Small, focused workers are easier to understand and maintain:
- Single responsibility
- Clear purpose
- Well-documented

### 2. Use Examples

The repository includes example workers:
- `hello-world`: Basic structure
- `api-proxy`: CORS and proxying

Reference these when creating new workers.

### 3. Document Changes

Update README files when making significant changes:
- New features
- Configuration changes
- Breaking changes

### 4. Test Locally First

Always test locally before deploying:
```bash
cd workers/your-worker
npm run dev
```

### 5. Use Version Control

Make commits for meaningful changes:
- Feature additions
- Bug fixes
- Configuration updates

## Example Workflows

### Creating a REST API Worker

1. "Create a new worker called 'rest-api'"
2. "Add GET /users endpoint that returns a list of users"
3. "Add POST /users endpoint to create a new user"
4. "Add error handling for invalid requests"
5. "Test locally at http://localhost:8787"
6. "Deploy to staging environment"

### Adding Authentication

1. "Add JWT authentication to the api-proxy worker"
2. "Check for Authorization header in requests"
3. "Validate JWT token using a secret key"
4. "Return 401 if token is invalid"
5. "Add tests for authentication logic"

### Implementing Caching

1. "Add caching to the api-proxy worker"
2. "Cache GET requests for 5 minutes"
3. "Use Cloudflare Cache API"
4. "Add cache headers to responses"
5. "Test cache behavior locally"

## Advanced Features

### Using KV Storage

Ask Claude Code web to:
> "Add Cloudflare KV storage to store user sessions"

### Using Durable Objects

Ask Claude Code web to:
> "Create a Durable Object for managing WebSocket connections"

### Using R2 Storage

Ask Claude Code web to:
> "Add R2 bucket integration for file uploads"

## Troubleshooting with Claude Code Web

When something goes wrong:

1. **Describe the error**: Copy and paste error messages
2. **Show what you tried**: Explain the steps you took
3. **Share logs**: Include relevant console output
4. **Ask for help**: Claude Code web can debug with you

Example:
> "I'm getting a 'No such module' error when trying to deploy. Here's the error message: [paste error]. Can you help?"

## Summary

This repository structure is optimized for working with Claude Code web:
- Clear organization
- Consistent patterns
- Good documentation
- Isolated workers
- Easy to understand

By following these guidelines, you'll have a smooth experience developing Cloudflare Workers with Claude Code web assistance.
