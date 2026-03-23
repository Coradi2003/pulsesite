import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse Parallax Effect
  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Small parallax movement
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      wrapper.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Canvas Particles from Home.tsx rebuilt
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let particles: Array<{ x: number; y: number; r: number; vx: number; vy: number; alpha: number }> = [];

    // On mobile, reduce particle count drastically for performance
    const isMobile = window.innerWidth < 768;
    const density = isMobile ? 30000 : 18000;

    function createParticles() {
      particles = [];
      const count = Math.min(isMobile ? 25 : 60, Math.floor((W * H) / density));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.3,
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3), // Slower on mobile
          vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    }

    createParticles();

    let animationId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 43, 226, ${p.alpha})`; // Purple neon color
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="fixed inset-0 z-[-1] w-screen h-screen overflow-hidden bg-[#050505] pointer-events-none">
        {/* Subtle Tech Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 43, 226, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 43, 226, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        <div ref={wrapperRef} className="absolute inset-0 transition-transform duration-[2000ms] ease-out will-change-transform">
          {/* Ambient light base */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.12),transparent_70%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.08),transparent_70%)]" />

          {/* Technological Orb */}
          <div className="absolute top-[20%] left-[60%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[80px] mix-blend-screen animate-[spin_40s_linear_infinite]"
               style={{
                 background: "conic-gradient(from 0deg, transparent 0%, rgba(138,43,226,0.2) 20%, rgba(93,59,219,0.3) 50%, rgba(138,43,226,0.2) 80%, transparent 100%)"
               }}
          />

          {/* Blobs */}
          <div className="ab-blob ab-blob-1" />
          <div className="ab-blob ab-blob-2" />
          <div className="ab-blob ab-blob-3" />
        </div>

        {/* Contrast Overlay (Behind Particles) */}
        <div className="absolute inset-0 bg-[#05050A]/40 z-10" />

        {/* Particles Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 opacity-80 z-20" />
      </div>

      <style>{`
        .ab-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          -webkit-filter: blur(120px);
          opacity: 0.6;
          mix-blend-mode: screen;
          will-change: transform;
        }

        /* Tons roxos, violetas e lilás */
        .ab-blob-1 {
          top: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          max-width: 800px;
          max-height: 800px;
          background-color: rgba(93, 59, 219, 0.25); /* Dark blue/violet */
          animation: blob-float-1 25s infinite ease-in-out alternate;
        }

        .ab-blob-2 {
          top: 40%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          background-color: rgba(138, 43, 226, 0.2); /* Purple neon */
          animation: blob-float-2 30s infinite ease-in-out alternate-reverse;
        }

        .ab-blob-3 {
          bottom: -20%;
          left: 20%;
          width: 70vw;
          height: 70vw;
          max-width: 900px;
          max-height: 900px;
          background-color: rgba(168, 85, 247, 0.15); /* Lighter purple */
          animation: blob-float-3 28s infinite ease-in-out alternate;
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

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .ab-blob {
            filter: blur(80px);
            -webkit-filter: blur(80px);
            opacity: 0.8;
          }
          .ab-blob-1 { width: 120vw; height: 120vw; max-width: none; max-height: none; }
          .ab-blob-2 { width: 100vw; height: 100vw; max-width: none; max-height: none; }
          .ab-blob-3 { width: 140vw; height: 140vw; max-width: none; max-height: none; }
        }

        @media (prefers-reduced-motion) {
          .ab-blob {
            animation: none !important;
            transform: none !important;
          }
          .animate-\\[spin_40s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
