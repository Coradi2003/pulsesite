import { useState, useEffect, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { type Project } from "@/lib/mockData";

type StatusMap = Record<string, "online" | "offline" | "checking">;

// In mock mode, simulate statuses based on the project data
export function useSiteStatus(projects: Project[], intervalMs = 30000) {
  const [statusMap, setStatusMap] = useState<StatusMap>({});
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async () => {
    if (projects.length === 0 || !isSupabaseConfigured || !supabase) return;

    // Mark as checking
    const checkingMap: StatusMap = {};
    projects.forEach(p => { checkingMap[p.id] = "checking"; });
    setStatusMap(checkingMap);

    try {
      // Call the Edge Function for real-time ping
      const { data, error } = await supabase.functions.invoke("site-monitor", {
        method: "POST"
      });

      if (!error && data?.results) {
        setStatusMap(data.results);
      } else {
        // Fallback to current project status if error
        const fallback: StatusMap = {};
        projects.forEach(p => { fallback[p.id] = (p.status as "online" | "offline") || "online"; });
        setStatusMap(fallback);
      }
    } catch (err) {
      console.error("Ping error:", err);
    }
    
    setLastChecked(new Date());
  }, [projects]);

  useEffect(() => {
    // Initial sync from DB data
    const initial: StatusMap = {};
    projects.forEach((p) => {
      initial[p.id] = (p.status as "online" | "offline") || "online";
    });
    setStatusMap(initial);
  }, [projects]);

  return { statusMap, lastChecked, checkNow: check };
}
