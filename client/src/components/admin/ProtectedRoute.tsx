import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#07050f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-300 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
