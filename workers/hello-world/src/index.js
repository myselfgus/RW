export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Simple routing example
    if (url.pathname === '/') {
      return new Response('Hello World from Cloudflare Worker! 🌍', {
        headers: { 'content-type': 'text/plain' },
      });
    }
    
    if (url.pathname === '/json') {
      return new Response(JSON.stringify({
        message: 'Hello from Cloudflare Worker!',
        timestamp: new Date().toISOString(),
        path: url.pathname
      }), {
        headers: { 'content-type': 'application/json' },
      });
    }
    
    return new Response('Not Found', { status: 404 });
  },
};
