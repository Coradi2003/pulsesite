import { motion } from "framer-motion";
import { RefreshCw, ExternalLink, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { useProjects } from "@/hooks/admin/useProjects";
import { useClients } from "@/hooks/admin/useClients";
import { useSiteStatus } from "@/hooks/admin/useSiteStatus";
import { cn } from "@/lib/utils";

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h`;
}

export default function MonitoringPage() {
  const { data: projects, loading: pl } = useProjects();
  const { data: clients } = useClients();
  const { statusMap, lastChecked, checkNow } = useSiteStatus(projects, 30000);

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));
  const onlineCount = projects.filter((p) => (statusMap[p.id] ?? p.status) === "online").length;
  const offlineCount = projects.length - onlineCount;
  const checkingCount = Object.values(statusMap).filter((s) => s === "checking").length;

  return (
    <AdminLayout>
      <div id="admin-monitoring">
        <PageHeader title="Monitoramento" description="Status em tempo real de todos os projetos" />

        {/* Summary bar */}
        <div className="flex items-center gap-6 mb-6 px-5 py-3 bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">{onlineCount} Online</span>
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{offlineCount} Offline</span>
          </div>
          {checkingCount > 0 && (
            <div className="flex items-center gap-2 text-purple-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Verificando…</span>
            </div>
          )}
          <div className="ml-auto flex items-center gap-3">
            {lastChecked && (
              <span className="text-gray-500 text-xs">
                Atualizado {timeAgo(lastChecked.toISOString())} atrás
              </span>
            )}
            <button
              onClick={checkNow}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Verificar agora
            </button>
          </div>
        </div>

        {/* Grid of monitoring cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pl
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl p-5 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-32 mb-3" />
                  <div className="h-3 bg-white/5 rounded w-24" />
                </div>
              ))
            : projects.map((p, i) => {
                const live = statusMap[p.id];
                const status = live === "checking" ? undefined : live ?? p.status;
                const isOnline = status === "online";
                const isChecking = live === "checking";

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "bg-[#0d0a1a]/80 border rounded-xl p-5 transition-all",
                      isChecking
                        ? "border-purple-500/30"
                        : isOnline
                        ? "border-emerald-500/25 shadow-sm shadow-emerald-900/20"
                        : "border-red-500/25 shadow-sm shadow-red-900/20"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate">{p.project_name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">{clientMap[p.client_id] ?? "—"}</p>
                      </div>

                      {isChecking ? (
                        <div className="w-7 h-7 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        </div>
                      ) : (
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                          isOnline ? "bg-emerald-400 shadow-md shadow-emerald-400/40" : "bg-red-400 shadow-md shadow-red-400/40",
                          isOnline && "animate-pulse"
                        )} />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <a
                        href={p.vercel_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors text-xs truncate"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {p.custom_domain || p.vercel_url}
                      </a>
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-xs font-semibold",
                          isChecking ? "text-purple-400" : isOnline ? "text-emerald-400" : "text-red-400"
                        )}>
                          {isChecking ? "Verificando…" : isOnline ? "Online" : "Offline"}
                        </span>
                        <span className="text-gray-600 text-xs">ping {timeAgo(p.last_ping)} atrás</span>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isChecking ? "bg-purple-500 w-1/2 animate-pulse" :
                        isOnline ? "bg-emerald-500 w-full" : "bg-red-500 w-0"
                      )} />
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Future integrations note */}
        <div className="mt-6 px-5 py-4 bg-purple-500/5 border border-purple-500/15 rounded-xl">
          <p className="text-purple-400 text-xs font-medium mb-1">🔮 Integrações futuras planejadas</p>
          <p className="text-gray-500 text-xs">
            Alertas via WhatsApp · Notificações push · Integração com Vercel API · Histórico de uptime
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
