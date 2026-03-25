import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const ActionIcon = action?.icon ?? Plus;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8"
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-xl md:text-2xl font-bold text-white truncate">{title}</h2>
        {description && (
          <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          size="sm"
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white gap-2 h-9 px-4 shadow-lg shadow-purple-900/30 transition-all text-xs font-semibold"
        >
          <ActionIcon className="w-3.5 h-3.5" />
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
