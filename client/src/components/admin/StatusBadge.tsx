import { cn } from "@/lib/utils";

type StatusVariant =
  | "online"
  | "offline"
  | "active"
  | "paused"
  | "canceled"
  | "paid"
  | "pending"
  | "overdue"
  | "monthly"
  | "one-time";

const variantConfig: Record<
  StatusVariant,
  { label: string; classes: string; dot?: string }
> = {
  online: {
    label: "Online",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  offline: {
    label: "Offline",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
    dot: "bg-red-400",
  },
  active: {
    label: "Ativo",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  paused: {
    label: "Pausado",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  canceled: {
    label: "Cancelado",
    classes: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  },
  paid: {
    label: "Pago",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  pending: {
    label: "Pendente",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  overdue: {
    label: "Em atraso",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  monthly: {
    label: "Mensal",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  "one-time": {
    label: "Único",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
};

interface StatusBadgeProps {
  status: StatusVariant;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = variantConfig[status] ?? {
    label: status,
    classes: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.classes,
        className
      )}
    >
      {config.dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)}
        />
      )}
      {config.label}
    </span>
  );
}
