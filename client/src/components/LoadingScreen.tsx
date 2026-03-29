import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");

    if (hasSeenLoading) {
      setIsLoading(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasSeenLoading", "true");
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#05010a]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* brilho geral do fundo */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.55, 0.9, 0.55],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(138,43,226,0.18) 0%, rgba(138,43,226,0.08) 22%, rgba(5,1,10,0.96) 70%)",
            }}
          />

          {/* grade sutil */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(138,43,226,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(138,43,226,0.12) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* bloco principal */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-8 flex items-center justify-center"
            >
              {/* glow 1 */}
              <motion.div
                className="absolute rounded-full blur-[50px]"
                style={{
                  width: 150,
                  height: 150,
                  background: "rgba(138,43,226,0.42)",
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.9, 1.18, 0.9],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* glow 2 */}
              <motion.div
                className="absolute rounded-full border border-[rgba(181,107,255,0.25)]"
                style={{
                  width: 130,
                  height: 130,
                }}
                animate={{
                  scale: [0.94, 1.08, 0.94],
                  opacity: [0.35, 0.85, 0.35],
                }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* glow 3 */}
              <motion.div
                className="absolute rounded-full border border-[rgba(181,107,255,0.14)]"
                style={{
                  width: 165,
                  height: 165,
                }}
                animate={{
                  scale: [0.9, 1.12, 0.9],
                  opacity: [0.18, 0.45, 0.18],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              {/* logo */}
              <motion.img
                src="/logo.png"
                alt="Pulse Futuro Logo"
                className="relative z-10 h-auto w-28 md:w-36"
                animate={{
                  scale: [1, 1.06, 1],
                  y: [0, -3, 0],
                  filter: [
                    "drop-shadow(0 0 10px rgba(168,85,247,0.35))",
                    "drop-shadow(0 0 24px rgba(168,85,247,0.7))",
                    "drop-shadow(0 0 10px rgba(168,85,247,0.35))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* título opcional */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-3 text-center"
            >
              <h2 className="font-[var(--font-main)] text-xl font-extrabold tracking-[0.04em] text-white md:text-2xl">
                Pulse Futuro
              </h2>
            </motion.div>

            {/* carregando */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="ml-[0.4em] flex items-center text-sm font-bold uppercase tracking-[0.4em] text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.85)] md:text-base"
                animate={{
                  opacity: [0.65, 1, 0.65],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>Carregando</span>

                <span className="ml-1 inline-flex w-[26px] justify-start tracking-normal">
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, -1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, -1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, -1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  >
                    .
                  </motion.span>
                </span>
              </motion.div>

              {/* barra */}
              <div className="relative mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-[rgba(138,43,226,0.16)] md:w-48">
                <motion.div
                  className="absolute top-0 h-full w-1/3 rounded-full bg-[var(--purple-bright)] shadow-[0_0_16px_rgba(168,85,247,0.9)]"
                  animate={{ x: ["-120%", "330%"] }}
                  transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
