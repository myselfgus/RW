import Anthropic from '@anthropic-ai/sdk';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        worker: 'claude-agent',
        timestamp: new Date().toISOString(),
        hasApiKey: !!env.ANTHROPIC_API_KEY
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Main endpoint - Chat with Claude
    if (url.pathname === '/chat' && request.method === 'POST') {
      try {
        // Check if API key is configured
        if (!env.ANTHROPIC_API_KEY) {
          return new Response(JSON.stringify({
            error: 'ANTHROPIC_API_KEY not configured',
            message: 'Please set the API key using: wrangler secret put ANTHROPIC_API_KEY'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Parse request body
        const body = await request.json();
        const { message, model = 'claude-3-5-sonnet-20241022' } = body;

        if (!message) {
          return new Response(JSON.stringify({
            error: 'Missing message parameter'
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Initialize Anthropic client
        const anthropic = new Anthropic({
          apiKey: env.ANTHROPIC_API_KEY,
        });

        // Call Claude API
        const response = await anthropic.messages.create({
          model: model,
          max_tokens: 1024,
          messages: [{ role: 'user', content: message }],
        });

        // Return response
        return new Response(JSON.stringify({
          response: response.content[0].text,
          model: response.model,
          usage: response.usage,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (error) {
        console.error('Error calling Claude API:', error);
        return new Response(JSON.stringify({
          error: error.message,
          type: error.constructor.name
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Home route - API documentation
    return new Response(JSON.stringify({
      worker: 'Claude Agent Worker',
      description: 'Cloudflare Worker integrated with Anthropic Claude AI',
      endpoints: {
        '/health': {
          method: 'GET',
          description: 'Health check endpoint'
        },
        '/chat': {
          method: 'POST',
          description: 'Chat with Claude AI',
          body: {
            message: 'Your message to Claude (required)',
            model: 'Model to use (optional, default: claude-3-5-sonnet-20241022)'
          },
          example: {
            message: 'Hello, Claude!',
            model: 'claude-3-5-sonnet-20241022'
          }
        }
      },
      documentation: 'https://docs.anthropic.com/claude/reference'
    }, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
