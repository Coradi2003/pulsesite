import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import useMousePosition from '../../hooks/useMousePosition';

export default function BlackCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for tracking
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    cursorX.set(x - (isHovering ? 20 : 8));
    cursorY.set(y - (isHovering ? 20 : 8));
  }, [x, y, cursorX, cursorY, isHovering]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-trigger')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: '#ffffff',
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      {/* Trailing Soft Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full w-[200px] h-[200px] pointer-events-none z-[0]"
        style={{
          x: useSpring(x - 100, { damping: 40, stiffness: 50, mass: 1 }),
          y: useSpring(y - 100, { damping: 40, stiffness: 50, mass: 1 }),
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 60%)',
        }}
      />
    </>
  );
}
