import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="relative min-h-screen overflow-hidden bg-transparent">
            <LoadingScreen />
            <AnimatedBackground />
            <CustomCursor />
            <Toaster />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/black" component={BlackEdition} />
              <Route path="/criacao-de-sites-curitiba" component={CriacaoDeSitesCuritiba} />
              <Route path="/landing-page-curitiba" component={LandingPageCuritiba} />
              <Route path="/site-para-empresa-curitiba" component={SiteParaEmpresaCuritiba} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;