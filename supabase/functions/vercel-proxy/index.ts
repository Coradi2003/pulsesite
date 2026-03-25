import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ALLOWED_ENDPOINTS = [
  /^\/v9\/projects(\?.*)?$/,
  /^\/v6\/deployments(\?.*)?$/,
  /^\/v2\/user$/,
  /^\/v9\/projects\/[^\/]+$/
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const VERCEL_TOKEN = Deno.env.get('VERCEL_TOKEN')
    if (!VERCEL_TOKEN) {
      return new Response(JSON.stringify({ error: 'Configuração ausente no servidor' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    const { url, method = 'GET', body } = await req.json()
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL ausente' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Whitelist check
    const isAllowed = ALLOWED_ENDPOINTS.some(pattern => pattern.test(url))
    if (!isAllowed) {
      return new Response(JSON.stringify({ error: 'Endpoint não permitido' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

    const res = await fetch(`https://api.vercel.com${url}`, {
      method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
    })

    const data = await res.json()
    
    // Log for debugging in Supabase dashboard
    if (!res.ok) {
      console.error(`Vercel API Error: ${res.status} ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({
      ...data,
      _proxy_source: 'vercel-api',
      _status: res.status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.status,
    })
  } catch (error) {
    console.error(`Proxy Exception: ${error.message}`);
    return new Response(JSON.stringify({ 
      error: error.message,
      _proxy_source: 'edge-function-exception'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
