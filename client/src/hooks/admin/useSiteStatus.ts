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
  response_time?: number | null;
  project_name?: string;
  domain?: string;
}

export function useSiteStatus(assets: MonitoredAsset[], intervalMs = 30000) {
  const [pingMap, setPingMap] = useState<PingMap>({});
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [checking, setChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Stable refs to avoid stale closures and infinite re-render loops
  const assetsRef = useRef<MonitoredAsset[]>(assets);
  const seededIdsRef = useRef<string>("");

  // Sync latest assets into ref without triggering effects
  useEffect(() => {
    assetsRef.current = assets;
  });

  // ── Seed pingMap from DB data ONLY when asset IDs actually change ──────────
  useEffect(() => {
    const ids = assets.map(a => a.id).sort().join(",");
    if (ids === seededIdsRef.current) return; // same IDs, no re-seed
    seededIdsRef.current = ids;

    if (assets.length === 0) return;

    const initial: PingMap = {};
    assets.forEach((a) => {
      initial[a.id] = {
        status: (a.status as "online" | "offline") === "offline" ? "offline" : "online",
        responseTime: typeof a.response_time === "number" ? a.response_time : null,
      };
    });
    console.log("[PING] Seeded from DB:", assets.length, "sites. First:", assets[0]?.id, initial[assets[0]?.id]);
    setPingMap(initial);
  }, [assets]);

  // ── Main ping function ─────────────────────────────────────────────────────
  const check = useCallback(async () => {
    const currentAssets = assetsRef.current;
    if (currentAssets.length === 0 || !isSupabaseConfigured) {
      console.warn("[PING] check() skipped: assets=", currentAssets.length, "configured=", isSupabaseConfigured);
      return;
    }

    // Mark all as "checking" (preserve last responseTime)
    setPingMap((prev) => {
      const next = { ...prev };
      currentAssets.forEach((a) => {
        next[a.id] = { status: "checking", responseTime: prev[a.id]?.responseTime ?? null };
      });
      return next;
    });
    setChecking(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

      console.log("[PING] Calling edge function for", currentAssets.length, "assets");

      const response = await fetch(`${supabaseUrl}/functions/v1/site-monitor`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(60000),
      });

      console.log("[PING] HTTP status:", response.status, response.ok);

      if (!response.ok) {
        const text = await response.text();
        console.error("[PING] Edge function error:", text);
        setChecking(false);
        return;
      }

      const data = await response.json();
      console.log("[PING] Raw response:", JSON.stringify(data).substring(0, 500));

      if (data?.results) {
        const resultKeys = Object.keys(data.results);
        const assetIds = currentAssets.map(a => a.id);

        // Diagnose ID matching
        const matched = assetIds.filter(id => resultKeys.includes(id));
        const unmatched = assetIds.filter(id => !resultKeys.includes(id));
        console.log("[PING] Matched", matched.length, "of", assetIds.length, "IDs");
        if (unmatched.length > 0) {
          console.warn("[PING] Unmatched asset IDs:", unmatched);
          console.warn("[PING] Result keys sample:", resultKeys.slice(0, 3));
        }

        // Log first result entry for format check
        if (resultKeys.length > 0) {
          const sample = data.results[resultKeys[0]];
          console.log("[PING] Sample result entry:", resultKeys[0], "=>", JSON.stringify(sample));
        }

        const next: PingMap = {};
        for (const id of resultKeys) {
          const r = data.results[id];
          if (typeof r === "string") {
            // Old format: "online" | "offline"
            next[id] = { status: r as "online" | "offline", responseTime: null };
          } else {
            // New format: { status, responseTime }
            next[id] = {
              status: r.status ?? "offline",
              responseTime: typeof r.responseTime === "number" ? r.responseTime : null,
            };
          }
        }

        // Fill in any assets NOT returned by edge function with last known state
        currentAssets.forEach(a => {
          if (!next[a.id]) {
            next[a.id] = { status: (a.status as any) || "online", responseTime: null };
          }
        });

        console.log("[PING] Final pingMap sample:", Object.entries(next).slice(0, 2));
        setPingMap(next);
      } else {
        console.warn("[PING] No results in response:", data);
      }
    } catch (err) {
      console.error("[PING] Exception:", err);
    }

    setLastChecked(new Date());
    setChecking(false);
  }, []); // ← empty deps: uses assetsRef.current inside to avoid stale closure

  // ── Auto-refresh interval ─────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(check, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [check, intervalMs]);

  // Legacy compat
  const statusMap: Record<string, "online" | "offline" | "checking"> = {};
  for (const id of Object.keys(pingMap)) {
    statusMap[id] = pingMap[id].status;
  }

  return { pingMap, statusMap, lastChecked, checking, checkNow: check };
}
