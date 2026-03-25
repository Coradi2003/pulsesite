import { useState, useEffect, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface PingResult {
  status: "online" | "offline" | "checking";
  responseTime: number | null;
}

type PingMap = Record<string, PingResult>;

interface MonitoredAsset {
  id: string;
  status: string;
  project_name?: string;
  domain?: string;
}

export function useSiteStatus(assets: MonitoredAsset[], intervalMs = 30000) {
  const [pingMap, setPingMap] = useState<PingMap>({});
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [checking, setChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Seed initial state from DB values
  useEffect(() => {
    const initial: PingMap = {};
    assets.forEach((a) => {
      initial[a.id] = {
        status: (a.status as "online" | "offline") || "online",
        responseTime: (a as any).response_time ?? null,
      };
    });
    setPingMap(initial);
  }, [assets]);

  const check = useCallback(async () => {
    if (assets.length === 0 || !isSupabaseConfigured || !supabase) return;

    // Mark all as checking
    setPingMap((prev) => {
      const next = { ...prev };
      assets.forEach((a) => {
        next[a.id] = { status: "checking", responseTime: prev[a.id]?.responseTime ?? null };
      });
      return next;
    });
    setChecking(true);

    try {
      const { data, error } = await supabase.functions.invoke("site-monitor", {
        method: "POST",
      });

      if (!error && data?.results) {
        // data.results is Record<string, { status, responseTime }>
        const next: PingMap = {};
        for (const id of Object.keys(data.results)) {
          const r = data.results[id];
          next[id] = {
            status: r.status ?? "offline",
            responseTime: r.responseTime ?? null,
          };
        }
        setPingMap(next);
      } else {
        // Fallback: keep existing DB values
        setPingMap((prev) => {
          const fallback: PingMap = {};
          assets.forEach((a) => {
            fallback[a.id] = {
              status: (a.status as "online" | "offline") || "online",
              responseTime: prev[a.id]?.responseTime ?? null,
            };
          });
          return fallback;
        });
      }
    } catch (err) {
      console.error("Ping error:", err);
    }

    setLastChecked(new Date());
    setChecking(false);
  }, [assets]);

  // Auto-refresh every intervalMs (default 30s)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(check, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [check, intervalMs]);

  // Legacy compatibility: statusMap as Record<string, string>
  const statusMap: Record<string, "online" | "offline" | "checking"> = {};
  for (const id of Object.keys(pingMap)) {
    statusMap[id] = pingMap[id].status;
  }

  return { pingMap, statusMap, lastChecked, checking, checkNow: check };
}
