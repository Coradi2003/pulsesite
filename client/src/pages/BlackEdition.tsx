import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Zap, Shield, ArrowRight, Check, Diamond } from 'lucide-react';
import '../styles/black-edition.css';

// WhatsApp Navigation
const WHATSAPP_NUMBER = '5541984606633';
const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Framer Motion Variants for Staggered Cinematic Text Reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function BlackEdition() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  // Minimalist scroll listener for precise styling
  useEffect(() => {
    document.body.style.background = '#000000';
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.body.style.background = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="black-edition">
      {/* Background Ambient Layers (Pure Cinema) */}
      <div className="be-noise"></div>
      <div className="be-ambient-glow"></div>

      {/* Dynamic Nav */}
      <nav className={`be-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="be-container be-nav-inner">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <img src="/pulseblack.png" alt="Pulse Black Oficial" width={110} style={{ objectFit: 'contain' }} />
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            href={getWhatsAppLink("Olá! Gostaria de ter acesso ao portfólio Pulse Black.")} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="be-nav-btn"
          >
            Falar com Especialista
          </motion.a>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="be-section flex items-center" style={{ minHeight: '100vh', padding: '0' }}>
        <motion.div 
          style={{ y: yBg }} 
          className="be-container text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="be-super-title">
            Bem-vindo à Experiência Black
          </motion.span>
          <motion.h1 variants={itemVariants} className="be-heading text-gradient-white">
            Você acaba de entrar no nível <br className="hidden md:block" />
            mais alto da <span style={{ fontFamily: 'inherit' }}>Pulse Futuro.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="be-subheading mb-12">
            Aqui, marcas comuns ficam para trás. A <strong>Pulse Black</strong> é a nossa
            assinatura máxima de exclusividade, reservada para projetos que exigem imposição,
            cinematografia e engenharia absoluta de conversão.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="#solucoes" className="be-btn-primary">
              Descubra a Atmosfera <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Moment - Official Pulse Black Spotlight */}
      <section className="be-section" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.02)', background: 'rgba(255,255,255,0.005)' }}>
        <div className="be-container">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
          >
            <img src="/pulseblack.png" alt="Selo Pulse Black Oficial" width={220} className="mb-8 opacity-90" style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.05))' }} />
            <p className="text-xl md:text-2xl font-light text-[var(--be-text-white)]" style={{ lineHeight: '1.4' }}>
              A identidade <strong>Pulse Black</strong> é o selo de garantia de que sua empresa
              operará com o máximo de requinte tecnológico disponível no mercado nacional.
              Desenhado para quem não aceita ser apenas mais uma opção.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / Features (Physics Cards) */}
      <section id="solucoes" className="be-section">
        <div className="be-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <motion.span variants={itemVariants} className="be-super-title">Arquitetura de Conversão</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-light mb-6 text-gradient-white">A anatomia de um site irrecusável.</motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="be-card-glass"
            >
              <Target className="w-8 h-8 mb-6 opacity-60" />
              <h3 className="text-2xl font-medium mb-4">Composição Cinematográfica</h3>
              <p className="leading-relaxed">
                Cada elemento respira. Utilizamos os mais pesados princípios de UX/UI escandinavo
                e dark-mode nativo para focar a visão do seu cliente no botão de compra.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="be-card-glass"
            >
              <Zap className="w-8 h-8 mb-6 opacity-60" />
              <h3 className="text-2xl font-medium mb-4">Mecânica de Fluidos</h3>
              <p className="leading-relaxed">
                As animações não gritam, elas guiam. Movimentação vetorial calculada para 
                apresentar seus serviços como uma experiência imersiva, sem travar o carregamento.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="be-card-glass"
            >
              <Shield className="w-8 h-8 mb-6 opacity-60" />
              <h3 className="text-2xl font-medium mb-4">Presença Monolítica</h3>
              <p className="leading-relaxed">
                Sua marca parecerá intocável. Um design luxuoso elimina objeções de preço
                imediatamente, forçando seu mercado a respeitar o seu valor.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Pricing / Plans */}
      <section className="be-section">
        <div className="be-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <motion.span variants={itemVariants} className="be-super-title">Investimento Estratégico</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-light mb-6 text-gradient-white">A Categoria Especial.</motion.h2>
          </motion.div>

          <div className="be-pricing-grid">
            {/* Ouro */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="be-card-glass flex flex-col"
            >
              <h3 className="text-xl text-[var(--be-text-muted)] font-light mb-2">Assinatura Premium</h3>
              <div className="text-4xl font-medium mb-8">R$ 5.500</div>
              
              <ul className="be-feature-list flex-grow">
                <li><span>Páginas de Alta Conversão</span> <Check className="w-4 h-4" /></li>
                <li><span>Design Pulse Black (Base)</span> <Check className="w-4 h-4" /></li>
                <li><span>Animações Fluídas</span> <Check className="w-4 h-4" /></li>
                <li><span>Aprovação Google Speed</span> <Check className="w-4 h-4" /></li>
              </ul>
              
              <a href={getWhatsAppLink("Olá! Tenho interesse no pacote Premium (Black) de R$5.500.")} target="_blank" rel="noopener noreferrer" className="be-btn-secondary w-full">
                Solicitar Premium
              </a>
            </motion.div>

            {/* Elite / Featured */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="be-card-glass flex flex-col relative"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-light">Assinatura Elite</h3>
                <span className="text-[0.65rem] uppercase tracking-widest px-3 py-1 bg-white text-black rounded-full font-bold">Recomendado</span>
              </div>
              <div className="text-5xl font-medium mb-8">R$ 9.800</div>
              
              <ul className="be-feature-list flex-grow">
                <li className="text-white font-medium"><span>Presença Corporativa Absoluta</span> <Diamond className="w-4 h-4" /></li>
                <li><span>Direção de Arte Exclusiva</span> <Check className="w-4 h-4" /></li>
                <li><span>Cinematografia Avançada</span> <Check className="w-4 h-4" /></li>
                <li><span>SEO Institucional Profundo</span> <Check className="w-4 h-4" /></li>
                <li><span>Arquitetura de Banco de Dados</span> <Check className="w-4 h-4" /></li>
              </ul>
              
              <a href={getWhatsAppLink("Olá! Preciso da apresentação do formato Elite (Black) de R$9.800.")} target="_blank" rel="noopener noreferrer" className="be-btn-primary w-full">
                Ascender ao Pleno
              </a>
            </motion.div>

            {/* Bespoke */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="be-card-glass flex flex-col"
            >
              <h3 className="text-xl text-[var(--be-text-muted)] font-light mb-2">Engenharia Sob Medida</h3>
              <div className="text-4xl font-medium mb-8">R$ 18k+</div>
              
              <ul className="be-feature-list flex-grow">
                <li><span>Sistemas e Plataformas Web</span> <Check className="w-4 h-4" /></li>
                <li><span>Dashboards Administrativos</span> <Check className="w-4 h-4" /></li>
                <li><span>Integração de APIs / ERP</span> <Check className="w-4 h-4" /></li>
                <li><span>UX Research & Strategy</span> <Check className="w-4 h-4" /></li>
              </ul>
              
              <a href={getWhatsAppLink("Gostaria de agendar briefing com os Engenheiros da Pulse Black para um projeto complexo.")} target="_blank" rel="noopener noreferrer" className="be-btn-secondary w-full">
                Agendar Reunião Técnica
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dramatic Final CTA */}
      <section className="be-section border-t border-[rgba(255,255,255,0.03)] flex items-center justify-center text-center" style={{ minHeight: '80vh', background: 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 60%)' }}>
        <div className="be-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-150px" }} variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-light mb-8 text-gradient-white">
              Sua marca merece<br/>o topo do mundo.
            </motion.h2>
            <motion.div variants={itemVariants}>
              <a href={getWhatsAppLink("Estou pronto para revolucionar minha presença digital com a Pulse Black!")} target="_blank" rel="noopener noreferrer" className="be-btn-primary px-12 py-5 text-lg">
                Iniciar Transformação 
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-10 border-t border-[rgba(255,255,255,0.04)] text-center">
        <div className="be-container flex flex-col md:flex-row justify-between items-center text-sm text-[var(--be-text-darker)]">
          <img src="/pulseblack.png" alt="Pulse Black" width={90} className="mb-4 md:mb-0 opacity-60" />
          <p>© {new Date().getFullYear()} Edição Exclusiva. Pulse Futuro Agência Digital.</p>
        </div>
      </footer>
    </div>
  );
}
