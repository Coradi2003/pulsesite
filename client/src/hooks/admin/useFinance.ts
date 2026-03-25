import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockFinance, type Finance } from "@/lib/mockData";
import { nanoid } from "nanoid";

export function useFinance() {
  const [data, setData] = useState<Finance[]>([]);
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
    const { data: rows, error: err } = await supabase.from("finance").select("*").order("due_date", { ascending: false });
    if (err) setError(err.message);
    else setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (values: Omit<Finance, "id">) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: "Supabase não configurado." };
    }
    const { error } = await supabase.from("finance").insert(values);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const update = useCallback(async (id: string, values: Partial<Finance>) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: "Supabase não configurado." };
    }
    const { error } = await supabase.from("finance").update(values).eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const remove = useCallback(async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: "Supabase não configurado." };
    }
    const { error } = await supabase.from("finance").delete().eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  return { data, loading, error, create, update, remove, reload: load };
}
