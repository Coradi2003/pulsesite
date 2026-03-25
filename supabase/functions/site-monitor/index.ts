// Supabase Edge Function: site-monitor
// Triggered every minute by pg_cron
// Checks each project URL and sends WhatsApp alert if down for 2+ minutes

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";
const CALLMEBOT_BOT = "+34 644 86 70 49";

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) {
    console.warn("CALLMEBOT_APIKEY not set, skipping WhatsApp notification");
    return;
  }
  const encoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encoded}&apikey=${CALLMEBOT_APIKEY}`;
  const res = await fetch(url);
  console.log("WhatsApp sent:", res.status, await res.text());
}

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all active projects that have a URL to ping
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, project_name, vercel_url, custom_domain, status, down_since, last_alert_sent")
      .or("vercel_url.neq.,custom_domain.neq.");

    if (error) throw error;
    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify({ ok: true, checked: 0 }), { status: 200 });
    }

    const now = new Date();
    const twoMinutesMs = 2 * 60 * 1000;
    const alertCooldownMs = 30 * 60 * 1000; // don't re-alert within 30min

    for (const project of projects) {
      const url = project.custom_domain
        ? `https://${project.custom_domain.replace(/^https?:\/\//, "")}`
        : project.vercel_url;

      if (!url) continue;

      let isUp = false;
      try {
        const res = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(8000),
        });
        isUp = res.status < 500;
      } catch {
        isUp = false;
      }

      if (isUp) {
        // Site back online — clear down_since
        if (project.down_since) {
          await supabase
            .from("projects")
            .update({ down_since: null, last_alert_sent: null, status: "online" })
            .eq("id", project.id);

          await sendWhatsApp(
            `✅ *Pulse Futuro* — Site voltou ao ar!\n\n🌐 *${project.project_name}*\n🔗 ${url}\n⏰ ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
          );
        } else if (project.status !== "online") {
          await supabase.from("projects").update({ status: "online" }).eq("id", project.id);
        }
      } else {
        // Site is down
        const downSince = project.down_since ? new Date(project.down_since) : null;

        if (!downSince) {
          // First time we detect it's down — record timestamp
          await supabase
            .from("projects")
            .update({ down_since: now.toISOString(), status: "offline" })
            .eq("id", project.id);
        } else {
          const downDurationMs = now.getTime() - downSince.getTime();
          const lastAlertSent = project.last_alert_sent ? new Date(project.last_alert_sent) : null;
          const timeSinceLastAlert = lastAlertSent ? now.getTime() - lastAlertSent.getTime() : Infinity;

          // Alert if down for 2+ minutes and haven't alerted in last 30 min
          if (downDurationMs >= twoMinutesMs && timeSinceLastAlert >= alertCooldownMs) {
            const downMinutes = Math.floor(downDurationMs / 60000);

            await sendWhatsApp(
              `🚨 *Pulse Futuro* — SITE FORA DO AR!\n\n🌐 *${project.project_name}*\n🔗 ${url}\n⏱️ Fora do ar há ${downMinutes} minuto(s)\n⏰ ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
            );

            await supabase
              .from("projects")
              .update({ last_alert_sent: now.toISOString() })
              .eq("id", project.id);
          }
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, checked: projects.length }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("site-monitor error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
