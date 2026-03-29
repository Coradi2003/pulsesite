// Supabase Edge Function: payment-reminder
// Triggered daily at 9am by pg_cron
// Sends WhatsApp alert for payments due in 5 days

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CALLMEBOT_PHONE = "5541984606633";
const CALLMEBOT_APIKEY = Deno.env.get("CALLMEBOT_APIKEY") ?? "";

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) {
    console.warn("CALLMEBOT_APIKEY not set");
    return;
  }
  const encoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encoded}&apikey=${CALLMEBOT_APIKEY}`;
  const res = await fetch(url);
  console.log("WhatsApp sent:", res.status, await res.text());
}

Deno.serve(async _req => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get date 5 days from now in YYYY-MM-DD
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    const targetStr = targetDate.toISOString().split("T")[0];

    const { data: entries, error } = await supabase
      .from("finance")
      .select("id, description, amount, due_date, client_id, clients(name)")
      .eq("due_date", targetStr)
      .eq("status", "pending");

    if (error) throw error;
    if (!entries || entries.length === 0) {
      return new Response(JSON.stringify({ ok: true, reminders: 0 }), {
        status: 200,
      });
    }

    for (const entry of entries) {
      const clientName = (entry.clients as any)?.name ?? "Cliente";
      const amount = Number(entry.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const dueDate = new Date(entry.due_date + "T12:00:00").toLocaleDateString(
        "pt-BR"
      );

      await sendWhatsApp(
        `📅 *Pulse Futuro* — Vencimento em 5 dias!\n\n👤 *Cliente:* ${clientName}\n📋 *Serviço:* ${entry.description}\n💰 *Valor:* ${amount}\n📆 *Vence em:* ${dueDate}\n\nLembre-se de enviar o boleto/link de pagamento!`
      );
    }

    return new Response(
      JSON.stringify({ ok: true, reminders: entries.length }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    console.error("payment-reminder error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
});
