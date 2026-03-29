import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { useDomains } from "@/hooks/admin/useDomains";
import { useClients } from "@/hooks/admin/useClients";
import type { Domain } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EMPTY: Omit<Domain, "id"> = {
  client_id: "",
  domain: "",
  registrar: "",
  expiration_date: new Date().toISOString().split("T")[0],
  auto_renew: false,
};

function daysUntil(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function DomainsPage() {
  const { data: domains, loading, create, update, remove } = useDomains();
  const { data: clients } = useClients();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Domain | null>(null);
  const [form, setForm] = useState<Omit<Domain, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const clientMap = Object.fromEntries(clients.map(c => [c.id, c.name]));
  const expiringSoon = domains.filter(
    d => daysUntil(d.expiration_date) <= 30
  ).length;

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY, client_id: clients[0]?.id ?? "" });
    setModalOpen(true);
  };

  const openEdit = (d: Domain) => {
    setEditing(d);
    setForm({
      client_id: d.client_id,
      domain: d.domain,
      registrar: d.registrar,
      expiration_date: d.expiration_date,
      auto_renew: d.auto_renew,
    });
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
      <div id="admin-domains">
        <PageHeader
          title="Domínios"
          description={`${domains.length} domínios · ${expiringSoon > 0 ? `${expiringSoon} expirando em breve` : "todos em dia"}`}
          action={{ label: "Novo Domínio", onClick: openCreate }}
        />

        {expiringSoon > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2.5 mb-5 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-amber-300 text-sm">
              <strong>
                {expiringSoon} domínio{expiringSoon > 1 ? "s" : ""}
              </strong>{" "}
              expira{expiringSoon === 1 ? "" : "m"} em menos de 30 dias.
            </p>
          </motion.div>
        )}

        <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {[
                    "Domínio",
                    "Cliente",
                    "Registrar",
                    "Vencimento",
                    "Auto-renovar",
                    "",
                  ].map(h => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-gray-500 text-xs font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={j} className="px-5 py-4">
                            <div className="h-3 bg-white/5 rounded animate-pulse w-20" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : domains.map(d => {
                      const days = daysUntil(d.expiration_date);
                      const expiring = days <= 30;
                      const expired = days <= 0;
                      return (
                        <motion.tr
                          key={d.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={cn(
                            "hover:bg-white/[0.02] transition-colors group",
                            expired && "bg-red-500/[0.04]",
                            !expired && expiring && "bg-amber-500/[0.03]"
                          )}
                        >
                          <td className="px-5 py-3.5 text-gray-200 font-medium">
                            {d.domain}
                          </td>
                          <td className="px-5 py-3.5 text-gray-400">
                            {clientMap[d.client_id] ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 text-gray-400">
                            {d.registrar}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              {expiring && (
                                <AlertTriangle
                                  className={cn(
                                    "w-3.5 h-3.5",
                                    expired ? "text-red-400" : "text-amber-400"
                                  )}
                                />
                              )}
                              <div>
                                <p
                                  className={cn(
                                    "text-sm",
                                    expired
                                      ? "text-red-400"
                                      : expiring
                                        ? "text-amber-400"
                                        : "text-gray-300"
                                  )}
                                >
                                  {formatDate(d.expiration_date)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {expired ? "Expirado" : `${days}d restantes`}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full",
                                d.auto_renew
                                  ? "text-emerald-400 bg-emerald-400/10"
                                  : "text-gray-500 bg-gray-500/10"
                              )}
                            >
                              {d.auto_renew ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEdit(d)}
                                className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteId(d.id)}
                                className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                              >
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

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#0d0a1a] border border-purple-900/30 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">
                  {editing ? "Editar Domínio" : "Novo Domínio"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Cliente
                  </label>
                  <select
                    value={form.client_id}
                    onChange={e =>
                      setForm(f => ({ ...f, client_id: e.target.value }))
                    }
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0d0a1a]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                {(["domain", "registrar"] as const).map(field => (
                  <div key={field}>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block capitalize">
                      {field === "domain" ? "Domínio" : "Registrar"}
                    </label>
                    <Input
                      value={form[field]}
                      onChange={e =>
                        setForm(f => ({ ...f, [field]: e.target.value }))
                      }
                      className="bg-white/5 border-purple-900/40 text-white h-9"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Data de Vencimento
                  </label>
                  <Input
                    type="date"
                    value={form.expiration_date}
                    onChange={e =>
                      setForm(f => ({ ...f, expiration_date: e.target.value }))
                    }
                    className="bg-white/5 border-purple-900/40 text-white h-9"
                  />
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.auto_renew}
                    onChange={e =>
                      setForm(f => ({ ...f, auto_renew: e.target.checked }))
                    }
                    className="w-4 h-4 accent-purple-500"
                  />
                  <span className="text-gray-300 text-sm">Auto-renovar</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border-purple-900/40 text-gray-400 h-9"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white h-9"
                >
                  {saving ? "Salvando…" : editing ? "Salvar" : "Criar"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm bg-[#0d0a1a] border border-red-500/20 rounded-2xl p-6"
            >
              <h2 className="text-white font-semibold mb-2">
                Confirmar exclusão
              </h2>
              <p className="text-gray-400 text-sm mb-5">
                Deseja excluir este domínio?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteId(null)}
                  className="flex-1 border-purple-900/40 h-9"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    remove(deleteId);
                    setDeleteId(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white h-9"
                >
                  Excluir
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
