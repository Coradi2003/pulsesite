import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  const receita = payload.find((p: any) => p.dataKey === "receita")?.value ?? 0;
  const gastos  = payload.find((p: any) => p.dataKey === "gastos")?.value ?? 0;
  const total   = receita + gastos;
  const receitaPct = total > 0 ? ((receita / total) * 100).toFixed(1) : "0.0";
  const gastosPct  = total > 0 ? ((gastos  / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-[#0d0a1a] border border-purple-900/40 rounded-xl p-3 text-xs shadow-xl min-w-[160px]">
      <p className="text-gray-400 font-semibold mb-2 uppercase tracking-wider">{label}</p>
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          Receita
        </span>
        <span className="text-white font-bold">{formatBRL(receita)} <span className="text-emerald-400/70">({receitaPct}%)</span></span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          Gastos
        </span>
        <span className="text-white font-bold">{formatBRL(gastos)} <span className="text-red-400/70">({gastosPct}%)</span></span>
      </div>
      {total > 0 && (
        <div className="mt-2 pt-2 border-t border-purple-900/30 flex justify-between text-gray-400">
          <span>Saldo</span>
          <span className={receita >= gastos ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
            {formatBRL(receita - gastos)}
          </span>
        </div>
      )}
    </div>
  );
};

export function RevenueChart({ data, loading }: Props) {
  const chartData = useMemo(() => {
    const now = new Date();
    // Build last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth(), label: MONTHS[d.getMonth()] };
    });

    return months.map(({ year, month, label }) => {
      const entries = data.filter((f) => {
        const d = new Date(f.due_date);
        return d.getFullYear() === year && d.getMonth() === month;
      });

      const receita = entries
        .filter((f) => f.status === "paid")
        .reduce((s, f) => s + Number(f.amount || 0), 0);

      const gastos = entries
        .filter((f) => f.status === "overdue" || f.status === "pending")
        .reduce((s, f) => s + Number(f.amount || 0), 0);

      return { label, receita, gastos };
    });
  }, [data]);

  const totalReceita = chartData.reduce((s, d) => s + d.receita, 0);
  const totalGastos  = chartData.reduce((s, d) => s + d.gastos, 0);
  const saldo        = totalReceita - totalGastos;
  const receitaPct   = totalReceita + totalGastos > 0
    ? ((totalReceita / (totalReceita + totalGastos)) * 100).toFixed(1)
    : "0.0";

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
          <BarChart data={chartData} barCategoryGap="30%" barGap={4}>
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
              formatter={(value) => (
                <span style={{ color: "#9ca3af", fontSize: 11 }}>
                  {value === "receita" ? "Receita (pago)" : "Gastos (pendente/vencido)"}
                </span>
              )}
            />
            <Bar dataKey="receita" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="gastos"  fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
