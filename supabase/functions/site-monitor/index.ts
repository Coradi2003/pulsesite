import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Security: restrict CORS to known production origins ─────────────────────
const ALLOWED_ORIGINS = [
  "https://pulsefuturo.com.br",
  "https://www.pulsefuturo.com.br",
  "https://admin.pulsefuturo.com.br",
];

function getCorsHeaders(origin: string): Record<string, string> {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Vary": "Origin",
  };
}

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) return;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_APIKEY}`;
  await fetch(url).catch(console.error);
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin") ?? "";
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const [{ data: projects, error: pe }, { data: domains, error: de }] = await Promise.all([
      supabase.from("projects").select("*"),
      supabase.from("domains").select("*")
    ]);

    if (pe || de) throw pe || de;

    const now = new Date();
    const results: Record<string, string> = {};
    const projectUpdates: any[] = [];
    const domainUpdates: any[] = [];

    // Process Projects
    for (const p of projects || []) {
      const url = p.custom_domain ? `https://${p.custom_domain.replace(/^https?:\/\//, "")}` : p.vercel_url;
      if (!url) { results[p.id] = "offline"; continue; }

      let isUp = false;
      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        isUp = res.status < 500;
      } catch { isUp = false; }

      const status = isUp ? "online" : "offline";
      results[p.id] = status;

      const update: any = { id: p.id, status, last_ping: now.toISOString() };
      if (isUp && p.down_since) {
        update.down_since = null;
        update.last_alert_sent = null;
        await sendWhatsApp(`✅ Site online: *${p.project_name}*`);
      } else if (!isUp && !p.down_since) {
        update.down_since = now.toISOString();
      }
      projectUpdates.push(update);
    }

    // Process Domains (Standalone)
    for (const d of domains || []) {
      const url = `https://${d.domain.replace(/^https?:\/\//, "")}`;
      let isUp = false;
      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        isUp = res.status < 500;
      } catch { isUp = false; }

      const status = isUp ? "online" : "offline";
      results[d.id] = status;

      const update: any = { id: d.id, status, last_ping: now.toISOString() };
      if (isUp && (d as any).down_since) {
        (update as any).down_since = null;
        await sendWhatsApp(`✅ Domínio online: *${d.domain}*`);
      } else if (!isUp && !(d as any).down_since) {
        // down_since not tracked on domains table yet
      }
      domainUpdates.push(update);
    }

    // Bulk updates
    if (projectUpdates.length > 0) await supabase.from("projects").upsert(projectUpdates);
    if (domainUpdates.length > 0) await supabase.from("domains").upsert(domainUpdates);

    return new Response(JSON.stringify({ 
      ok: true, 
      results, 
      version: "1.1.0", 
      monitored: projectUpdates.length + domainUpdates.length 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { headers: corsHeaders, status: 500 });
  }
});
