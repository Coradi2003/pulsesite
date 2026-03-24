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

    // Mark all as checking
    setStatusMap((prev) => {
      const next: StatusMap = { ...prev };
      projects.forEach((p) => { next[p.id] = "checking"; });
      return next;
    });

    // Simulate check: in a real scenario we'd use a backend proxy to avoid CORS
    // For now, use the project's existing status + small random variation
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const next: StatusMap = {};
    projects.forEach((p) => {
      // 90% chance online projects stay online, 10% chance toggle (simulates real-world)
      if (p.status === "online") {
        next[p.id] = Math.random() > 0.05 ? "online" : "offline";
      } else {
        next[p.id] = Math.random() > 0.85 ? "online" : "offline";
      }
    });
    setStatusMap(next);
    setLastChecked(new Date());
  }, [projects]);

  useEffect(() => {
    check();
    timerRef.current = setInterval(check, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [check, intervalMs]);

  return { statusMap, lastChecked, checkNow: check };
}
