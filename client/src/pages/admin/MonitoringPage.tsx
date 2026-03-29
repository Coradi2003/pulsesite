import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Loader2,
  Zap,
  Clock,
  Globe,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { useProjects } from "@/hooks/admin/useProjects";
import { useClients } from "@/hooks/admin/useClients";
import { useVercel } from "@/hooks/admin/useVercel";
import { useSiteStatus, type PingResult } from "@/hooks/admin/useSiteStatus";
import { deployStateBadge, formatDeployAge } from "@/lib/vercel";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

/** Color-coded response time badge */
function PingBadge({ ping }: { ping: PingResult | undefined }) {
  if (!ping || ping.status === "checking") {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 text-[10px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse" />
        Pingando…
      </span>
    );
  }
  // Explicitly offline
  if (ping.status === "offline") {
    return (
      <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
        <span className="w-1 h-1 rounded-full bg-red-500" />
        Offline
      </span>
    );
  }
  // Online but no response time yet
  if (ping.responseTime === null) {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 text-[10px] font-mono">
        <span className="w-1 h-1 rounded-full bg-emerald-600" />— ms
      </span>
    );
  }
  const ms = ping.responseTime;
  const color =
    ms < 200
      ? {
          dot: "bg-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-400",
        }
      : ms <= 500
        ? {
            dot: "bg-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            text: "text-yellow-400",
          }
        : {
            dot: "bg-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            text: "text-red-400",
          };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-full ${color.bg} border ${color.border} ${color.text} text-[10px] font-bold font-mono`}
    >
      <span className={`w-1 h-1 rounded-full ${color.dot}`} />
      {ms} ms
    </span>
  );
}

export default function MonitoringPage() {
  const {
    data: projects,
    loading: pl,
    syncWithVercel,
    reload: reloadProjects,
  } = useProjects();
  const { data: clients } = useClients();
  const {
    projects: vercelProjects,
    loading: vl,
    refetch: refetchVercel,
    configured,
  } = useVercel();
  const [refreshing, setRefreshing] = useState(false);

  // Real ping system for all projects
  const { pingMap, statusMap, lastChecked, checkNow } = useSiteStatus(
    projects as any,
    86400000
  );

  // Version: 2.0.0 - Real ping + responseTime
  const isRealData = isSupabaseConfigured;

  // Automatic Sync logic
  useEffect(() => {
    if (!vl && vercelProjects.length > 0 && projects.length === 0) {
      syncWithVercel(vercelProjects);
    }
  }, [vl, vercelProjects, projects.length, syncWithVercel]);

  const clientMap = Object.fromEntries(clients.map(c => [c.id, c.name]));

  // Map Supabase project to Vercel status
  const getVercelStatus = (pName: string | null) => {
    if (!pName) return null;
    const vp = vercelProjects.find(v => v.name === pName);
    if (!vp) return null;
    const latest = vp.latestDeployments?.[0];
    return {
      state: latest?.readyState || latest?.state,
      updatedAt: vp.updatedAt,
      url: latest?.url,
    };
  };

  const onlineCount = projects.filter(p => {
    const live = statusMap[p.id];
    return live ? live === "online" : p.status === "online";
  }).length;
  const offlineCount = projects.length - onlineCount;

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchVercel(), checkNow()]);
    await reloadProjects();
    setRefreshing(false);
  };

  return (
    <AdminLayout>
      <div id="admin-monitoring">
        <PageHeader
          title="Monitoramento"
          description={
            isRealData
              ? "📡 Dados em tempo real (Supabase + Vercel)"
              : "⚠️ Exibindo dados de demonstração"
          }
        />

        {/* Status Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "px-3 py-1.5 rounded-lg border flex items-center gap-2",
                isRealData
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
              )}
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isRealData ? "Tudo Real" : "Modo Demo"}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">{onlineCount} Online</span>
              </div>
              {offlineCount > 0 && (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span className="font-semibold">{offlineCount} Offline</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastChecked && (
              <span className="text-gray-600 text-xs">
                Último ping:{" "}
                {Math.round((Date.now() - lastChecked.getTime()) / 1000)}s atrás
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing || pl || vl}
              className="flex items-center gap-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border border-purple-500/20 disabled:opacity-50"
            >
              <RefreshCw
                className={cn("w-3.5 h-3.5", refreshing && "animate-spin")}
              />
              {refreshing ? "Pingando…" : "Pingar Agora"}
            </button>
          </div>
        </div>

        {/* Grid of monitoring cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(pl || vl) && projects.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl p-5 animate-pulse h-40"
              />
            ))
          ) : projects.length === 0 ? (
            <div className="col-span-full py-20 bg-[#0d0a1a]/40 border border-dashed border-purple-900/30 rounded-2xl flex flex-col items-center justify-center text-center">
              <Globe className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-white font-medium mb-1">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                Seus projetos da Vercel ainda não foram importados para o
                sistema de monitoramento.
              </p>
              <button
                onClick={handleRefresh}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-900/40"
              >
                Sincronizar com Vercel Agora
              </button>
            </div>
          ) : (
            projects.map((p, i) => {
              const v = getVercelStatus(p.vercel_project_name);
              const ping = pingMap[p.id];
              const isPingOnline = ping
                ? ping.status === "online"
                : p.status === "online";
              const vercelStatus = v?.state
                ? deployStateBadge(v.state as any)
                : null;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "bg-[#0d0a1a]/80 border rounded-xl p-5 transition-all group relative overflow-hidden",
                    isPingOnline
                      ? "border-emerald-500/20"
                      : "border-red-500/30 bg-red-500/5 shadow-lg shadow-red-900/10"
                  )}
                >
                  {/* Real-time Indicator Tag */}
                  <div
                    className={cn(
                      "absolute top-0 right-0 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-bl-lg",
                      isPingOnline
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {isPingOnline ? "Live Ping: OK" : "Live Ping: DOWN"}
                  </div>

                  <div className="flex items-start justify-between mb-3 mt-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate group-hover:text-purple-400 transition-colors">
                        {p.project_name}
                      </h3>
                      <p className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">
                        {clientMap[p.client_id] || "Project"}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-lg",
                        ping?.status === "checking"
                          ? "bg-yellow-400 shadow-yellow-400/40 animate-pulse"
                          : isPingOnline
                            ? "bg-emerald-400 shadow-emerald-400/40"
                            : "bg-red-500 shadow-red-400/40 animate-pulse"
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <a
                      href={p.vercel_url || `https://${v?.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors text-xs truncate"
                    >
                      <Globe className="w-3 h-3 flex-shrink-0" />
                      {p.custom_domain || p.vercel_url || "Sem URL"}
                    </a>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {vercelStatus && (
                          <span
                            className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                              vercelStatus.color === "emerald"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : vercelStatus.color === "red"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-blue-500/10 text-blue-500"
                            )}
                          >
                            Vercel: {vercelStatus.label}
                          </span>
                        )}
                      </div>
                      {/* Response time badge */}
                      <PingBadge ping={ping} />
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Sync Info */}
        <div className="mt-8 px-5 py-4 bg-purple-500/5 border border-purple-500/15 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-purple-400 text-xs font-bold mb-1 tracking-wide uppercase">
              ⚡ Como funciona o Monitoramento Real?
            </p>
            <p className="text-gray-500 text-xs">
              Nosso sistema faz um ping real em cada site a cada 30 segundos. O
              tempo de resposta é medido em ms e exibido em tempo real. Você
              recebe alerta no WhatsApp caso algum site fique offline.
            </p>
          </div>
          <Zap className="w-5 h-5 text-purple-900/50 ml-4 flex-shrink-0" />
        </div>
      </div>
    </AdminLayout>
  );
}
