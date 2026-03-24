import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockProjects, type Project } from "@/lib/mockData";
import { nanoid } from "nanoid";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured || !supabase) {
      await new Promise((r) => setTimeout(r, 300));
      setData([...mockProjects]);
      setLoading(false);
      return;
    }
    const { data: rows, error: err } = await supabase.from("projects").select("*").order("project_name");
    if (err) setError(err.message);
    else setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (values: Omit<Project, "id">) => {
    if (!isSupabaseConfigured || !supabase) {
      const newP: Project = { ...values, id: nanoid() };
      setData((prev) => [...prev, newP]);
      return { error: null };
    }
    const { error } = await supabase.from("projects").insert(values);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const update = useCallback(async (id: string, values: Partial<Project>) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.map((p) => (p.id === id ? { ...p, ...values } : p)));
      return { error: null };
    }
    const { error } = await supabase.from("projects").update(values).eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  const remove = useCallback(async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      setData((prev) => prev.filter((p) => p.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) await load();
    return { error: error?.message ?? null };
  }, [load]);

  return { data, loading, error, create, update, remove, reload: load };
}
