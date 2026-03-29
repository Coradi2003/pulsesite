import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, X, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useClients } from "@/hooks/admin/useClients";
import type { Client, ClientStatus } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUS_OPTIONS: ClientStatus[] = ["active", "paused", "canceled"];
const EMPTY: Omit<Client, "id" | "created_at"> = {
  name: "",
  company: "",
  phone: "",
  email: "",
  status: "active",
  notes: "",
};

export default function ClientsPage() {
  const { data: clients, loading, create, update, remove } = useClients();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, "id" | "created_at">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = clients.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      name: c.name,
      company: c.company,
      phone: c.phone,
      email: c.email,
      status: c.status,
      notes: c.notes,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await update(editing.id, form);
    } else {
      await create(form);
    }
    setSaving(false);
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div id="admin-clients">
        <PageHeader
          title="Clientes"
          description={`${clients.length} clientes cadastrados`}
          action={{ label: "Novo Cliente", onClick: openCreate }}
        />

        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Buscar clientes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-purple-900/40 text-white placeholder:text-gray-600 h-9"
          />
        </div>

        {/* Table */}
        <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {["Nome", "Empresa", "Telefone", "Status", ""].map(h => (
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
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={j} className="px-5 py-4">
                            <div className="h-3 bg-white/5 rounded animate-pulse w-20" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : filtered.map(c => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-5 py-3.5 text-gray-200 font-medium">
                          {c.name}
                        </td>
                        <td className="px-5 py-3.5 text-gray-400">
                          {c.company}
                        </td>
                        <td className="px-5 py-3.5 text-gray-400">{c.phone}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEdit(c)}
                              className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(c.id)}
                              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0d0a1a] border border-purple-900/30 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">
                  {editing ? "Editar Cliente" : "Novo Cliente"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {(["name", "company", "phone"] as const).map(field => (
                  <div key={field}>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block capitalize">
                      {field === "name"
                        ? "Nome"
                        : field === "company"
                          ? "Empresa"
                          : "Telefone"}
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
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        status: e.target.value as ClientStatus,
                      }))
                    }
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none focus:border-purple-500/60"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s} className="bg-[#0d0a1a]">
                        {s === "active"
                          ? "Ativo"
                          : s === "paused"
                            ? "Pausado"
                            : "Cancelado"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Notas
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={e =>
                      setForm(f => ({ ...f, notes: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none focus:border-purple-500/60 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border-purple-900/40 text-gray-400 hover:text-white h-9"
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

      {/* Delete Confirm */}
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
              className="w-full max-w-sm bg-[#0d0a1a] border border-red-500/20 rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-white font-semibold mb-2">
                Confirmar exclusão
              </h2>
              <p className="text-gray-400 text-sm mb-5">
                Deseja excluir este cliente? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteId(null)}
                  className="flex-1 border-purple-900/40 text-gray-400 h-9"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleDelete(deleteId)}
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
