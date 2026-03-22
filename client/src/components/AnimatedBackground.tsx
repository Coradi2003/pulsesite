import React from 'react';

export default function AnimatedBackground() {
  return (
    <>
      <div className="ab-wrapper">
        <div className="ab-ambient" />
        <div className="ab-blob ab-blob-1" />
        <div className="ab-blob ab-blob-2" />
        <div className="ab-blob ab-blob-3" />
        <div className="ab-overlay" />
      </div>

      <style>{`
        .ab-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -50;
          overflow: hidden;
          background-color: #05050A; /* Fundo extremamente escuro e luxuoso */
          pointer-events: none;
        }

        .ab-ambient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.12), transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.08), transparent 70%);
        }

        .ab-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          -webkit-filter: blur(120px);
          opacity: 0.7;
          mix-blend-mode: screen;
          will-change: transform;
        }

        /* Tons roxos, violetas e lilás com movimentos contrários */
        .ab-blob-1 {
          top: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          max-width: 800px;
          max-height: 800px;
          background-color: rgba(139, 92, 246, 0.35); /* Base Violeta */
          animation: blob-float-1 25s infinite ease-in-out alternate;
        }

        .ab-blob-2 {
          top: 20%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          background-color: rgba(168, 85, 247, 0.28); /* Purple vibrante */
          animation: blob-float-2 30s infinite ease-in-out alternate-reverse;
        }

        .ab-blob-3 {
          bottom: -20%;
          left: 20%;
          width: 70vw;
          height: 70vw;
          max-width: 900px;
          max-height: 900px;
          background-color: rgba(217, 70, 239, 0.2); /* Fuchsia/Lilás */
          animation: blob-float-3 28s infinite ease-in-out alternate;
        }

        /* Overlay para garantir contraste perfeito com o conteúdo da página */
        .ab-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(5, 5, 10, 0.55);
          z-index: 10;
        }

        @keyframes blob-float-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(8vw, 10vh) scale(1.1); }
          100% { transform: translate(-5vw, 6vh) scale(0.95); }
        }

        @keyframes blob-float-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-10vw, -8vh) scale(0.9); }
          100% { transform: translate(6vw, 5vh) scale(1.05); }
        }

        @keyframes blob-float-3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(6vw, -8vh) scale(1.05); }
          100% { transform: translate(-8vw, -4vh) scale(0.95); }
        }

        /* Otimização de renderização no mobile */
        @media (max-width: 768px) {
          .ab-blob {
            filter: blur(80px);
            -webkit-filter: blur(80px);
            opacity: 0.85; /* Compensa o blur menor */
          }
          .ab-blob-1 { width: 120vw; height: 120vw; max-width: none; max-height: none; }
          .ab-blob-2 { width: 100vw; height: 100vw; max-width: none; max-height: none; }
          .ab-blob-3 { width: 140vw; height: 140vw; max-width: none; max-height: none; }
        }
      `}</style>
    </>
  );
}
