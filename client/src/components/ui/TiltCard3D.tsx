import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export default function TiltCard3D({ children, className = '', featured = false }: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth standard springs for Apple-like elasticity
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Rotate mapping (-15 to 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  // Glare mapping based strictly on mouse physical tracking
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate relative mouse position (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Snap back to 0 perfectly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`relative rounded-3xl overflow-hidden group perspective-1000 ${
        featured ? 'border-[rgba(255,255,255,0.4)] shadow-[0_30px_100px_rgba(255,255,255,0.06)]' : 'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]'
      } ${className}`}
    >
      {/* 
        This is the dynamic glare element. 
        It's literally a light that follows the mouse across the card surface like glossy glass.
      */}
      <motion.div
        className="absolute inset-[0] pointer-events-none z-50 rounded-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
          opacity: glareOpacity,
          left: glareX,
          top: glareY,
          width: "200%",
          height: "200%",
          transform: "translate(-25%, -25%)",
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Content wrapper pushed forward in 3D Z-plane for true parallax holography */}
      <div 
        className="w-full h-full p-10 backdrop-blur-3xl relative z-10"
        style={{ transform: 'translateZ(60px)' }}
      >
        {children}
      </div>
      
      {/* Glow shadow behind for the featured item */}
      {featured && (
        <div className="absolute inset-[-10px] bg-white opacity-5 blur-[100px] z-[0] pointer-events-none" />
      )}
    </motion.div>
  );
}
