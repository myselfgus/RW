export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Example: Proxy to JSONPlaceholder API
    if (url.pathname.startsWith('/api/')) {
      const apiPath = url.pathname.replace('/api/', '');
      const targetUrl = `https://jsonplaceholder.typicode.com/${apiPath}`;
      
      try {
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: request.headers,
          body: request.method !== 'GET' ? await request.text() : undefined,
        });
        
        const data = await response.text();
        
        return new Response(data, {
          status: response.status,
          headers: {
            ...corsHeaders,
            'Content-Type': response.headers.get('Content-Type') || 'application/json',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Home route
    return new Response(JSON.stringify({
      message: 'API Proxy Worker',
      usage: 'Use /api/* to proxy requests to JSONPlaceholder',
      examples: [
        '/api/posts',
        '/api/users',
        '/api/comments'
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
