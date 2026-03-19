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
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-30 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover scale-110 blur-[1px] md:scale-100 md:blur-0"
              >
                <source src="/fundo-roxo.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="fixed inset-0 -z-20 bg-black/45 md:bg-black/35" />
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-950/35 via-fuchsia-900/20 to-purple-950/35" />

            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;