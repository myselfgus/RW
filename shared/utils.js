/**
 * Shared utilities for Cloudflare Workers
 */

/**
 * Standard CORS headers
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Handle CORS preflight requests
 */
export function handleCors(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  return null;
}

/**
 * Create a JSON response with CORS headers
 */
export function jsonResponse(data, status = 200, additionalHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  });
}

/**
 * Create an error response
 */
export function errorResponse(message, status = 500) {
  return jsonResponse({ error: message }, status);
}

/**
 * Simple router helper
 */
export class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  put(path, handler) {
    this.routes.push({ method: 'PUT', path, handler });
  }

  delete(path, handler) {
    this.routes.push({ method: 'DELETE', path, handler });
  }

  async handle(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    for (const route of this.routes) {
      if (route.method === method && this.matchPath(route.path, url.pathname)) {
        return await route.handler(request, env, ctx);
      }
    }

    return errorResponse('Not Found', 404);
  }

  matchPath(routePath, urlPath) {
    // Simple exact match for now
    // Could be extended to support path parameters
    return routePath === urlPath;
  }
}

/**
 * Rate limiting helper using Cloudflare KV
 */
export async function rateLimit(key, limit, window, kv) {
  const now = Date.now();
  const windowKey = `ratelimit:${key}:${Math.floor(now / (window * 1000))}`;
  
  const count = await kv.get(windowKey);
  const currentCount = count ? parseInt(count) : 0;

  if (currentCount >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await kv.put(windowKey, String(currentCount + 1), { expirationTtl: window });
  return { allowed: true, remaining: limit - currentCount - 1 };
}

/**
 * Simple request logger
 */
export function logRequest(request) {
  const url = new URL(request.url);
  console.log({
    method: request.method,
    path: url.pathname,
    timestamp: new Date().toISOString(),
  });
}
