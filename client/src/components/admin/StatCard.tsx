import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "purple" | "green" | "red" | "amber" | "blue" | "teal";
  trend?: { value: number; label: string };
  className?: string;
}

const colorMap = {
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "shadow-purple-900/20",
  },
  green: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-900/20",
  },
  red: {
    icon: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    glow: "shadow-red-900/20",
  },
  amber: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-900/20",
  },
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-900/20",
  },
  teal: {
    icon: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    glow: "shadow-teal-900/20",
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  color = "purple",
  trend,
  className,
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={cn(
        "rounded-xl border p-5 flex flex-col gap-4",
        "bg-[#0d0a1a]/80 backdrop-blur",
        c.border,
        `shadow-lg ${c.glow}`,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", c.bg)}>
          <Icon className={cn("w-4.5 h-4.5", c.icon)} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-white text-3xl font-bold tracking-tight">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend.value >= 0
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-red-400 bg-red-400/10"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
    </motion.div>
  );
}
