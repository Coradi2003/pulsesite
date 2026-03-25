import { useState, useEffect, useCallback, useRef } from "react";
import { type Project } from "@/lib/mockData";

type StatusMap = Record<string, "online" | "offline" | "checking">;

// In mock mode, simulate statuses based on the project data
export function useSiteStatus(projects: Project[], intervalMs = 30000) {
  const [statusMap, setStatusMap] = useState<StatusMap>({});
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async () => {
    if (projects.length === 0) return;

    // In this "Real" version, we simply use the project's current status 
    // which is updated by the server-side site-monitor Edge Function.
    // For a truly "live" feel, we could re-validate here via proxy,
    // but the randomized logic must go.

    const next: StatusMap = {};
    projects.forEach((p) => {
      // Use the database status (online/offline)
      next[p.id] = (p.status as "online" | "offline") || "online";
    });
    
    setStatusMap(next);
    setLastChecked(new Date());
  }, [projects]);

  useEffect(() => {
    // Immediate sync when projects change
    const next: StatusMap = {};
    projects.forEach((p) => {
      next[p.id] = (p.status as "online" | "offline") || "online";
    });
    setStatusMap(next);
    setLastChecked(new Date());
  }, [projects]);

  return { statusMap, lastChecked, checkNow: check };
}
