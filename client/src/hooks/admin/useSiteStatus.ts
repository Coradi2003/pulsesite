import { useState, useEffect, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { type Project } from "@/lib/mockData";

type StatusMap = Record<string, "online" | "offline" | "checking">;

// Generic type for anything we monitor
interface MonitoredAsset {
  id: string;
  status: string;
  project_name?: string;
  domain?: string;
}

export function useSiteStatus(assets: MonitoredAsset[], intervalMs = 30000) {
  const [statusMap, setStatusMap] = useState<StatusMap>({});
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async () => {
    if (assets.length === 0 || !isSupabaseConfigured || !supabase) return;

    // Mark as checking
    const checkingMap: StatusMap = { ...statusMap };
    assets.forEach(p => { checkingMap[p.id] = "checking"; });
    setStatusMap(checkingMap);

    try {
      const { data, error } = await supabase.functions.invoke("site-monitor", {
        method: "POST"
      });

      if (!error && data?.results) {
        setStatusMap(data.results);
      } else {
        const fallback: StatusMap = {};
        assets.forEach(p => { fallback[p.id] = (p.status as "online" | "offline") || "online"; });
        setStatusMap(fallback);
      }
    } catch (err) {
      console.error("Ping error:", err);
    }
    
    setLastChecked(new Date());
  }, [assets, statusMap]);

  useEffect(() => {
    // Initial sync from DB data
    const initial: StatusMap = {};
    assets.forEach((p) => {
      initial[p.id] = (p.status as "online" | "offline") || "online";
    });
    setStatusMap(initial);
  }, [assets]);

  return { statusMap, lastChecked, checkNow: check };
}
