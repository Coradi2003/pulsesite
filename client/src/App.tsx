// Pulse Futuro Admin - v1.0.1
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CriacaoDeSitesCuritiba from "./pages/CriacaoDeSitesCuritiba";
import LandingPageCuritiba from "./pages/LandingPageCuritiba";
import SiteParaEmpresaCuritiba from "./pages/SiteParaEmpresaCuritiba";
import BlackEdition from "./pages/BlackEdition";

// Admin imports
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ClientsPage from "./pages/admin/ClientsPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import FinancePage from "./pages/admin/FinancePage";
import DomainsPage from "./pages/admin/DomainsPage";
import VercelPage from "./pages/admin/VercelPage";
import MonitoringPage from "./pages/admin/MonitoringPage";
import SettingsPage from "./pages/admin/SettingsPage";

const ADMIN_HOSTNAME = "admin.pulsefuturo.com.br";

/**
 * If the user visits admin.pulsefuturo.com.br on any path that is not
 * already under /admin/*, redirect them to /admin/login.
 * This is a client-side safety net; vercel.json handles the edge case for /.
 */
function AdminSubdomainGuard() {
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname === ADMIN_HOSTNAME &&
      !location.startsWith("/admin")
    ) {
      navigate("/admin/login", { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function AdminRouter() {
  return (
    <AdminAuthProvider>
      <Switch>
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/admin/dashboard">
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/clients">
          <ProtectedRoute>
            <ClientsPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/projects">
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/finance">
          <ProtectedRoute>
            <FinancePage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/domains">
          <ProtectedRoute>
            <DomainsPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/vercel">
          <ProtectedRoute>
            <VercelPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/monitoring">
          <ProtectedRoute>
            <MonitoringPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/settings">
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        </Route>
      </Switch>
    </AdminAuthProvider>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes — no marketing shell */}
      <Route path="/admin/:rest*" component={AdminRouter} />

      {/* Marketing site */}
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <AdminSubdomainGuard />
          <Switch>
            {/* Admin: bare layout — no loading screen, no cursor, no animated bg */}
            <Route path="/admin/:rest*">
              <Toaster />
              <AdminRouter />
            </Route>

            {/* Black Edition: completely isolated premium routing */}
            <Route path="/black">
              <BlackEdition />
            </Route>

            {/* Marketing: full shell */}
            <Route>
              <div className="relative min-h-screen overflow-hidden bg-transparent">
                <LoadingScreen />
                <AnimatedBackground />
                <CustomCursor />
                <Toaster />
                <Switch>
                  <Route path="/" component={Home} />
                  <Route
                    path="/criacao-de-sites-curitiba"
                    component={CriacaoDeSitesCuritiba}
                  />
                  <Route
                    path="/landing-page-curitiba"
                    component={LandingPageCuritiba}
                  />
                  <Route
                    path="/site-para-empresa-curitiba"
                    component={SiteParaEmpresaCuritiba}
                  />
                  <Route path="/404" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Route>
          </Switch>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
