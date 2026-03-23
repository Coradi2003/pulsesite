import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let particles: any[] = [];
    const PARTICLE_COUNT = 120;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
      }));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // 🔥 GLOW REAL
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 6
        );

        gradient.addColorStop(0, "rgba(168, 85, 247, 1)");
        gradient.addColorStop(0.3, "rgba(168, 85, 247, 0.6)");
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    function animate() {
      drawParticles();
      requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* CANVAS (partículas) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* GLOW GLOBAL */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_70%)]" />

      {/* ESFERAS */}
      <div className="sphere sphere-1" />
      <div className="sphere sphere-2" />
      <div className="sphere sphere-3" />
    </div>
  );
}