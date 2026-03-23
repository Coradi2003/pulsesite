import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
};

type Orb = {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  driftX: number;
  driftY: number;
  phase: number;
  type: "ring" | "sphere";
  alpha: number;
};

type TriangleShape = {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  driftX: number;
  driftY: number;
  phase: number;
  alpha: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    let triangles: TriangleShape[] = [];

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      createScene();
    }

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function createParticles() {
      const count = width < 768 ? 35 : 65;

      particles = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(1, 2.2),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.12, 0.12),
        alpha: rand(0.2, 0.9),
      }));
    }

    function createOrbs() {
      const base = Math.min(width, height);

      orbs = [
        {
          x: width * 0.16,
          y: height * 0.42,
          radius: base * 0.2,
          rotation: rand(0, Math.PI * 2),
          rotationSpeed: 0.0018,
          driftX: 20,
          driftY: 18,
          phase: rand(0, Math.PI * 2),
          type: "sphere",
          alpha: 0.6,
        },
        {
          x: width * 0.32,
          y: height * 0.08,
          radius: base * 0.13,
          rotation: rand(0, Math.PI * 2),
          rotationSpeed: -0.0014,
          driftX: 14,
          driftY: 12,
          phase: rand(0, Math.PI * 2),
          type: "ring",
          alpha: 0.3,
        },
        {
          x: width * 0.84,
          y: height * 0.9,
          radius: base * 0.12,
          rotation: rand(0, Math.PI * 2),
          rotationSpeed: 0.0015,
          driftX: 18,
          driftY: 16,
          phase: rand(0, Math.PI * 2),
          type: "ring",
          alpha: 0.55,
        },
      ];
    }

    function createTriangles() {
      const count = width < 768 ? 4 : 7;

      triangles = Array.from({ length: count }, () => ({
        x: rand(0.08 * width, 0.92 * width),
        y: rand(0.08 * height, 0.92 * height),
        size: rand(18, 70),
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.003, 0.003),
        driftX: rand(6, 16),
        driftY: rand(6, 16),
        phase: rand(0, Math.PI * 2),
        alpha: rand(0.12, 0.32),
      }));
    }

    function createScene() {
      createParticles();
      createOrbs();
      createTriangles();
    }

    function drawGrid() {
      ctx.save();
      ctx.strokeStyle = "rgba(120, 60, 255, 0.08)";
      ctx.lineWidth = 1;

      const gap = 36;

      for (let x = 0; x <= width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawGlowBackground() {
      const g1 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.12,
        0,
        width * 0.5,
        height * 0.12,
        height * 0.45
      );
      g1.addColorStop(0, "rgba(140, 60, 255, 0.16)");
      g1.addColorStop(1, "rgba(140, 60, 255, 0)");

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticles() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 92, 255, ${p.alpha})`;
        ctx.fill();
      }
    }

    function drawTriangle(tri: TriangleShape) {
      const ox = Math.sin(time * 0.0007 + tri.phase) * tri.driftX;
      const oy = Math.cos(time * 0.0009 + tri.phase) * tri.driftY;

      tri.rotation += tri.rotationSpeed;

      ctx.save();
      ctx.translate(tri.x + ox, tri.y + oy);
      ctx.rotate(tri.rotation);
      ctx.strokeStyle = `rgba(110, 50, 220, ${tri.alpha})`;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(0, -tri.size);
      ctx.lineTo(tri.size * 0.9, tri.size * 0.7);
      ctx.lineTo(-tri.size * 0.9, tri.size * 0.7);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    function drawWireRing(cx: number, cy: number, radius: number, rotation: number, alpha: number) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      ctx.strokeStyle = `rgba(170, 110, 255, ${alpha})`;
      ctx.lineWidth = 1;

      const segments = 70;

      for (let j = 0; j < 2; j++) {
        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const rx = radius * 1.45;
          const ry = radius * 0.52;

          const x = Math.cos(a) * rx;
          const y = Math.sin(a) * ry;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.rotate(Math.PI / 2.35);
      }

      ctx.restore();
    }

    function drawWireSphere(cx: number, cy: number, radius: number, rotation: number, alpha: number) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      const latCount = 7;
      const lonCount = 9;

      ctx.strokeStyle = `rgba(182, 130, 255, ${alpha})`;
      ctx.lineWidth = 0.9;

      for (let i = 0; i < latCount; i++) {
        const t = i / (latCount - 1);
        const y = (t - 0.5) * radius * 1.75;
        const r = Math.cos((t - 0.5) * Math.PI) * radius;

        ctx.beginPath();
        for (let s = 0; s <= 80; s++) {
          const a = (s / 80) * Math.PI * 2;
          const x = Math.cos(a) * r;
          const yy = y + Math.sin(a) * r * 0.18;

          if (s === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }

      for (let i = 0; i < lonCount; i++) {
        const a = (i / lonCount) * Math.PI;
        ctx.beginPath();

        for (let s = 0; s <= 80; s++) {
          const t = (s / 80) * Math.PI * 2;
          const x = Math.cos(t) * radius * Math.sin(a);
          const y = Math.sin(t) * radius * 0.92;
          const zScale = Math.cos(a);

          const px = x * zScale;
          const py = y;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.stroke();
      }

      ctx.restore();
    }

    function drawOrbs() {
      for (const orb of orbs) {
        const ox = Math.sin(time * 0.00045 + orb.phase) * orb.driftX;
        const oy = Math.cos(time * 0.00055 + orb.phase) * orb.driftY;

        orb.rotation += orb.rotationSpeed;

        const x = orb.x + ox;
        const y = orb.y + oy;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, orb.radius * 1.6);
        glow.addColorStop(0, `rgba(132, 56, 255, ${orb.alpha * 0.14})`);
        glow.addColorStop(1, "rgba(132, 56, 255, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(x - orb.radius * 1.8, y - orb.radius * 1.8, orb.radius * 3.6, orb.radius * 3.6);

        if (orb.type === "ring") {
          drawWireRing(x, y, orb.radius, orb.rotation, orb.alpha);
        } else {
          drawWireSphere(x, y, orb.radius, orb.rotation, orb.alpha);
        }
      }
    }

    function animate() {
      time += 16;

      ctx.clearRect(0, 0, width, height);
      drawGlowBackground();
      drawGrid();
      drawOrbs();
      triangles.forEach(drawTriangle);
      drawParticles();

      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
    </div>
  );
}