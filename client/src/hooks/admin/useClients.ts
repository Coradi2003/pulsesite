import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockClients, type Client, type ClientStatus } from "@/lib/mockData";
import { nanoid } from "nanoid";

export function useClients() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setError("Supabase não configurado.");
      setData([]);
      return;
    }
    const { data: rows, error: err } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (values: Omit<Client, "id" | "created_at">) => {
      if (!isSupabaseConfigured || !supabase) {
        return { error: "Supabase não configurado." };
      }
      const { error } = await supabase.from("clients").insert(values);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  const update = useCallback(
    async (id: string, values: Partial<Client>) => {
      if (!isSupabaseConfigured || !supabase) {
        return { error: "Supabase não configurado." };
      }
      const { error } = await supabase
        .from("clients")
        .update(values)
        .eq("id", id);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!isSupabaseConfigured || !supabase) {
        return { error: "Supabase não configurado." };
      }
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  return { data, loading, error, create, update, remove, reload: load };
}
