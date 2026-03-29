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
      setLoading(false);
      setError("Supabase não configurado. Verifique o arquivo .env");
      setData([]);
      return;
    }
    const { data: rows, error: err } = await supabase
      .from("projects")
      .select("*")
      .order("project_name");
    if (err) setError(err.message);
    else setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (values: Omit<Project, "id">) => {
      if (!isSupabaseConfigured || !supabase) {
        return {
          error:
            "Supabase não configurado. Não é possível criar no modo demonstração.",
        };
      }
      const { error } = await supabase.from("projects").insert(values);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  const update = useCallback(
    async (id: string, values: Partial<Project>) => {
      if (!isSupabaseConfigured || !supabase) {
        return { error: "Supabase não configurado." };
      }
      const { error } = await supabase
        .from("projects")
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
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  const syncWithVercel = useCallback(
    async (vercelProjects: any[]) => {
      if (!isSupabaseConfigured || !supabase) return;

      // 1. Get current projects to avoid dups
      const { data: current } = await supabase
        .from("projects")
        .select("vercel_project_name, custom_domain");
      const existingNames = new Set(
        current?.map(p => p.vercel_project_name) || []
      );
      const existingDomains = new Set(current?.map(p => p.custom_domain) || []);

      // 2. Identify new projects (those with domains but not in Supabase)
      const toImport = vercelProjects.filter(vp => {
        const hasDomain =
          vp.targets?.production?.alias?.[0] || vp.link?.projectUrl;
        return (
          hasDomain &&
          !existingNames.has(vp.name) &&
          !existingDomains.has(vp.targets?.production?.alias?.[0])
        );
      });

      if (toImport.length === 0) return;

      // 3. Get a default client
      const { data: clients } = await supabase
        .from("clients")
        .select("id")
        .limit(1);
      let clientId = clients?.[0]?.id;

      if (!clientId) {
        const { data: newClient } = await supabase
          .from("clients")
          .insert({
            name: "Pulse Futuro (Geral)",
            status: "active",
          })
          .select()
          .single();
        clientId = newClient?.id;
      }

      // 4. Insert new projects
      const newRows = toImport.map(vp => ({
        client_id: clientId,
        project_name: vp.name,
        status: "online",
        vercel_url: `https://${vp.name}.vercel.app`,
        custom_domain: vp.targets?.production?.alias?.[0] || null,
        vercel_project_name: vp.name,
        last_ping: new Date().toISOString(),
      }));

      await supabase.from("projects").insert(newRows);
      await load();
    },
    [load]
  );

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    reload: load,
    syncWithVercel,
  };
}
