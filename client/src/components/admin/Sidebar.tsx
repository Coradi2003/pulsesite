import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Globe2,
  Activity,
  CreditCard,
  Server,
  Settings,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clientes", icon: Users },
  { href: "/admin/projects", label: "Projetos", icon: Globe2 },
  { href: "/admin/monitoring", label: "Monitoramento", icon: Activity },
  { href: "/admin/finance", label: "Finanças", icon: CreditCard },
  { href: "/admin/domains", label: "Domínios", icon: Server },
  { href: "/admin/vercel", label: "Controle Vercel", icon: Zap },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 z-30 flex flex-col border-r border-purple-900/30"
      style={{ background: "linear-gradient(180deg, #0d0a1a 0%, #080614 100%)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-purple-900/30">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-900/50">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-semibold text-sm tracking-wide">Pulse Futuro</span>
          <span className="text-purple-400 text-xs font-medium">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href !== "/admin/dashboard" && location.startsWith(href));
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group relative",
                  active
                    ? "bg-purple-600/20 text-purple-200 shadow-sm"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-400 rounded-full"
                  />
                )}
                <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300")} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3 h-3 text-purple-500" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-purple-900/30">
        <div className="text-xs text-gray-600">v1.0.0 · Pulse Futuro Admin</div>
      </div>
    </aside>
  );
}
