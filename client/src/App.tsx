import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="relative min-h-screen overflow-hidden">
            {/* Vídeo de fundo do site inteiro */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="fixed inset-0 -z-20 h-full w-full object-cover"
            >
              <source src="/fundo-roxo.mp4" type="video/mp4" />
            </video>

            {/* Camada escura por cima do vídeo para destacar o conteúdo */}
            <div className="fixed inset-0 -z-10 bg-black/45" />

            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;