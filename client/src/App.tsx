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
          <div className="relative min-h-screen overflow-hidden">
            {/* Fundo desktop: preto com efeitos roxos */}
            <div className="fixed inset-0 -z-40 hidden md:block bg-[#050507]" />

            <div className="fixed inset-0 -z-30 hidden md:block">
              <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-700/20 blur-[120px]" />
              <div className="absolute right-[-8%] top-[8%] h-[360px] w-[360px] rounded-full bg-violet-700/20 blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[18%] h-[420px] w-[420px] rounded-full bg-purple-800/20 blur-[140px]" />
              <div className="absolute bottom-[10%] right-[12%] h-[280px] w-[280px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
            </div>

            <div className="fixed inset-0 -z-20 hidden md:block bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_30%)]" />

            {/* Fundo mobile: imagem base */}
            <div
              className="fixed inset-0 -z-30 bg-center bg-cover bg-no-repeat md:hidden"
              style={{ backgroundImage: "url('/fundo-roxo-poster.jpg')" }}
            />

            {/* Vídeo só no mobile */}
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

            {/* Overlay geral */}
            <div className="fixed inset-0 -z-10 bg-black/35 md:bg-black/20" />

            {/* Glow roxo geral */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-violet-950/20 via-fuchsia-900/10 to-purple-950/20 md:from-violet-950/30 md:via-fuchsia-900/10 md:to-purple-950/30" />

            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;