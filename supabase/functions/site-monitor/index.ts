import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) return;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_APIKEY}`;
  await fetch(url).catch(console.error);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: projects, error } = await supabase.from("projects").select("*");
    if (error) throw error;
    if (!projects) return new Response(JSON.stringify({ ok: true, results: {} }), { headers: corsHeaders });

    const now = new Date();
    const results: Record<string, string> = {};
    const projectUpdates: any[] = [];

    // Parallel ping all sites
    await Promise.all(projects.map(async (project) => {
      const url = project.custom_domain
        ? `https://${project.custom_domain.replace(/^https?:\/\//, "")}`
        : project.vercel_url;

      if (!url) {
        results[project.id] = "offline";
        return;
      }

      let isUp = false;
      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        isUp = res.status < 500;
      } catch {
        isUp = false;
      }

      const status = isUp ? "online" : "offline";
      results[project.id] = status;

      // Prepare update object
      const update: any = {
        id: project.id,
        status: status,
        last_ping: now.toISOString(),
      };

      // WhatsApp logic
      if (isUp && project.down_since) {
        update.down_since = null;
        update.last_alert_sent = null;
        await sendWhatsApp(`✅ *Pulse Futuro* — Site de volta: *${project.project_name}*`);
      } else if (!isUp && !project.down_since) {
        update.down_since = now.toISOString();
      }

      projectUpdates.push(update);
    }));

    // Bulk update database
    if (projectUpdates.length > 0) {
      const { error: upsertError } = await supabase
        .from("projects")
        .upsert(projectUpdates);
      
      if (upsertError) console.error("Upsert Error:", upsertError);
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { headers: corsHeaders, status: 500 });
  }
});
