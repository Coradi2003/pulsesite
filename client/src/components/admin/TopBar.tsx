import { useLocation } from "wouter";
import { Bell, LogOut, User } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";

const routeLabels: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/clients": "Clientes",
  "/admin/projects": "Projetos",
  "/admin/monitoring": "Monitoramento",
  "/admin/finance": "Finanças",
  "/admin/domains": "Domínios",
  "/admin/settings": "Configurações",
};

export function TopBar() {
  const [location] = useLocation();
  const { logout, user, mockMode } = useAdminAuth();
  const title = routeLabels[location] ?? "Admin";

  return (
    <header className="h-16 border-b border-purple-900/30 flex items-center justify-between px-6"
      style={{ background: "rgba(7,5,15,0.95)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex flex-col leading-none">
        <h1 className="text-white font-semibold text-base">{title}</h1>
        {mockMode && (
          <span className="text-xs text-amber-400/80 font-medium">Modo Demo — dados mockados</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-200 transition-colors rounded-lg hover:bg-white/5">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-purple-900/30">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="text-gray-300 text-xs font-medium max-w-[140px] truncate">
            {user?.email ?? "admin@pulsefuturo.com.br"}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 gap-1.5 h-8 px-3"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="text-xs">Sair</span>
        </Button>
      </div>
    </header>
  );
}
