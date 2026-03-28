import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Mock admin credentials — SOMENTE em ambiente de desenvolvimento local.
// Em produção (import.meta.env.PROD === true), essas variáveis são sempre undefined
// e o mock mode nunca é ativado, independentemente do Supabase estar configurado.
const MOCK_EMAIL    = import.meta.env.DEV ? (import.meta.env.VITE_MOCK_ADMIN_EMAIL    as string | undefined) : undefined;
const MOCK_PASSWORD = import.meta.env.DEV ? (import.meta.env.VITE_MOCK_ADMIN_PASSWORD as string | undefined) : undefined;

interface AdminAuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  mockMode: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mockAuthenticated, setMockAuthenticated] = useState(false);

  // Mock mode: APENAS em DEV e quando Supabase não está configurado.
  // Em produção, sempre usa Supabase real.
  const mockMode = import.meta.env.DEV && !isSupabaseConfigured;

  useEffect(() => {
    if (mockMode) {
      // Check if mock session persisted
      const stored = sessionStorage.getItem("admin_mock_auth");
      if (stored === "true") {
        setMockAuthenticated(true);
      }
      setLoading(false);
      return;
    }

    // Supabase mode
    supabase!.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [mockMode]);

  const login = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      if (mockMode) {
        if (MOCK_EMAIL && MOCK_PASSWORD && email === MOCK_EMAIL && password === MOCK_PASSWORD) {
          setMockAuthenticated(true);
          sessionStorage.setItem("admin_mock_auth", "true");
          return { error: null };
        }
        return { error: "Credenciais inválidas." };
      }

      const { error } = await supabase!.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return { error: null };
    },
    [mockMode]
  );

  const logout = useCallback(async () => {
    if (mockMode) {
      setMockAuthenticated(false);
      sessionStorage.removeItem("admin_mock_auth");
      return;
    }
    await supabase!.auth.signOut();
  }, [mockMode]);

  const isAuthenticated = mockMode ? mockAuthenticated : !!session;

  return (
    <AdminAuthContext.Provider
      value={{ user, session, loading, isAuthenticated, mockMode, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
