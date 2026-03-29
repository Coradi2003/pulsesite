import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, Zap, Shield, ArrowRight } from 'lucide-react';
import '../styles/black-edition.css';
import BlackCursor from '../components/ui/BlackCursor';
import MagneticButton from '../components/ui/MagneticButton';

// WhatsApp Navigation
const WHATSAPP_NUMBER = '5541984606633';
const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function BlackEdition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Setup smooth scroll tracking for the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics for scroll smoothing
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // ---------------------------------------------------------------------------------
  // HERO PARALLAX & FADE LOGIC (The "Apple" Effect)
  // Section 1: 0 to 0.25 progress
  // ---------------------------------------------------------------------------------
  const heroLogoOpacity = useTransform(smoothProgress, [0, 0.05, 0.15], [0, 1, 0]);
  const heroLogoScale = useTransform(smoothProgress, [0, 0.15], [0.8, 1.2]);
  
  const heroTextOpacity = useTransform(smoothProgress, [0.12, 0.18, 0.25], [0, 1, 0]);
  const heroTextY = useTransform(smoothProgress, [0.12, 0.25], [50, -50]);
  
  // ---------------------------------------------------------------------------------
  // SVG LINE "THE PULSE" LOGIC
  // ---------------------------------------------------------------------------------
  const svgDrawLength = useTransform(smoothProgress, [0.15, 0.8], [0, 1]);

  // Ensure body background is pure black over the entire lifecycle
  useEffect(() => {
    document.body.style.background = '#000000';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className="black-edition" ref={containerRef} style={{ height: '500vh' }}>
      {/* Immersive Environment Elements */}
      <BlackCursor />
      <div className="be-noise"></div>
      <div className="be-ambient-glow"></div>

      {/* Persistent Nav - simple fade in */}
      <motion.nav 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest font-bold">Pulse Futuro</div>
          <MagneticButton href={getWhatsAppLink("Gostaria de agendar uma reunião sobre Projetos Black.")} className="text-xs uppercase tracking-widest font-bold magnetic-trigger">
            Agendar Reunião
          </MagneticButton>
        </div>
      </motion.nav>

      {/* SVG Canvas for "The Pulse" Line */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <motion.path 
            d="M 50% 0 L 50% 30% C 50% 40%, 20% 45%, 20% 55% C 20% 65%, 80% 70%, 80% 80% C 80% 90%, 50% 95%, 50% 100%" 
            fill="transparent"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            style={{ pathLength: svgDrawLength }}
          />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* HERO SCROLL-JACKING SECTION (Sticky) */}
      {/* ========================================================= */}
      <div className="be-sticky-frame">
        
        {/* Step 1: Logo Rise */}
        <motion.div 
          style={{ opacity: heroLogoOpacity, scale: heroLogoScale }}
          className="absolute inset-0 flex items-center justify-center flex-col"
        >
          <img src="/pulseblack.png" alt="Pulse Black" style={{ width: 'clamp(200px, 40vw, 400px)', filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.05))' }} />
        </motion.div>

        {/* Step 2: The Monolithic Statement */}
        <motion.div 
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-[var(--be-text-darker)] mb-6">Você acaba de entrar no nível mais alto</div>
          <h1 className="be-massive-title text-gradient-white">
            A PRESENÇA <br/> DEFINITIVA.
          </h1>
          <p className="mt-8 text-xl text-[var(--be-text-muted)] max-w-2xl mx-auto font-light leading-relaxed">
            Nós não construímos apenas sites. Nós construímos engenharias de percepção de valor. 
            O padrão <strong>Black</strong> é reservado para líderes de mercado que exigem o absoluto e recusam ser comparados por preço.
          </p>
        </motion.div>

        {/* Step 3: Mechanics Intro (Opacities mapped from progress 0.25 to 0.45) */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.25, 0.35, 0.45], [0, 1, 0]),
            scale: useTransform(smoothProgress, [0.25, 0.35], [0.9, 1])
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 max-w-7xl mx-auto w-full">
            <div className="text-center group">
              <Target className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
              <h3 className="text-xl mb-3 font-medium">Arquitetura Vetorial</h3>
              <p className="text-[var(--be-text-darker)] text-sm">Cada pixel posicionado matematicamente para induzir fluidez visual e foco microscópico no CTA.</p>
            </div>
            <div className="text-center group">
              <Zap className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
              <h3 className="text-xl mb-3 font-medium">Mecânica Invisível</h3>
              <p className="text-[var(--be-text-darker)] text-sm">Motion Design com bibliotecas de física avançada. O site se comporta como uma aplicação nativa ultra-rápida.</p>
            </div>
            <div className="text-center group">
              <Shield className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
              <h3 className="text-xl mb-3 font-medium">Impenetrabilidade</h3>
              <p className="text-[var(--be-text-darker)] text-sm">Construção monolítica. A percepção de luxo e solidez eleva sua autoridade, tornando a concorrência irrelevante.</p>
            </div>
          </div>
        </motion.div>

        {/* Step 4: Pricing Concept (Opacities mapped from progress 0.45 to 0.65) */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.45, 0.55, 0.65], [0, 1, 0]),
            y: useTransform(smoothProgress, [0.45, 0.55], [100, 0])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full px-4"
        >
           <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">O Custo do Absoluto.</h2>
           
           <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
              {/* Card 1 */}
              <div className="flex-1 p-10 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.2em] mb-4 text-[var(--be-text-darker)]">Corporate Base</div>
                <div className="text-4xl font-light mb-8">R$ 5.500</div>
                <div className="flex flex-col gap-4 text-sm text-[var(--be-text-muted)]">
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3"><span>Cinematografia Básica</span></div>
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3"><span>Ux Copywriting</span></div>
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3"><span>Alta Conversão Mobile</span></div>
                </div>
              </div>

              {/* Card 2 ELITE */}
              <div className="flex-1 p-10 rounded-2xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl scale-105 shadow-[0_0_100px_rgba(255,255,255,0.02)]">
                <div className="text-xs uppercase tracking-[0.2em] mb-4 text-white font-bold">Investimento Elite</div>
                <div className="text-5xl font-light mb-8">R$ 9.800</div>
                <div className="flex flex-col gap-4 text-sm text-[var(--be-text-white)]">
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.1)] pb-3"><span>Presença Corporativa Absoluta</span></div>
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.1)] pb-3"><span>Scroll-Jacking & Física (Framer)</span></div>
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.1)] pb-3"><span>SEO Institucional Profundo</span></div>
                  <div className="flex justify-between border-b border-[rgba(255,255,255,0.1)] pb-3"><span>Direção de Arte Exclusiva</span></div>
                </div>
              </div>
           </div>
        </motion.div>

        {/* Step 5: The Magnetic Final CTA (Opacities mapped from progress 0.65 to 1.0) */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.65, 0.8], [0, 1]),
            scale: useTransform(smoothProgress, [0.65, 0.8], [1.2, 1])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto z-50 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,1)_100%)]"
        >
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">
            A concorrência <br/><span className="text-gradient-white">tornou-se irrelevante.</span>
          </h2>
          
          <MagneticButton href={getWhatsAppLink("Estou pronto para a Presença Definitiva. Quero um projeto Pulse Black.")} className="be-btn-primary magnetic-trigger shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            Ascender ao Black <ArrowRight className="ml-2 w-4 h-4" />
          </MagneticButton>

          <img src="/pulseblack.png" alt="Pulse Black Footer" className="absolute bottom-12 w-24 opacity-30" />
        </motion.div>

      </div>
    </div>
  );
}
