import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, X, RefreshCw, ExternalLink } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useProjects } from "@/hooks/admin/useProjects";
import { useClients } from "@/hooks/admin/useClients";
import { useSiteStatus } from "@/hooks/admin/useSiteStatus";
import type { Project, ProjectStatus } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMPTY_PROJECT: Omit<Project, "id"> = {
  client_id: "",
  project_name: "",
  vercel_project_name: "",
  vercel_url: "",
  custom_domain: "",
  status: "online",
  last_ping: null,
  last_deploy_date: null,
};

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

export default function ProjectsPage() {
  const { data: projects, loading, create, update, remove } = useProjects();
  const { data: clients } = useClients();
  const { statusMap, lastChecked, checkNow } = useSiteStatus(projects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_PROJECT, client_id: clients[0]?.id ?? "" });
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) await update(editing.id, form);
    else await create(form);
    setSaving(false);
    setModalOpen(false);
  };

  return (
    <AdminLayout>
      <div id="admin-projects">
        <PageHeader
          title="Projetos"
          description={`${projects.length} projetos · ${projects.filter((p) => (statusMap[p.id] ?? p.status) === "online").length} online`}
          action={{ label: "Novo Projeto", onClick: openCreate }}
        />

        <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-purple-900/20">
            <span className="text-gray-400 text-xs">
              {lastChecked ? `Verificado ${timeAgo(lastChecked.toISOString())}` : "Verificando…"}
            </span>
            <button
              onClick={checkNow}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Verificar agora
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {["Projeto", "Cliente", "Vercel URL", "Domínio", "Status", "Último ping", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-gray-500 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>{Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-3 bg-white/5 rounded animate-pulse w-20" /></td>
                      ))}</tr>
                    ))
                  : projects.map((p) => {
                      const live = statusMap[p.id];
                      const display = live === "checking" ? p.status : live ?? p.status;
                      return (
                        <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-5 py-3.5 text-gray-200 font-medium">{p.project_name}</td>
                          <td className="px-5 py-3.5 text-gray-400">{clientMap[p.client_id] ?? "—"}</td>
                          <td className="px-5 py-3.5">
                            <a href={p.vercel_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs transition-colors">
                              <ExternalLink className="w-3 h-3" />
                              Vercel
                            </a>
                          </td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{p.custom_domain}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <StatusBadge status={display as ProjectStatus} />
                              {live === "checking" && <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 text-xs">{timeAgo(p.last_ping)}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => openEdit(p)} className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#0d0a1a] border border-purple-900/30 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">{editing ? "Editar Projeto" : "Novo Projeto"}</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-300"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Cliente</label>
                  <select value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none focus:border-purple-500/60">
                    {clients.map((c) => <option key={c.id} value={c.id} className="bg-[#0d0a1a]">{c.name}</option>)}
                  </select>
                </div>
                {([["project_name","Nome do Projeto"],["vercel_project_name","Vercel Project Name"],["vercel_url","Vercel URL"],["custom_domain","Domínio Custom"]] as const).map(([field, label]) => (
                  <div key={field}>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">{label}</label>
                    <Input value={(form as any)[field] ?? ""} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className="bg-white/5 border-purple-900/40 text-white h-9" />
                  </div>
                ))}
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProjectStatus }))}
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none focus:border-purple-500/60">
                    <option value="online" className="bg-[#0d0a1a]">Online</option>
                    <option value="offline" className="bg-[#0d0a1a]">Offline</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 border-purple-900/40 text-gray-400 hover:text-white h-9">Cancelar</Button>
                <Button onClick={handleSave} disabled={saving} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white h-9">{saving ? "Salvando…" : editing ? "Salvar" : "Criar"}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-sm bg-[#0d0a1a] border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-2">Confirmar exclusão</h2>
              <p className="text-gray-400 text-sm mb-5">Deseja excluir este projeto?</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1 border-purple-900/40 h-9">Cancelar</Button>
                <Button onClick={() => { remove(deleteId); setDeleteId(null); }} className="flex-1 bg-red-600 hover:bg-red-500 text-white h-9">Excluir</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
