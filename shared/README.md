# Shared Utilities

This directory contains shared code that can be used across multiple Cloudflare Workers.

## Available Utilities

### CORS Helpers

```javascript
import { corsHeaders, handleCors, jsonResponse } from '../../shared/utils.js';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    const corsResponse = handleCors(request);
    if (corsResponse) return corsResponse;

    // Use JSON response with CORS
    return jsonResponse({ message: 'Hello' });
  }
};
```

### Router

```javascript
import { Router } from '../../shared/utils.js';

const router = new Router();

router.get('/', async (request, env, ctx) => {
  return new Response('Home page');
});

router.post('/api/data', async (request, env, ctx) => {
  return new Response('Data created');
});

export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx);
  }
};
```

### Error Handling

```javascript
import { errorResponse } from '../../shared/utils.js';

export default {
  async fetch(request, env, ctx) {
    try {
      // Your code
    } catch (error) {
      return errorResponse(error.message, 500);
    }
  }
};
```

### Rate Limiting

```javascript
import { rateLimit } from '../../shared/utils.js';

export default {
  async fetch(request, env, ctx) {
    const clientIP = request.headers.get('CF-Connecting-IP');
    const { allowed, remaining } = await rateLimit(
      clientIP,
      100,  // 100 requests
      60,   // per 60 seconds
      env.RATE_LIMIT_KV
    );

    if (!allowed) {
      return new Response('Rate limit exceeded', { status: 429 });
    }

    // Continue processing
  }
};
```

### Request Logging

```javascript
import { logRequest } from '../../shared/utils.js';

export default {
  async fetch(request, env, ctx) {
    logRequest(request);
    // Your worker logic
  }
};
```

## Adding New Utilities

When adding new utilities:
1. Keep them generic and reusable
2. Document usage with examples
3. Export clearly named functions
4. Add JSDoc comments
