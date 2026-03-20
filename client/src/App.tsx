import { useEffect, useState } from "react";
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
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) return;

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="relative min-h-screen">
            <div
              className="fixed inset-0 -z-30 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('/fundo-roxo-poster.jpg')" }}
            />

            {showVideo && (
              <div className="fixed inset-0 -z-20 overflow-hidden md:hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/fundo-roxo-poster.jpg"
                  className="h-full w-full object-cover scale-105"
                >
                  <source src="/fundo-roxo.mp4" type="video/mp4" />
                </video>
              </div>
            )}

            <div className="fixed inset-0 -z-10 bg-black/50 md:bg-black/40" />
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-violet-950/35 via-fuchsia-900/20 to-purple-950/35" />

            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;