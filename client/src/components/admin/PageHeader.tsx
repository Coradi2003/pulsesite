import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      className="flex items-start justify-between mb-6"
    >
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {description && (
          <p className="text-sm text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          size="sm"
          className="bg-purple-600 hover:bg-purple-500 text-white gap-2 h-9 px-4 shadow-lg shadow-purple-900/30 transition-all"
        >
          <ActionIcon className="w-3.5 h-3.5" />
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
