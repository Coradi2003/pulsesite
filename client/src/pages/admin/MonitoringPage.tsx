import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ExternalLink, CheckCircle2, XCircle, Loader2, Zap, Clock, Globe } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { useProjects } from "@/hooks/admin/useProjects";
import { useClients } from "@/hooks/admin/useClients";
import { useVercel } from "@/hooks/admin/useVercel";
import { deployStateBadge, formatDeployAge } from "@/lib/vercel";
import { cn } from "@/lib/utils";

export default function MonitoringPage() {
  const { data: projects, loading: pl, syncWithVercel, reload: reloadProjects } = useProjects();
  const { data: clients } = useClients();
  const { projects: vercelProjects, loading: vl, refetch: refetchVercel, configured } = useVercel();

  // Automatic Sync logic
  useEffect(() => {
    if (!vl && vercelProjects.length > 0) {
      syncWithVercel(vercelProjects);
    }
  }, [vl, vercelProjects, syncWithVercel]);

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));
  
  // Map Supabase project to Vercel status
  const getVercelStatus = (pName: string | null) => {
    if (!pName) return null;
    const vp = vercelProjects.find(v => v.name === pName);
    if (!vp) return null;
    const latest = vp.latestDeployments?.[0];
    return {
      state: latest?.readyState || latest?.state,
      updatedAt: vp.updatedAt,
      url: latest?.url
    };
  };

  const onlineCount = projects.filter(p => {
    const v = getVercelStatus(p.vercel_project_name);
    return v?.state === "READY";
  }).length;
  const errorCount = projects.filter(p => {
    const v = getVercelStatus(p.vercel_project_name);
    return v?.state === "ERROR";
  }).length;
  const buildingCount = projects.filter(p => {
    const v = getVercelStatus(p.vercel_project_name);
    return ["BUILDING", "INITIALIZING"].includes(v?.state ?? "");
  }).length;

  if (!configured) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Zap className="w-10 h-10 text-gray-600 mb-4" />
          <h2 className="text-white font-semibold mb-2">Vercel não configurado</h2>
          <p className="text-gray-500 text-sm">Adicione <code className="text-purple-400">VITE_VERCEL_TOKEN</code> ao seu <code className="text-purple-400">.env</code></p>
        </div>
      </AdminLayout>
    );
  }

  const handleRefresh = async () => {
    await refetchVercel();
    await reloadProjects();
  };

  return (
    <AdminLayout>
      <div id="admin-monitoring">
        <PageHeader title="Monitoramento" description="Status integrado: Vercel + Gestão de Projetos" />

        {/* Summary bar */}
        <div className="flex flex-wrap items-center gap-6 mb-6 px-5 py-3 bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">{onlineCount} Online</span>
          </div>
          {errorCount > 0 && (
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">{errorCount} Erro</span>
            </div>
          )}
          {buildingCount > 0 && (
            <div className="flex items-center gap-2 text-blue-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Buildando ({buildingCount})</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Globe className="w-3 h-3" />
            {projects.length} Sites Ativos
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", (pl || vl) && "animate-spin")} />
              Sincronizar Tudo
            </button>
          </div>
        </div>

        {/* User Info & Error */}
        {/* Removed error display as useVercel error is not directly used here */}

        {/* Grid of monitoring cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(pl || vl) && projects.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl p-5 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-32 mb-3" />
                  <div className="h-3 bg-white/5 rounded w-24" />
                </div>
              ))
            : projects.map((p, i) => {
                const v = getVercelStatus(p.vercel_project_name);
                const statusInfo = v?.state ? deployStateBadge(v.state as any) : { label: "Offline", color: "gray" };
                const isOnline = v?.state === "READY";
                const isBuilding = ["BUILDING", "INITIALIZING"].includes(v?.state ?? "");

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "bg-[#0d0a1a]/80 border rounded-xl p-5 transition-all group",
                      isBuilding
                        ? "border-blue-500/30 shadow-sm shadow-blue-900/20"
                        : isOnline
                        ? "border-emerald-500/20"
                        : v?.state === "ERROR"
                        ? "border-red-500/25 shadow-sm shadow-red-900/20"
                        : "border-purple-900/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate group-hover:text-purple-400 transition-colors">
                          {p.project_name}
                        </h3>
                        <p className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">
                          {clientMap[p.client_id] || "Pulse Futuro"}
                        </p>
                      </div>

                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-lg",
                        statusInfo.color === "emerald" ? "bg-emerald-400 shadow-emerald-400/40" :
                        statusInfo.color === "red" ? "bg-red-400 shadow-red-400/40" :
                        statusInfo.color === "blue" ? "bg-blue-400 shadow-blue-400/40 animate-pulse" :
                        "bg-gray-600 shadow-gray-600/40"
                      )} />
                    </div>

                    <div className="space-y-2">
                      <a
                        href={p.vercel_url || `https://${v?.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors text-xs truncate"
                      >
                        <Globe className="w-3 h-3 flex-shrink-0" />
                        {p.custom_domain || p.vercel_url || "Sem URL"}
                      </a>
                      
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          statusInfo.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
                          statusInfo.color === "red" ? "bg-red-500/10 text-red-400" :
                          statusInfo.color === "blue" ? "bg-blue-500/10 text-blue-400" :
                          "bg-white/5 text-gray-500"
                        )}>
                          {statusInfo.label}
                        </span>
                        <span className="text-gray-600 text-[10px] flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {v?.updatedAt ? formatDeployAge(v.updatedAt) : "—"} atrás
                        </span>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full transition-all duration-700",
                        isBuilding ? "bg-blue-500 w-1/2 animate-pulse" :
                        isOnline ? "bg-emerald-500 w-full" : 
                        v?.state === "ERROR" ? "bg-red-500 w-full" : "bg-gray-800 w-0"
                      )} />
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Sync Info */}
        <div className="mt-6 px-5 py-4 bg-purple-500/5 border border-purple-500/15 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-purple-400 text-xs font-medium mb-1">⚡ Sincronização Inteligente</p>
            <p className="text-gray-500 text-xs">
              Projetos Vercel com domínio personalizado são automaticamente adicionados ao sistema.
            </p>
          </div>
          <Zap className="w-5 h-5 text-purple-900/50" />
        </div>
      </div>
    </AdminLayout>
  );
}
