import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Security: restrict CORS to known production origins ─────────────────────
const ALLOWED_ORIGINS = [
  "https://pulsefuturo.com.br",
  "https://www.pulsefuturo.com.br",
  "https://admin.pulsefuturo.com.br",
];

function getCorsHeaders(origin: string): Record<string, string> {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

const ALLOWED_ENDPOINTS = [
  /^\/v9\/projects(\?.*)?$/,
  /^\/v6\/deployments(\?.*)?$/,
  /^\/v2\/user$/,
  /^\/v9\/projects\/[^\/]+$/,
];

Deno.serve(async req => {
  const origin = req.headers.get("Origin") ?? "";
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Manual JWT check since verify_jwt is false in config.toml
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing Authorization header" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid JWT signature" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const VERCEL_TOKEN = Deno.env.get("VERCEL_TOKEN");
    if (!VERCEL_TOKEN) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const { url, method = "GET", body } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL ausente" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Whitelist check
    const isAllowed = ALLOWED_ENDPOINTS.some(pattern => pattern.test(url));
    if (!isAllowed) {
      return new Response(JSON.stringify({ error: "Endpoint não permitido" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    const res = await fetch(`https://api.vercel.com${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: body && method !== "GET" ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    // Log for debugging in Supabase dashboard
    if (!res.ok) {
      console.error(`Vercel API Error: ${res.status} ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: res.status,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Proxy Exception: ${message}`);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
