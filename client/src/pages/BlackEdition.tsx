import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Target, Zap, Shield, ArrowRight } from 'lucide-react';
import '../styles/black-edition.css';

import BlackCursor from '../components/ui/BlackCursor';
import MagneticButton from '../components/ui/MagneticButton';
import BlackBootLoader from '../components/ui/BlackBootLoader';
import TiltCard3D from '../components/ui/TiltCard3D';

// WhatsApp Navigation
const WHATSAPP_NUMBER = '5541984606633';
const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Cinematic variants
const cinematicFadeIn = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: "easeOut" as const } 
  }
};

const cinematicRise = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: "easeOut" as const } 
  }
};

export default function BlackEdition() {
  const [booted, setBooted] = useState(false);

  // Clean scroll tracker for The Pulse and Mouse Parallax
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const svgDrawLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  useEffect(() => {
    document.body.style.background = '#000000';
    return () => { document.body.style.background = ''; };
  }, []);

  return (
    <div className="black-edition relative min-h-screen">
      
      {/* 1. CINEMATIC BOOT LOADER (HOLY SHIT FACTOR) */}
      {!booted && <BlackBootLoader onComplete={() => setBooted(true)} />}

      {/* Extreme Environment Elements */}
      <BlackCursor />
      <div className="be-noise"></div>
      
      {/* Dynamic Ambient Glow connected to scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[100vh] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
          scale: useTransform(smoothProgress, [0, 1], [1, 2])
        }}
      />

      {/* Nav */}
      {booted && (
        <motion.nav 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="fixed top-0 left-0 w-full z-[100] p-6 mix-blend-difference pointer-events-none"
        >
          <div className="flex justify-between items-center max-w-[1400px] mx-auto pointer-events-auto">
            <div className="text-xs uppercase tracking-widest font-bold">Pulse Futuro</div>
            <MagneticButton href={getWhatsAppLink("Gostaria de agendar uma consultoria C-Level para Projetos Black.")} className="text-xs uppercase tracking-widest font-bold magnetic-trigger">
              Acesso Restrito
            </MagneticButton>
          </div>
        </motion.nav>
      )}

      {/* SVG Canvas for "The Pulse" Line */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <motion.path 
            d="M 50% 0 L 50% 30% C 50% 40%, 20% 45%, 20% 55% C 20% 65%, 80% 70%, 80% 80% C 80% 90%, 50% 95%, 50% 100%" 
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            style={{ pathLength: booted ? svgDrawLength : 0 }}
          />
        </svg>
      </div>

      {booted && (
        <>
          {/* ========================================================= */}
          {/* SEC 1: THE SILENT LOGO */}
          {/* ========================================================= */}
          <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10">
            <motion.div 
              initial="hidden" animate="visible" variants={cinematicFadeIn}
            >
              <img src="/pulseblack.png" alt="Pulse Black" className="w-[80vw] max-w-[400px]" style={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.05))' }} />
            </motion.div>
          </section>

          {/* ========================================================= */}
          {/* SEC 2: VIDEO MASKED HERO (HOLY SHIT FACTOR) */}
          {/* ========================================================= */}
          <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10">
            <div className="text-center w-full max-w-[1400px]">
              
              <div className="be-video-mask w-full">
                <video autoPlay loop muted playsInline>
                  <source src="/fundo-roxo.mp4" type="video/mp4" />
                </video>
                <motion.h1 
                  initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light tracking-tighter m-0 leading-none"
                  style={{ fontSize: 'clamp(5rem, 15vw, 15rem)' }}
                >
                  PRESENÇA
                </motion.h1>
              </div>
              <div className="be-video-mask w-full">
                <video autoPlay loop muted playsInline>
                  <source src="/fundo-roxo.mp4" type="video/mp4" />
                </video>
                <motion.h1 
                  initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light tracking-widest m-0 leading-none"
                  style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
                >
                  DEFINITIVA.
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }}
                className="mt-12 text-lg md:text-2xl text-[var(--be-text-muted)] max-w-3xl mx-auto font-light leading-relaxed mix-blend-difference"
              >
                Nós não construímos "sites". Construímos engenharias de super-percepção de valor. 
                O padrão <strong>Black</strong> garante que a concorrência se torne matemática e visualmente irrelevante.
              </motion.p>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SEC 3: MECHANICS */}
          {/* ========================================================= */}
          <section className="relative w-full min-h-screen flex items-center justify-center px-4 overflow-hidden z-10 py-20">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={cinematicFadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 max-w-7xl mx-auto w-full"
            >
              <div className="text-center group">
                <Target className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
                <h3 className="text-2xl mb-4 font-light tracking-wide">Física Vetorial</h3>
                <p className="text-[var(--be-text-darker)] px-4">Motion Design com bibliotecas de física avançada. A tela comporta-se como um fluído gravitacional.</p>
              </div>
              <div className="text-center group">
                <Zap className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
                <h3 className="text-2xl mb-4 font-light tracking-wide">Absorção Óptica</h3>
                <p className="text-[var(--be-text-darker)] px-4">Manipulamos o campo de visão do seu cliente utilizando fundos ultra-profundos e ausência cirúrgica de luz.</p>
              </div>
              <div className="text-center group">
                <Shield className="w-12 h-12 mx-auto mb-6 text-white opacity-40 transition-opacity duration-500 group-hover:opacity-100" strokeWidth={1} />
                <h3 className="text-2xl mb-4 font-light tracking-wide">Holografias 3D</h3>
                <p className="text-[var(--be-text-darker)] px-4">Componentes reativos que rastreiam as coordenadas do cursor. A percepção de tecnologia aumenta 10x.</p>
              </div>
            </motion.div>
          </section>

          {/* ========================================================= */}
          {/* SEC 4: ELITE PRICING (HOLY SHIT FACTOR: TILT CARDS) */}
          {/* ========================================================= */}
          <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10 py-20">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={cinematicRise}
              className="w-full flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-20 text-center tracking-tighter">
                O Custo da Autoritade.
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
                
                {/* 3D TILT CARD 1 */}
                <TiltCard3D className="flex-1 min-h-[500px] flex flex-col">
                  <div className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--be-text-darker)] font-bold">Base Cinematográfica</div>
                  <div className="text-4xl font-light mb-10 tracking-tighter">R$ 5.500</div>
                  <div className="flex flex-col gap-5 text-sm font-light text-[var(--be-text-muted)] flex-grow mb-16">
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3 text-white"><span>Landing Page Premium</span></div>
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3"><span>Ux Copywriting Agressivo</span></div>
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-3"><span>Tracking Google & Meta</span></div>
                  </div>
                  
                  <MagneticButton href={getWhatsAppLink("Olá! Tenho interesse na Base Cinematográfica (Black) de R$5.500.")} className="be-btn-secondary w-full magnetic-trigger text-center justify-center">
                    Solicitar Acesso
                  </MagneticButton>
                </TiltCard3D>

                {/* 3D TILT CARD 2 - ELITE */}
                <TiltCard3D featured={true} className="flex-1 min-h-[500px] flex flex-col">
                  <div className="text-xs uppercase tracking-[0.3em] mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)] font-bold">Operação Elite</div>
                  <div className="text-5xl font-light mb-10 tracking-tighter">R$ 9.800</div>
                  <div className="flex flex-col gap-5 text-sm font-light text-white flex-grow mb-16">
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.15)] pb-3"><span>O Padrão Bilionário (Completo)</span></div>
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.15)] pb-3"><span>Interatividade WebGL e 3D Motion</span></div>
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.15)] pb-3"><span>Desenvolvimento Monolítico Customizado</span></div>
                    <div className="flex justify-between border-b border-[rgba(255,255,255,0.15)] pb-3"><span>Diretor de Arte Exclusivo</span></div>
                  </div>

                  <MagneticButton href={getWhatsAppLink("Olá! Exijo a Operação Elite (Black) de R$9.800 para dominar meu mercado.")} className="be-btn-primary w-full magnetic-trigger text-center justify-center">
                    Ascender ao Elite
                  </MagneticButton>
                </TiltCard3D>

              </div>
            </motion.div>
          </section>

          {/* ========================================================= */}
          {/* SEC 5: FINAL CTA */}
          {/* ========================================================= */}
          <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,1)_100%)] border-t border-[rgba(255,255,255,0.02)]">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={cinematicRise}
            >
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-24 mix-blend-difference">
                A concorrência <br/><span className="text-gradient-white">acabou de voltar no tempo.</span>
              </h2>
              
              <MagneticButton href={getWhatsAppLink("Estou pronto para o Choque de Autoridade. Requisitar Pulse Black.")} className="be-btn-primary magnetic-trigger shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                Exigir o Máximo <ArrowRight className="ml-2 w-4 h-4" />
              </MagneticButton>
              
              <img src="/pulseblack.png" alt="Pulse Black Footer" className="mx-auto mt-32 w-24 opacity-20" />
            </motion.div>
          </section>

        </>
      )}

    </div>
  );
}
