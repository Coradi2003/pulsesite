import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { type Finance } from "@/lib/mockData";
import { useMemo } from "react";

interface Props {
  data: Finance[];
  loading: boolean;
}

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const receita  = payload.find((p: any) => p.dataKey === "receita")?.value  ?? 0;
  const gastos   = payload.find((p: any) => p.dataKey === "gastos")?.value   ?? 0;
  const pendente = payload.find((p: any) => p.dataKey === "pendente")?.value ?? 0;
  const total    = receita + gastos + pendente;
  const pct      = (v: number) => total > 0 ? ((v / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-[#0d0a1a] border border-purple-900/40 rounded-xl p-3 text-xs shadow-xl min-w-[170px]">
      <p className="text-gray-400 font-semibold mb-2 uppercase tracking-wider">{label}</p>

      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          Receita
        </span>
        <span className="text-white font-bold">
          {formatBRL(receita)} <span className="text-emerald-400/70">({pct(receita)}%)</span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          Gastos
        </span>
        <span className="text-white font-bold">
          {formatBRL(gastos)} <span className="text-red-400/70">({pct(gastos)}%)</span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Pendente
        </span>
        <span className="text-white font-bold">
          {formatBRL(pendente)} <span className="text-amber-400/70">({pct(pendente)}%)</span>
        </span>
      </div>

      {total > 0 && (
        <div className="mt-2 pt-2 border-t border-purple-900/30 flex justify-between text-gray-400">
          <span>Saldo</span>
          <span className={receita >= gastos + pendente ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
            {formatBRL(receita - gastos - pendente)}
          </span>
        </div>
      )}
    </div>
  );
};

export function RevenueChart({ data, loading }: Props) {
  const chartData = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth(), label: MONTHS[d.getMonth()] };
    });

    return months.map(({ year, month, label }) => {
      const entries = data.filter((f) => {
        // Parse date as local to avoid UTC offset shifting the month
        const [y, m] = (f.due_date ?? "").split("-").map(Number);
        return y === year && m - 1 === month;
      });

      // Receita: paid com amount positivo
      const receita = entries
        .filter((f) => f.status === "paid" && Number(f.amount) > 0)
        .reduce((s, f) => s + Number(f.amount), 0);

      // Gastos: saídas (amount negativo) + vencidos
      const gastos = entries
        .filter((f) => Number(f.amount) < 0 || f.status === "overdue")
        .reduce((s, f) => s + Math.abs(Number(f.amount)), 0);

      // Pendente: pending com amount positivo (bolinha amarela separada)
      const pendente = entries
        .filter((f) => f.status === "pending" && Number(f.amount) > 0)
        .reduce((s, f) => s + Number(f.amount), 0);

      return { label, receita, gastos, pendente };
    });
  }, [data]);

  const totalReceita  = chartData.reduce((s, d) => s + d.receita,  0);
  const totalGastos   = chartData.reduce((s, d) => s + d.gastos,   0);
  const totalPendente = chartData.reduce((s, d) => s + d.pendente, 0);
  const saldo         = totalReceita - totalGastos - totalPendente;
  const grandTotal    = totalReceita + totalGastos + totalPendente;
  const receitaPct    = grandTotal > 0 ? ((totalReceita / grandTotal) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl shadow-2xl shadow-purple-900/10 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold text-sm">Receita vs Gastos</h3>
          <p className="text-gray-500 text-xs mt-0.5">Últimos 6 meses · Tempo real</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="text-right">
            <p className="text-gray-500">Receita</p>
            <p className="text-emerald-400 font-bold">{receitaPct}%</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Saldo</p>
            <p className={saldo >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
              {formatBRL(saldo)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-[220px] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barCategoryGap="28%" barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `R$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139,92,246,0.05)" }} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => {
                const map: Record<string, string> = {
                  receita:  "Receita (pago)",
                  gastos:   "Gastos (saídas/vencido)",
                  pendente: "Pendente",
                };
                const colors: Record<string, string> = {
                  receita:  "#10b981",
                  gastos:   "#ef4444",
                  pendente: "#f59e0b",
                };
                return (
                  <span style={{ color: colors[value] ?? "#9ca3af", fontSize: 11 }}>
                    {map[value] ?? value}
                  </span>
                );
              }}
            />
            <Bar dataKey="receita"  fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="gastos"   fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="pendente" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
