import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se já passou pela tela de loading nesta sessão
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    
    if (hasSeenLoading) {
      setIsLoading(false);
      return;
    }

    // Trava o scroll da página durante o loading
    document.body.style.overflow = "hidden";

    // O loading dura em média 3 segundos (3000ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasSeenLoading", "true");
      document.body.style.overflow = ""; // Libera o scroll
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ""; // Garante liberação na desmontagem
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Logo com glow neon animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-8"
          >
            {/* Efeito Glow pulsante atrás da logo */}
            <motion.div
              className="absolute inset-0 rounded-full blur-[40px] bg-[var(--purple-neon)]"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Logo em si */}
            <img src="/logo.png" alt="Pulse Futuro Logo" className="relative w-32 md:w-40 h-auto z-10" />
          </motion.div>

          {/* Texto CARREGANDO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="text-[var(--purple-light)] font-medium text-sm md:text-base tracking-[0.3em] ml-[0.3em] font-[var(--font-main)] uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Carregando
            </motion.div>
            
            {/* Linha de progresso ou trilho sutil abaixo do texto */}
            <div className="w-32 h-[1px] bg-[rgba(138,43,226,0.2)] mt-4 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full w-1/3 bg-[var(--purple-bright)]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
