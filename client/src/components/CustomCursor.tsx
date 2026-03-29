import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Media query to check for desktop and non-touch
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: w / 2, y: h / 2 };
    const pos = { x: w / 2, y: h / 2 }; // lerped position for the glow & trail
    const corePos = { x: w / 2, y: h / 2 }; // faster lerp for core dot

    let isHovering = false;
    let isClicking = false;
    let currentRadius = 14;
    let currentGlow = 40;

    const points: { x: number; y: number; life: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseDown = () => (isClicking = true);
    const onMouseUp = () => (isClicking = false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Interactive elements hover detection globally
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        isHovering = true;
      }
    };
    const handleMouseOut = () => {
      isHovering = false;
    };

    // Use capture phase for faster detection
    window.addEventListener("mouseover", handleMouseOver, true);
    window.addEventListener("mouseout", handleMouseOut, true);

    let rafId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      // Delta time smoothing for consistent speed across refresh rates
      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      // Lerping formulas
      corePos.x += (mouse.x - corePos.x) * (0.35 * dt);
      corePos.y += (mouse.y - corePos.y) * (0.35 * dt);

      pos.x += (mouse.x - pos.x) * (0.16 * dt);
      pos.y += (mouse.y - pos.y) * (0.16 * dt);

      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Add points to trail if moving
      if (dist > 0.5) {
        points.push({ x: pos.x, y: pos.y, life: 1.0 });
      }

      // Draw Trail (Dissipating Halos / Particles)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.life -= 0.02 * dt; // Fade out speed

        if (p.life <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        // size shrinks as it fades
        const size = Math.max(0, p.life * 6);
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.life * 0.3})`;
        ctx.fill();
      }

      // Smooth state transitions
      const targetRadius = isHovering ? 28 : isClicking ? 10 : 14;
      const targetGlow = isHovering ? 80 : isClicking ? 40 : 50;

      currentRadius += (targetRadius - currentRadius) * (0.15 * dt);
      currentGlow += (targetGlow - currentGlow) * (0.15 * dt);

      // Draw Ambient Glow
      const gradient = ctx.createRadialGradient(
        pos.x,
        pos.y,
        0,
        pos.x,
        pos.y,
        currentGlow
      );
      gradient.addColorStop(
        0,
        isClicking
          ? "rgba(216, 180, 254, 0.4)"
          : isHovering
            ? "rgba(168, 85, 247, 0.25)"
            : "rgba(192, 132, 252, 0.15)"
      );
      gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, currentGlow, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw outline ring around the glow center
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isHovering
        ? "rgba(216, 180, 254, 0.7)"
        : "rgba(168, 85, 247, 0.5)";
      ctx.lineWidth = isHovering ? 1.5 : 1;
      ctx.stroke();

      // Draw central core dot (fast moving)
      ctx.beginPath();
      ctx.arc(corePos.x, corePos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Inner subtle glow for core
      ctx.beginPath();
      ctx.arc(corePos.x, corePos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver, true);
      window.removeEventListener("mouseout", handleMouseOut, true);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      <style>{`
        body, a, button, input, select, textarea, [role="button"], [class*="cursor-"] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
