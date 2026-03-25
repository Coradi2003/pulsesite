import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) return;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_APIKEY}`;
  await fetch(url).catch(console.error);
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch projects
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, project_name, vercel_url, custom_domain, status, down_since, last_alert_sent");

    if (error) throw error;
    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify({ ok: true, results: {} }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const results: Record<string, string> = {};
    const now = new Date();

    for (const project of projects) {
      const url = project.custom_domain
        ? `https://${project.custom_domain.replace(/^https?:\/\//, "")}`
        : project.vercel_url;

      if (!url) {
        results[project.id] = "offline";
        continue;
      }

      let isUp = false;
      try {
        const res = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(5000),
        });
        isUp = res.status < 500;
        results[project.id] = isUp ? "online" : "offline";
      } catch {
        isUp = false;
        results[project.id] = "offline";
      }

      // Update last_ping for EVERY check to show it's active
      await supabase.from("projects").update({ 
        last_ping: now.toISOString() 
      }).eq("id", project.id);

      // Sync with DB if status changed or site is down
      if (isUp && project.down_since) {
        await supabase
          .from("projects")
          .update({ down_since: null, last_alert_sent: null, status: "online" })
          .eq("id", project.id);
        
        await sendWhatsApp(`✅ *Pulse Futuro* — Site de volta: *${project.project_name}*`);
      } else if (!isUp && !project.down_since) {
        await supabase
          .from("projects")
          .update({ down_since: now.toISOString(), status: "offline" })
          .eq("id", project.id);
      } else if (isUp && project.status !== "online") {
        await supabase.from("projects").update({ status: "online" }).eq("id", project.id);
      }
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500 
    });
  }
});
