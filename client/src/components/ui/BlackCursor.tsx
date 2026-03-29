import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import useMousePosition from "../../hooks/useMousePosition";

export default function BlackCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Smooth springs for tracking (declared at top level - REQUIRED)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const trailConfig = { damping: 40, stiffness: 50, mass: 1 };

  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  const trailX = useSpring(x - 100, trailConfig);
  const trailY = useSpring(y - 100, trailConfig);

  useEffect(() => {
    // Detect touch device once
    if (typeof window !== "undefined") {
      const touchCapable =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (touchCapable) setIsTouch(true);
    }

    cursorX.set(x - (isHovering ? 20 : 8));
    cursorY.set(y - (isHovering ? 20 : 8));
    trailX.set(x - 100);
    trailY.set(y - 100);
  }, [x, y, cursorX, cursorY, trailX, trailY, isHovering]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic-trigger")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Rules of Hooks: This return must come AFTER all useEffect/useSpring calls
  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: "#ffffff",
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full w-[200px] h-[200px] pointer-events-none z-[0]"
        style={{
          x: trailX,
          y: trailY,
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
        }}
      />
    </>
  );
}
