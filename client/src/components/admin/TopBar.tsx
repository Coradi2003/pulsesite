import { useLocation } from "wouter";
import { Bell, LogOut, User, Menu } from "lucide-react";
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

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [location] = useLocation();
  const { logout, user, mockMode } = useAdminAuth();
  const title = routeLabels[location] ?? "Admin";

  return (
    <header
      className="h-16 border-b border-purple-900/30 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
      style={{ background: "rgba(7,5,15,0.95)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col leading-none">
          <h1 className="text-white font-semibold text-sm md:text-base">
            {title}
          </h1>
          {mockMode && (
            <span className="text-[10px] md:text-xs text-amber-400/80 font-medium">
              Modo Demo
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button className="hidden sm:flex w-8 h-8 items-center justify-center text-gray-500 hover:text-gray-200 transition-colors rounded-lg hover:bg-white/5">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white/5 border border-purple-900/30">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
            <User className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
          </div>
          <span className="text-gray-300 text-[10px] md:text-xs font-medium max-w-[80px] md:max-w-[140px] truncate">
            {user?.email?.split("@")[0] ?? "admin"}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 gap-1.5 h-8 px-2 md:px-3"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-xs">Sair</span>
        </Button>
      </div>
    </header>
  );
}
