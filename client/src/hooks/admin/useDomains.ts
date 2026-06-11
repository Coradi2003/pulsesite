import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockDomains, type Domain } from "@/lib/mockData";
import { nanoid } from "nanoid";

export function useDomains() {
  const [data, setData] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured || !supabase) {
      await new Promise((r) => setTimeout(r, 300));
      setData([...mockDomains]);
      setLoading(false);
      return;
    }
    const { data: rows, error: err } = await supabase.from("domains").select("*").order("expiration_date");
    if (err) setError(err.message);
    else setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (values: Omit<Domain, "id">) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => [...prev, { ...values, id: nanoid() }]);
      return { error: null };
    }
    const { error } = await supabase.from("domains").insert(values);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const update = useCallback(async (id: string, values: Partial<Domain>) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.map((d) => (d.id === id ? { ...d, ...values } : d)));
      return { error: null };
    }
    const { error } = await supabase.from("domains").update(values).eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const remove = useCallback(async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.filter((d) => d.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from("domains").delete().eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  return { data, loading, error, create, update, remove, reload: load };
}
