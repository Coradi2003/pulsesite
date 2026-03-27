import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, X, TrendingUp, AlertTriangle, TrendingDown } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useFinance } from "@/hooks/admin/useFinance";
import { useClients } from "@/hooks/admin/useClients";
import type { Finance, FinanceStatus, FinanceType } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EMPTY: Omit<Finance, "id"> = {
  client_id: "",
  description: "",
  amount: 0,
  type: "monthly",
  due_date: new Date().toISOString().split("T")[0],
  status: "pending",
};

const EMPTY_EXPENSE: Omit<Finance, "id"> = {
  client_id: "",
  description: "",
  amount: 0,
  type: "one-time",
  due_date: new Date().toISOString().split("T")[0],
  status: "paid",
};

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function FinancePage() {
  const { data: finance, loading, create, update, remove } = useFinance();
  const { data: clients } = useClients();
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [editing, setEditing] = useState<Finance | null>(null);
  const [form, setForm] = useState<Omit<Finance, "id">>(EMPTY);
  const [expenseForm, setExpenseForm] = useState<Omit<Finance, "id">>(EMPTY_EXPENSE);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));

  // Monthly totals
  const totalPaid    = finance.filter((f) => f.status === "paid"    && f.amount > 0).reduce((a, b) => a + b.amount, 0);
  const totalPending = finance.filter((f) => f.status === "pending"               ).reduce((a, b) => a + b.amount, 0);
  const totalOverdue = finance.filter((f) => f.status === "overdue"               ).reduce((a, b) => a + b.amount, 0);
  const totalExpense = finance.filter((f) => f.amount < 0                         ).reduce((a, b) => a + Math.abs(b.amount), 0);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY, client_id: clients[0]?.id ?? "" });
    setModalOpen(true);
  };

  const openExpense = () => {
    setExpenseForm({ ...EMPTY_EXPENSE });
    setExpenseOpen(true);
  };

  const handleSaveExpense = async () => {
    setSaving(true);
    // Store as negative amount so the chart subtracts it automatically
    await create({ ...expenseForm, amount: -Math.abs(expenseForm.amount), client_id: expenseForm.client_id || (clients[0]?.id ?? "") });
    setSaving(false);
    setExpenseOpen(false);
  };

  const openEdit = (f: Finance) => {
    setEditing(f);
    setForm({ client_id: f.client_id, description: f.description, amount: f.amount, type: f.type, due_date: f.due_date, status: f.status });
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
      <div id="admin-finance">
        <PageHeader title="Finanças" description="Controle de pagamentos e receitas" action={{ label: "Nova Cobrança", onClick: openCreate }} />

        {/* Botão Nova Saída ao lado */}
        <div className="-mt-12 mb-4 flex justify-end">
          <button
            onClick={openExpense}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <TrendingDown className="w-4 h-4" />
            Nova Saída
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: "Total Pago",    value: totalPaid,    color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "A Receber",     value: totalPending, color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/20"   },
            { label: "Em Atraso",     value: totalOverdue, color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20"       },
            { label: "Total Saídas",  value: totalExpense, color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20"     },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={cn("rounded-xl border p-4", bg, "bg-[#0d0a1a]/80 flex flex-col justify-between min-h-[90px]")}>
              <p className="text-gray-400 text-xs mb-1 font-medium">{label}</p>
              <p className={cn("text-xl md:text-2xl font-bold tracking-tight", color)}>{formatBRL(value)}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {["Cliente", "Descrição", "Valor", "Tipo", "Vencimento", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-gray-500 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/10">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>{Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-3 bg-white/5 rounded animate-pulse w-20" /></td>
                      ))}</tr>
                    ))
                  : finance.map((f) => (
                      <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={cn("hover:bg-white/[0.02] transition-colors group", f.status === "overdue" && "bg-red-500/[0.03]")}>
                        <td className="px-5 py-3.5 text-gray-300 text-sm">{clientMap[f.client_id] ?? "—"}</td>
                        <td className="px-5 py-3.5 text-gray-200 font-medium">{f.description}</td>
                        <td className="px-5 py-3.5 text-white font-semibold">
                          <span className={f.amount < 0 ? "text-red-400" : "text-white"}>
                            {f.amount < 0 ? `- ${formatBRL(Math.abs(f.amount))}` : formatBRL(f.amount)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5"><StatusBadge status={f.type} /></td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            {f.status === "overdue" && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                            <span className={cn("text-sm", f.status === "overdue" ? "text-red-400" : "text-gray-400")}>
                              {formatDate(f.due_date)}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><StatusBadge status={f.status} /></td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(f)} className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setDeleteId(f.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
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

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#0d0a1a] border border-purple-900/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">{editing ? "Editar Cobrança" : "Nova Cobrança"}</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-300"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Cliente</label>
                  <select value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none">
                    {clients.map((c) => <option key={c.id} value={c.id} className="bg-[#0d0a1a]">{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Descrição</label>
                  <Input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="bg-white/5 border-purple-900/40 text-white h-9" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Valor (R$)</label>
                  <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                    className="bg-white/5 border-purple-900/40 text-white h-9" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">Tipo</label>
                    <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as FinanceType }))}
                      className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none">
                      <option value="monthly" className="bg-[#0d0a1a]">Mensal</option>
                      <option value="one-time" className="bg-[#0d0a1a]">Único</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">Status</label>
                    <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as FinanceStatus }))}
                      className="w-full h-9 px-3 rounded-lg bg-white/5 border border-purple-900/40 text-white text-sm focus:outline-none">
                      <option value="pending" className="bg-[#0d0a1a]">Pendente</option>
                      <option value="paid" className="bg-[#0d0a1a]">Pago</option>
                      <option value="overdue" className="bg-[#0d0a1a]">Em atraso</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Vencimento</label>
                  <Input type="date" value={form.due_date} onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
                    className="bg-white/5 border-purple-900/40 text-white h-9" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 border-purple-900/40 text-gray-400 h-9">Cancelar</Button>
                <Button onClick={handleSave} disabled={saving} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white h-9">{saving ? "Salvando…" : editing ? "Salvar" : "Criar"}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expenseOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#0d0a1a] border border-red-500/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <h2 className="text-white font-semibold">Nova Saída</h2>
                </div>
                <button onClick={() => setExpenseOpen(false)} className="text-gray-500 hover:text-gray-300"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Descrição da saída</label>
                  <Input
                    placeholder="Ex: Hospedagem, Domínio, Ferramenta..."
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm((f) => ({ ...f, description: e.target.value }))}
                    className="bg-white/5 border-red-500/20 text-white h-9"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Valor (R$)</label>
                  <Input
                    type="number" step="0.01" min="0"
                    placeholder="0,00"
                    value={expenseForm.amount || ""}
                    onChange={(e) => setExpenseForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                    className="bg-white/5 border-red-500/20 text-white h-9"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">Tipo</label>
                    <select
                      value={expenseForm.type}
                      onChange={(e) => setExpenseForm((f) => ({ ...f, type: e.target.value as FinanceType }))}
                      className="w-full h-9 px-3 rounded-lg bg-white/5 border border-red-500/20 text-white text-sm focus:outline-none"
                    >
                      <option value="one-time" className="bg-[#0d0a1a]">Único</option>
                      <option value="monthly"  className="bg-[#0d0a1a]">Mensal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">Data</label>
                    <Input
                      type="date"
                      value={expenseForm.due_date}
                      onChange={(e) => setExpenseForm((f) => ({ ...f, due_date: e.target.value }))}
                      className="bg-white/5 border-red-500/20 text-white h-9"
                    />
                  </div>
                </div>
                {clients.length > 0 && (
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">Associar a cliente <span className="text-gray-600">(opcional)</span></label>
                    <select
                      value={expenseForm.client_id}
                      onChange={(e) => setExpenseForm((f) => ({ ...f, client_id: e.target.value }))}
                      className="w-full h-9 px-3 rounded-lg bg-white/5 border border-red-500/20 text-white text-sm focus:outline-none"
                    >
                      <option value="" className="bg-[#0d0a1a]">— Nenhum —</option>
                      {clients.map((c) => <option key={c.id} value={c.id} className="bg-[#0d0a1a]">{c.name}</option>)}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setExpenseOpen(false)} className="flex-1 border-purple-900/40 text-gray-400 h-9">Cancelar</Button>
                <Button onClick={handleSaveExpense} disabled={saving || !expenseForm.description || !expenseForm.amount}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white h-9">
                  {saving ? "Salvando…" : "Registrar Saída"}
                </Button>
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
              <p className="text-gray-400 text-sm mb-5">Deseja excluir esta cobrança?</p>
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
