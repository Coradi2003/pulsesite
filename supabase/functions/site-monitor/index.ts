import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Security: restrict CORS to known production origins ─────────────────────
const ALLOWED_ORIGINS = [
  "https://pulsefuturo.com.br",
  "https://www.pulsefuturo.com.br",
  "https://admin.pulsefuturo.com.br",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
];

function getCorsHeaders(origin: string): Record<string, string> {
  // Allow any vercel preview deployment or known origin
  const isAllowed =
    ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".vercel.app");
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    Vary: "Origin",
  };
}

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) return;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_APIKEY}`;
  await fetch(url).catch(console.error);
}

// ── Real ping: measures responseTime in ms ───────────────────────────────────
interface PingResult {
  status: "online" | "offline";
  responseTime: number | null;
}

async function pingUrl(url: string): Promise<PingResult> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const responseTime = Date.now() - start;
    const isUp = res.status < 500;
    return {
      status: isUp ? "online" : "offline",
      responseTime: isUp ? responseTime : null,
    };
  } catch {
    return { status: "offline", responseTime: null };
  }
}

Deno.serve(async req => {
  const origin = req.headers.get("Origin") ?? "";
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");

    // If auth header present, validate as user JWT (browser calls)
    // If no auth header, allow through — called by pg_cron internally
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      // Accept service role key directly
      if (token !== serviceRoleKey) {
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
            JSON.stringify({ error: "Unauthorized: Invalid JWT" }),
            {
              status: 401,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }
    }

    // Now instantiate service role client to bypass RLS and perform background DB updates
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const [{ data: projects, error: pe }, { data: domains, error: de }] =
      await Promise.all([
        supabase.from("projects").select("*"),
        supabase.from("domains").select("*"),
      ]);

    if (pe || de) throw pe || de;

    const now = new Date();
    const results: Record<string, PingResult> = {};

    // ── Parallel ping for Projects ───────────────────────────────────────────
    const projectPings = await Promise.all(
      (projects || []).map(async p => {
        const url = p.custom_domain
          ? `https://${p.custom_domain.replace(/^https?:\/\//, "")}`
          : p.vercel_url;
        if (!url)
          return {
            p,
            ping: { status: "offline" as const, responseTime: null },
          };
        const ping = await pingUrl(url);
        return { p, ping };
      })
    );

    const projectUpdates: any[] = [];
    for (const { p, ping } of projectPings) {
      results[p.id] = ping;
      const update: any = {
        id: p.id,
        status: ping.status,
        last_ping: now.toISOString(),
        response_time: ping.responseTime,
      };
      if (ping.status === "online" && p.down_since) {
        update.down_since = null;
        update.last_alert_sent = null;
        await sendWhatsApp(
          `✅ *Site voltou online!*\n\n🌐 *${p.project_name}*\n⏱️ Resposta: ${ping.responseTime}ms`
        );
      } else if (ping.status === "offline" && !p.down_since) {
        update.down_since = now.toISOString();
        await sendWhatsApp(
          `🚨 *Site OFFLINE!*\n\n🌐 *${p.project_name}*\n🔗 ${p.custom_domain || p.vercel_url}\n🕐 ${now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
        );
      }
      projectUpdates.push(update);
    }

    // ── Parallel ping for Domains ─────────────────────────────────────────────
    const domainPings = await Promise.all(
      (domains || []).map(async d => {
        const url = `https://${d.domain.replace(/^https?:\/\//, "")}`;
        const ping = await pingUrl(url);
        return { d, ping };
      })
    );

    const domainUpdates: any[] = [];
    for (const { d, ping } of domainPings) {
      results[d.id] = ping;
      const update: any = {
        id: d.id,
        status: ping.status,
        last_ping: now.toISOString(),
        response_time: ping.responseTime,
      };
      if (ping.status === "online" && (d as any).down_since) {
        (update as any).down_since = null;
        await sendWhatsApp(
          `✅ *Domínio voltou online!*\n\n🌐 *${d.domain}*\n⏱️ Resposta: ${ping.responseTime}ms`
        );
      } else if (ping.status === "offline" && !(d as any).down_since) {
        (update as any).down_since = now.toISOString();
        await sendWhatsApp(
          `🚨 *Domínio OFFLINE!*\n\n🌐 *${d.domain}*\n🕐 ${now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
        );
      }
      domainUpdates.push(update);
    }

    // ── Bulk upserts (wrapped so DB errors don't kill the response) ───────────
    try {
      if (projectUpdates.length > 0)
        await supabase.from("projects").upsert(projectUpdates);
    } catch (upsertErr) {
      // Likely missing response_time column — retry without it
      try {
        const safeUpdates = projectUpdates.map(
          ({ response_time, ...rest }: any) => rest
        );
        await supabase.from("projects").upsert(safeUpdates);
      } catch {
        /* ignore */
      }
    }

    try {
      if (domainUpdates.length > 0)
        await supabase.from("domains").upsert(domainUpdates);
    } catch (upsertErr) {
      // Likely missing response_time column — retry without it
      try {
        const safeUpdates = domainUpdates.map(
          ({ response_time, ...rest }: any) => rest
        );
        await supabase.from("domains").upsert(safeUpdates);
      } catch {
        /* ignore */
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        results,
        version: "2.0.0",
        monitored: projectUpdates.length + domainUpdates.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Monitor Error: ${message}`);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
