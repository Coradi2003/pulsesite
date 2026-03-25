import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/admin/PageHeader";
import { Settings, Zap, MessageSquare, Webhook } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const integrations = [
  {
    icon: Zap,
    title: "Controle Vercel",
    description: "Sincronize projetos automaticamente, acesse logs de deploy e monitore builds em tempo real.",
    status: "Sincronizado",
    color: "border-emerald-500/20 bg-emerald-500/10",
    iconColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Alerts",
    description: "Receba notificações instantâneas quando um site ficar offline ou um pagamento vencer.",
    status: "Planejado",
    color: "border-green-500/20 bg-green-500/5",
    iconColor: "text-green-400 bg-green-500/10",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Integre com sistemas externos via webhooks quando eventos específicos ocorrerem.",
    status: "Planejado",
    color: "border-purple-500/20 bg-purple-500/5",
    iconColor: "text-purple-400 bg-purple-500/10",
  },
];

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div id="admin-settings">
        <PageHeader title="Configurações" description="Configurações do sistema e integrações" />

        <div className="space-y-6">
          {/* Profile section */}
          <div className="bg-[#0d0a1a]/80 border border-purple-900/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold text-sm">Preferências do Sistema</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Nome da Agência", value: "Pulse Futuro" },
                { label: "E-mail de Contato", value: "contato@pulsefuturo.com.br" },
                { label: "Notificações de domínio", value: "30 dias antes do vencimento" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-purple-900/15 last:border-0">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-gray-200 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 px-1">Integrações</h3>
            <div className="grid gap-4">
              {integrations.map(({ icon: Icon, title, description, status, color, iconColor }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-4 p-5 border rounded-xl ${color}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm">{title}</h4>
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        status === "Sincronizado" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-white/5 border-white/10 text-gray-400"
                      )}>
                        {status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Version */}
          <div className="text-center py-4">
            <p className="text-gray-600 text-xs">Pulse Futuro Admin v1.0.0 · © 2026 Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
