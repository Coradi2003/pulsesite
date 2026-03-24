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
      await new Promise((r) => setTimeout(r, 300));
      setData([...mockFinance]);
      setLoading(false);
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
      setData((prev) => [{ ...values, id: nanoid() }, ...prev]);
      return { error: null };
    }
    const { error } = await supabase.from("finance").insert(values);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const update = useCallback(async (id: string, values: Partial<Finance>) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.map((f) => (f.id === id ? { ...f, ...values } : f)));
      return { error: null };
    }
    const { error } = await supabase.from("finance").update(values).eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const remove = useCallback(async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.filter((f) => f.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from("finance").delete().eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  return { data, loading, error, create, update, remove, reload: load };
}
