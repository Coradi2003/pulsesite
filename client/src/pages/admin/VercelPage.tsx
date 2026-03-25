import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, ExternalLink, GitBranch, Clock, CheckCircle2,
  XCircle, Loader2, Zap, ChevronDown, ChevronUp
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { useVercel, useVercelDeployments } from "@/hooks/admin/useVercel";
import { deployStateBadge, formatDeployAge, type VercelProject } from "@/lib/vercel";
import { cn } from "@/lib/utils";

// ─── Deploy state dot ────────────────────────────────────────────────────────
function StateDot({ state }: { state: string }) {
  const map: Record<string, string> = {
    READY: "bg-emerald-400",
    ERROR: "bg-red-400",
    BUILDING: "bg-blue-400 animate-pulse",
    INITIALIZING: "bg-blue-400 animate-pulse",
    QUEUED: "bg-yellow-400",
    CANCELED: "bg-gray-500",
  };
  return <span className={cn("w-2 h-2 rounded-full flex-shrink-0", map[state] ?? "bg-gray-500")} />;
}

// ─── Per-project deployments panel ───────────────────────────────────────────
function DeployPanel({ project }: { project: VercelProject }) {
  const [open, setOpen] = useState(false);
  const { deployments, loading } = useVercelDeployments(open ? project.id : null, 5);
  const badge = deployStateBadge;

  // last deploy from latestDeployments (already in project data)
  const latest = project.latestDeployments?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden"
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm">{project.name}</p>
          <p className="text-gray-500 text-xs mt-0.5">
            {project.framework ?? "—"} · atualizado {formatDeployAge(project.updatedAt)} atrás
          </p>
        </div>

        {/* Last deploy state */}
        {latest && (
          <div className="flex items-center gap-2 mr-3">
            <StateDot state={(latest.readyState || latest.state) as any} />
            <span className={cn(
              "text-xs font-medium",
              (latest.readyState || latest.state) === "READY" ? "text-emerald-400" :
              (latest.readyState || latest.state) === "ERROR" ? "text-red-400" :
              ["BUILDING", "INITIALIZING"].includes((latest.readyState || latest.state) ?? "") ? "text-blue-400" :
              "text-gray-400"
            )}>
              {badge((latest.readyState || latest.state) as any).label}
            </span>
            <span className="text-gray-600 text-xs">{formatDeployAge(latest.createdAt)} atrás</span>
          </div>
        )}

        <a
          href={`https://vercel.com/${project.name}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-gray-600 hover:text-purple-400 transition-colors mr-2"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        {open ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
      </button>

      {/* Deployments list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-purple-900/20"
          >
            {loading ? (
              <div className="flex items-center gap-2 px-5 py-4 text-gray-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Carregando deployments…
              </div>
            ) : deployments.length === 0 ? (
              <p className="px-5 py-4 text-gray-600 text-sm">Nenhum deploy encontrado.</p>
            ) : (
              <div className="divide-y divide-purple-900/10">
                {deployments.map((d) => (
                  <div key={d.uid} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.015] transition-colors">
                    <StateDot state={(d.readyState || d.state) as any} />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-xs font-medium truncate">
                        {d.meta?.githubCommitMessage ?? d.url}
                      </p>
                      <p className="text-gray-600 text-xs mt-0.5">
                        {d.meta?.githubCommitRef ?? "production"} · {formatDeployAge(d.createdAt)} atrás
                      </p>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      d.state === "READY" || d.readyState === "READY" ? "bg-emerald-500/10 text-emerald-400" :
                      d.state === "ERROR" || d.readyState === "ERROR" ? "bg-red-500/10 text-red-400" :
                      ["BUILDING", "INITIALIZING"].includes(d.state || d.readyState || "") ? "bg-blue-500/10 text-blue-400" :
                      "bg-white/5 text-gray-500"
                    )}>
                      {badge((d.readyState || d.state) as any).label}
                    </span>
                    <a
                      href={`https://${d.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function VercelPage() {
  const { projects, user, loading, error, configured, refetch } = useVercel();

  const readyProjects = projects.filter(
    (p) => (p.latestDeployments?.[0]?.readyState || p.latestDeployments?.[0]?.state) === "READY"
  ).length;
  const errorProjects = projects.filter(
    (p) => (p.latestDeployments?.[0]?.readyState || p.latestDeployments?.[0]?.state) === "ERROR"
  ).length;
  const buildingProjects = projects.filter(
    (p) => ["BUILDING", "INITIALIZING", "QUEUED"].includes((p.latestDeployments?.[0]?.readyState || p.latestDeployments?.[0]?.state) ?? "")
  ).length;

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

  return (
    <AdminLayout>
      <div id="admin-vercel">
        <PageHeader title="Controle Vercel" description="Projetos, deploys e builds em tempo real" />

        {/* Connected user + summary */}
        <div className="flex flex-wrap items-center gap-4 mb-6 px-5 py-3 bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl">
          {user ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-gray-200 text-sm">
                Conectado como <span className="text-purple-400 font-medium">{user.name || user.username}</span>
              </span>
            </div>
          ) : loading ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Conectando…
            </div>
          ) : null}

          {!loading && !error && (
            <>
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {readyProjects} prontos
              </div>
              {buildingProjects > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  {buildingProjects} buildando
                </div>
              )}
              {errorProjects > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  {errorProjects} com erro
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <GitBranch className="w-3 h-3" />
                {projects.length} projetos
              </div>
            </>
          )}

          <button
            onClick={refetch}
            className="ml-auto flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Atualizar
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-4">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Projects list */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl p-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/5 rounded w-32" />
                    <div className="h-2.5 bg-white/5 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <DeployPanel project={p} />
              </motion.div>
            ))}
            {projects.length === 0 && !error && (
              <div className="text-center py-16 text-gray-600">
                <Zap className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>Nenhum projeto encontrado na sua conta Vercel.</p>
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        {!loading && projects.length > 0 && (
          <p className="text-gray-700 text-xs text-center mt-6">
            <Clock className="w-3 h-3 inline mr-1" />
            Clique em um projeto para ver o histórico de deploys
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
