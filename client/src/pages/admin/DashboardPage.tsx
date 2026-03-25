import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe2,
  CheckCircle2,
  XCircle,
  DollarSign,
  Clock,
  RefreshCw,
  Zap,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useClients } from "@/hooks/admin/useClients";
import { useProjects } from "@/hooks/admin/useProjects";
import { useFinance } from "@/hooks/admin/useFinance";
import { useSiteStatus, type PingResult } from "@/hooks/admin/useSiteStatus";
import { useDomains } from "@/hooks/admin/useDomains";
import { isSupabaseConfigured } from "@/lib/supabase";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s atrás`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m atrás`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h atrás`;
}

/** Color-coded response time badge */
function PingBadge({ ping }: { ping: PingResult | undefined }) {
  // No data yet or currently checking
  if (!ping || ping.status === "checking") {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
        Verificando…
      </span>
    );
  }
  // Explicitly offline
  if (ping.status === "offline") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Offline
      </span>
    );
  }
  // Online but no response time yet (e.g. column doesn't exist or first load)
  if (ping.responseTime === null) {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        — ms
      </span>
    );
  }
  // Online with measured response time
  const ms = ping.responseTime;
  const color =
    ms < 200
      ? { dot: "bg-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" }
      : ms <= 500
      ? { dot: "bg-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" }
      : { dot: "bg-red-400", bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${color.bg} border ${color.border} ${color.text} text-xs font-bold font-mono`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
      {ms} ms
    </span>
  );
}

export default function DashboardPage() {
  const { data: clients, loading: cl } = useClients();
  const { data: projects, loading: pl, reload: reloadProjects } = useProjects();
  const { data: domains, loading: dl, reload: reloadDomains } = useDomains();
  const { data: finance, loading: fl } = useFinance();
  const [verifying, setVerifying] = React.useState(false);

  // Unified assets list: Projects + Domains
  const allAssets = [
    ...projects.map(p => ({ ...p, _type: 'project' as const, _name: p.project_name, _url: p.custom_domain || p.vercel_url, _client: p.client_id })),
    ...domains.map(d => ({ ...d, _type: 'domain' as const, _name: d.domain, _url: d.domain, _client: d.client_id }))
  ].sort((a, b) => a._name.localeCompare(b._name));

  // Unified assets list: Now restricted to Domains as requested
  // Projects will remain visible in the Monitoring/Projects pages
  const dashboardAssets = domains.map(d => ({ 
    ...d, 
    _type: 'domain' as const, 
    _name: d.domain, 
    _url: d.domain, 
    _client: d.client_id 
  })).sort((a, b) => a._name.localeCompare(b._name));

  const { statusMap, pingMap, lastChecked, checkNow } = useSiteStatus(dashboardAssets as any);

  const handleVerify = async () => {
    setVerifying(true);
    await checkNow();
    await Promise.all([reloadProjects(), reloadDomains()]);
    setVerifying(false);
  };

  // Version: 1.1.2 - Filtered Dashboard
  const isRealData = isSupabaseConfigured;

  const onlineCount = dashboardAssets.filter((a) =>
    statusMap[a.id] ? statusMap[a.id] === "online" : (a as any).status === "online"
  ).length;
  const offlineCount = dashboardAssets.length - onlineCount;
  
  // Real-time Revenue calculation (Status: paid + Type: monthly)
  const monthlyRevenue = finance
    .filter((f) => f.status === "paid" && f.type === "monthly")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const pendingPayments = finance.filter((f) => f.status === "pending" || f.status === "overdue").length;

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));

  return (
    <AdminLayout>
      <div id="admin-dashboard">
        {/* Environment Status */}
        <div className="mb-6 flex items-center justify-between bg-[#0d0a1a]/40 border border-purple-900/20 p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <div className={cn(
              "px-3 py-1.5 rounded-lg border flex items-center gap-2",
              isRealData ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
            )}>
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isRealData ? "Conexão Real" : "Modo de Demonstração"}
              </span>
            </div>
            <p className="text-gray-500 text-xs">
              {isRealData 
                ? "Conectado ao Supabase. Todos os dados são reais." 
                : "Aguardando conexão ou dados. Exibindo exemplos para visualização."}
            </p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total de Clientes" value={cl ? "…" : clients.length} icon={Users} color="purple" />
          <StatCard label="Domínios Monitorados" value={dl ? "…" : dashboardAssets.length} icon={Globe2} color="blue" />
          <StatCard label="Domínios Online" value={dl ? "…" : onlineCount} icon={CheckCircle2} color="green" />
          <StatCard label="Domínios Offline" value={dl ? "…" : offlineCount} icon={XCircle} color="red" />
          <StatCard
            label="Receita Mensal"
            value={fl ? "…" : formatBRL(monthlyRevenue)}
            icon={DollarSign}
            color="teal"
          />
          <StatCard label="Pagamentos Pendentes" value={fl ? "…" : pendingPayments} icon={Clock} color="amber" />
        </div>

        {/* Domains monitoring table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/10"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/20 bg-white/[0.02]">
            <h3 className="text-white font-semibold text-sm">Monitoramento de Domínios</h3>
            <div className="flex items-center gap-3">
              {lastChecked && (
                <span className="text-gray-500 text-xs">
                  Check: {timeAgo(lastChecked.toISOString())}
                </span>
              )}
              <button
                onClick={handleVerify}
                disabled={verifying || dl}
                className={cn(
                  "flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs transition-colors bg-purple-500/10 px-2 py-1 rounded",
                  (verifying || dl) && "opacity-50 cursor-not-allowed"
                )}
              >
                <RefreshCw className={cn("w-3 h-3", (verifying || dl) && "animate-spin")} />
                {verifying ? "Pingando..." : "Verificar"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20 bg-white/[0.01]">
                  {["Domínio", "Cliente", "Status", "Último Ping"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {dl
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 4 }).map((_, j) => (
                          <td key={j} className="px-5 py-3.5">
                            <div className="h-3 bg-white/5 rounded animate-pulse w-24" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : dashboardAssets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-gray-500 italic">
                        Nenhum domínio cadastrado para monitoramento.
                      </td>
                    </tr>
                  ) : dashboardAssets.map((p) => {
                      const liveStatus = statusMap[p.id];
                      const displayStatus =
                        liveStatus === "checking" ? (p as any).status : liveStatus ?? (p as any).status;
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5 text-gray-200 font-medium">{p._name}</td>
                          <td className="px-5 py-3.5 text-gray-400">{clientMap[p._client] ?? "—"}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <StatusBadge status={displayStatus as "online" | "offline"} />
                              {liveStatus === "checking" && (
                                <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <PingBadge ping={pingMap[p.id]} />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Diagnostic Footer (Internal Use) */}
        <div className="mt-12 opacity-10 hover:opacity-100 transition-opacity text-[8px] text-gray-700 flex flex-col gap-1 font-mono">
          <p>Debug Info (v1.1.2):</p>
          <p>Supabase Configured: {String(isSupabaseConfigured)}</p>
          <p>URL: {import.meta.env.VITE_SUPABASE_URL ? "Defined (starts with " + import.meta.env.VITE_SUPABASE_URL.substring(0, 10) + "...)" : "UNDEFINED"}</p>
          <p>Domains Count: {dashboardAssets.length}</p>
          <p>Revenue Paid: {formatBRL(monthlyRevenue)}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
