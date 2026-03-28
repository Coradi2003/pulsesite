import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login, isAuthenticated, mockMode } = useAdminAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  useEffect(() => {
    if (isAuthenticated) navigate("/admin/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (lockoutTimer > 0) {
      const timer = setTimeout(() => setLockoutTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) {
      setError(`Muitas tentativas. Aguarde ${lockoutTimer}s.`);
      return;
    }
    setError(null);
    setLoading(true);
    
    const { error } = await login(email, password);
    
    if (error) {
      setError(error);
      const attempts = Number(sessionStorage.getItem("login_attempts") || "0") + 1;
      sessionStorage.setItem("login_attempts", String(attempts));
      if (attempts >= 5) {
        setLockoutTimer(30); // 30s lockout for 5+ fails
      } else if (attempts >= 3) {
        setLockoutTimer(5); // 5s minor delay
      }
    } else {
      sessionStorage.removeItem("login_attempts");
      navigate("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#07050f] relative overflow-hidden"
      id="admin-login-page"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-xl shadow-purple-900/40 mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Pulse Futuro</h1>
          <p className="text-gray-500 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0a1a]/90 backdrop-blur border border-purple-900/30 rounded-2xl p-7 shadow-2xl shadow-black/40">


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 bg-white/5 border-purple-900/40 text-white placeholder:text-gray-600 focus:border-purple-500/60 h-10"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 pr-9 bg-white/5 border-purple-900/40 text-white placeholder:text-gray-600 focus:border-purple-500/60 h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2.5"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-900/30 transition-all"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 Pulse Futuro · Todos os direitos reservados
        </p>
      </motion.div>
    </div>
  );
}
