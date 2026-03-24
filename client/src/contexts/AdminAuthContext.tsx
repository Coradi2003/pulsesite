import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Mock admin credentials for local preview mode
const MOCK_EMAIL = "admin@pulsefuturo.com.br";
const MOCK_PASSWORD = "admin123";

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

  const mockMode = !isSupabaseConfigured;

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
        if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
          setMockAuthenticated(true);
          sessionStorage.setItem("admin_mock_auth", "true");
          return { error: null };
        }
        return { error: "Credenciais inválidas. Use admin@pulsefuturo.com.br / admin123" };
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
