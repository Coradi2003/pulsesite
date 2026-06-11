import { useState, useEffect, useCallback } from "react";
import {
  fetchVercelProjects,
  fetchProjectDeployments,
  fetchVercelUser,
  isVercelConfigured,
  type VercelProject,
  type VercelDeployment,
} from "@/lib/vercel";

// ─── Hook: all Vercel projects + user info ──────────────────────────────────
export function useVercel() {
  const [projects, setProjects] = useState<VercelProject[]>([]);
  const [user, setUser] = useState<{ name: string; username: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isVercelConfigured) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const [p, u] = await Promise.all([fetchVercelProjects(), fetchVercelUser()]);
      setProjects(p);
      setUser(u);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, user, loading, error, configured: isVercelConfigured, refetch: load };
}

// ─── Hook: deployments for a specific project ───────────────────────────────
export function useVercelDeployments(projectId: string | null, limit = 5) {
  const [deployments, setDeployments] = useState<VercelDeployment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!projectId || !isVercelConfigured) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjectDeployments(projectId, limit);
      setDeployments(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [projectId, limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { deployments, loading, error, refetch: load };
}
