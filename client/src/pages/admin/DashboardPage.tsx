import { motion } from "framer-motion";
import {
  Users,
  Globe2,
  CheckCircle2,
  XCircle,
  DollarSign,
  Clock,
  ExternalLink,
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
import { useSiteStatus } from "@/hooks/admin/useSiteStatus";
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

export default function DashboardPage() {
  const { data: clients, loading: cl } = useClients();
  const { data: projects, loading: pl } = useProjects();
  const { data: finance, loading: fl } = useFinance();
  const { statusMap, lastChecked, checkNow } = useSiteStatus(projects);

  // Version: 1.0.5 - Real check
  const isRealData = isSupabaseConfigured;

  const onlineCount = projects.filter((p) =>
    statusMap[p.id] ? statusMap[p.id] === "online" : p.status === "online"
  ).length;
  const offlineCount = projects.length - onlineCount;
  const monthlyRevenue = finance
    .filter((f) => f.status === "paid" && f.type === "monthly")
    .reduce((a, b) => a + b.amount, 0);
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
          <StatCard label="Total de Projetos" value={pl ? "…" : projects.length} icon={Globe2} color="blue" />
          <StatCard label="Sites Online" value={pl ? "…" : onlineCount} icon={CheckCircle2} color="green" />
          <StatCard label="Sites Offline" value={pl ? "…" : offlineCount} icon={XCircle} color="red" />
          <StatCard
            label="Receita Mensal"
            value={fl ? "…" : formatBRL(monthlyRevenue)}
            icon={DollarSign}
            color="teal"
          />
          <StatCard label="Pagamentos Pendentes" value={fl ? "…" : pendingPayments} icon={Clock} color="amber" />
        </div>

        {/* Projects table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/10"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/20 bg-white/[0.02]">
            <h3 className="text-white font-semibold text-sm">Resumo de Projetos</h3>
            <div className="flex items-center gap-3">
              {lastChecked && (
                <span className="text-gray-500 text-xs">
                  Check: {timeAgo(lastChecked.toISOString())}
                </span>
              )}
              <button
                onClick={checkNow}
                className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs transition-colors bg-purple-500/10 px-2 py-1 rounded"
              >
                <RefreshCw className="w-3 h-3" />
                Verificar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20 bg-white/[0.01]">
                  {["Projeto", "Cliente", "Domínio", "Status", "Último Ping"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {pl
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={j} className="px-5 py-3.5">
                            <div className="h-3 bg-white/5 rounded animate-pulse w-24" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-gray-500 italic">
                        Nenhum projeto cadastrado no banco de dados.
                      </td>
                    </tr>
                  ) : projects.map((p) => {
                      const liveStatus = statusMap[p.id];
                      const displayStatus =
                        liveStatus === "checking" ? p.status : liveStatus ?? p.status;
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5 text-gray-200 font-medium">{p.project_name}</td>
                          <td className="px-5 py-3.5 text-gray-400">{clientMap[p.client_id] ?? "—"}</td>
                          <td className="px-5 py-3.5">
                            <a
                              href={`https://${p.custom_domain}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                            >
                              {p.custom_domain}
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <StatusBadge status={displayStatus as "online" | "offline"} />
                              {liveStatus === "checking" && (
                                <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 text-xs font-mono">{timeAgo(p.last_ping)}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Diagnostic Footer (Internal Use) */}
        <div className="mt-12 opacity-10 hover:opacity-100 transition-opacity text-[8px] text-gray-700 flex flex-col gap-1 font-mono">
          <p>Debug Info (v1.0.6):</p>
          <p>Supabase Configured: {String(isSupabaseConfigured)}</p>
          <p>URL: {import.meta.env.VITE_SUPABASE_URL ? "Defined (starts with " + import.meta.env.VITE_SUPABASE_URL.substring(0, 10) + "...)" : "UNDEFINED"}</p>
          <p>Projects Count: {projects.length}</p>
          <p>Clients Count: {clients.length}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
