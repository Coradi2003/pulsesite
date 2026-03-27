import { useEffect } from 'react';
import CTASection from '../components/CTASection';
import PlansSection from '../components/PlansSection';
import Footer from '../components/Footer';
import ComoFuncionaSection from '../components/ComoFuncionaSection';
import AutoridadeSection from '../components/AutoridadeSection';
import SolucaoSection from '../components/SolucaoSection';
import ProblemaSection from '../components/ProblemaSection';
import HeroSection from '../components/HeroSection';
import FAQSection from '../components/FAQSection';

export default function Home() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Parallax effect for diagonal ribbons
      const ribbonTop = document.querySelector('.ribbon-top') as HTMLElement;
      const ribbonBottom = document.querySelector('.ribbon-bottom') as HTMLElement;
      
      if (ribbonTop && ribbonBottom) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.1; // Suavizado para movimento sutil
        
        ribbonTop.style.transform = `rotate(4deg) translateX(${scrollY * parallaxSpeed}px)`;
        ribbonBottom.style.transform = `rotate(-4deg) translateX(${-scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(
          (anchor as HTMLAnchorElement).getAttribute('href') || ''
        );
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="landing-page">
      <HeroSection />

      <ProblemaSection />

      <SolucaoSection />

      <ComoFuncionaSection />

      <AutoridadeSection />

      {/* ===================== PREMIUM PLANS SECTION ===================== */}
      <PlansSection />

      <FAQSection />

      <CTASection />

      <Footer />

      <style>{`

        /* ======================== ACCESSIBILITY UTILITIES ======================== */
        /* Screen reader only - visually hidden but accessible to screen readers and SEO */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ======================== DIAGONAL RIBBONS WITH PARALLAX ======================== */
        .diagonal-ribbons-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .diagonal-ribbon {
          position: absolute;
          width: 200%;
          height: 48px;
          display: flex;
          align-items: center;
          overflow: hidden;
          will-change: transform;
          opacity: 0.15;
          filter: blur(0.5px);
        }

        .ribbon-top {
          top: 20%;
          left: -50%;
          transform: rotate(4deg);
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(168, 85, 247, 0.95));
          box-shadow: 
            0 4px 16px rgba(124, 58, 237, 0.2),
            0 0 30px rgba(124, 58, 237, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .ribbon-bottom {
          top: 70%;
          left: -50%;
          transform: rotate(-4deg);
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(124, 58, 237, 0.95));
          box-shadow: 
            0 4px 16px rgba(168, 85, 247, 0.2),
            0 0 30px rgba(168, 85, 247, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .ribbon-track {
          display: flex;
          gap: 0;
          white-space: nowrap;
          animation: scroll-left 60s linear infinite;
          will-change: transform;
        }

        .ribbon-bottom .ribbon-track {
          animation: scroll-right 60s linear infinite;
        }

        .ribbon-text {
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          text-shadow: 
            0 1px 4px rgba(0, 0, 0, 0.2),
            0 0 10px rgba(255, 255, 255, 0.1);
          padding: 0 20px;
          display: inline-block;
        }

        /* Garantir que o conteúdo fique acima das ribbons */
        .problema-grid,
        .problema-item,
        .alert-box,
        .section-tag,
        .section-title,
        .section-subtitle {
          position: relative;
          z-index: 2;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .diagonal-ribbon {
            height: 40px;
            opacity: 0.12;
          }

          .ribbon-text {
            font-size: 0.85rem;
            padding: 0 20px;
          }
        }

        @media (max-width: 480px) {
          .diagonal-ribbon {
            height: 32px;
            opacity: 0.1;
          }

          .ribbon-text {
            font-size: 0.75rem;
            letter-spacing: 0.1em;
          }
        }
        /* ======================== END DIAGONAL RIBBONS ======================== */

        /* ======================== PREMIUM PLANS REDESIGN ======================== */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

        .plans-section-premium {
          padding: 120px 0;
          background: #05020D;
          position: relative;
          overflow: hidden;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center !important;
          justify-content: center;
        }

        .plans-container-premium {
          width: 100%;
          max-width: 1280px;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 16px;
          padding-right: 16px;
          display: flex;
          flex-direction: column;
          align-items: center !important;
        }

        .plans-premium {
          padding: 160px 0 220px;
          background: radial-gradient(circle at 50% 100%, rgba(138,43,226,0.08) 0%, transparent 50%);
          font-family: 'Outfit', sans-serif; /* Forçado conforme pedido */
        }

        .plans-header-premium {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center !important;
          justify-content: center;
          text-align: center;
          margin: 0 auto 64px auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .premium-tag {
          display: inline-block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          color: #A855F7;
          background: rgba(168, 85, 247, 0.1);
          padding: 8px 20px;
          border-radius: 100px;
          letter-spacing: 0.15em;
          border: 1px solid rgba(168, 85, 247, 0.2);
          margin-left: auto !important;
          margin-right: auto !important;
          margin-bottom: 20px;
          text-align: center !important;
        }

        .premium-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -0.02em;
          max-width: 800px;
          width: 100%;
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          margin-bottom: 18px;
        }

        .premium-title span {
          background: linear-gradient(135deg, #7C3AED, #A855F7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .premium-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          color: var(--gray-light);
          max-width: 700px;
          margin-left: auto !important;
          margin-right: auto !important;
          opacity: 0.7;
          line-height: 1.6;
          text-align: center !important;
        }

        .plans-grid-premium {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: stretch;
          max-width: 1280px;
          margin: 72px auto 0; /* Aumentado para 72px conforme solicitado */
        }

        .pcard {
          position: relative;
          background: linear-gradient(180deg, rgba(20,10,40,0.8), rgba(10,5,25,0.9)); /* Profundidade real */
          backdrop-filter: blur(12px);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 32px;
          padding: 80px 48px 64px; /* Aumentado o topo para 80px para dar mais respiro */
          display: flex;
          flex-direction: column;
          align-items: center; /* Centraliza conteúdo interno */
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .pcard:hover {
          transform: translateY(-4px); /* Sutil */
          border: 1px solid rgba(124, 58, 237, 0.6);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.25);
          background: rgba(16, 16, 24, 0.85);
        }

        /* ====== PULSE START (ROCKET) ANIMATIONS ====== */
        .pcard-start {
          position: relative;
        }

        .pcard-start .pcard-emoji {
          animation: rocketBounce 2s ease-in-out infinite;
        }

        @keyframes rocketBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .rocket-trail {
          position: absolute;
          top: 12%;
          left: 15px;
          width: 4px;
          height: 10px;
          background: linear-gradient(to bottom, rgba(124, 58, 237, 0.4), transparent);
          border-radius: 50%;
          opacity: 0;
          animation: rocketTrail 1.5s ease-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .rocket-trail:nth-child(1) {
          animation-delay: 0s;
          left: 10px;
        }

        .rocket-trail:nth-child(2) {
          animation-delay: 0.3s;
          left: 15px;
        }

        .rocket-trail:nth-child(3) {
          animation-delay: 0.6s;
          left: 20px;
        }

        @keyframes rocketTrail {
          0% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          20% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(40px) scale(0.3);
          }
        }

        .pcard-start:hover .pcard-emoji {
          animation: rocketLaunch 0.6s ease-out;
        }

        @keyframes rocketLaunch {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.2);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        /* ====== PULSE ELITE (FIRE) ANIMATIONS ====== */
        .pcard-elite {
          position: relative;
        }

        .pcard-elite .pcard-emoji {
          animation: fireFlicker 1.5s ease-in-out infinite;
        }

        @keyframes fireFlicker {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          25% {
            transform: scale(1.1);
            filter: brightness(1.2);
          }
          50% {
            transform: scale(0.95);
            filter: brightness(0.9);
          }
          75% {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }

        .flame-particle {
          position: absolute;
          top: 12%;
          left: 15px;
          width: 4px;
          height: 8px;
          background: linear-gradient(to top, rgba(255, 77, 0, 0.6), rgba(255, 214, 0, 0.4));
          border-radius: 50% 50% 0 0;
          opacity: 0;
          animation: flameRise 2s ease-out infinite;
          pointer-events: none;
          filter: blur(0.5px);
          z-index: 0;
        }

        .flame-particle:nth-child(1) {
          left: 5px;
          animation-delay: 0s;
        }

        .flame-particle:nth-child(2) {
          left: 10px;
          animation-delay: 0.4s;
        }

        .flame-particle:nth-child(3) {
          left: 15px;
          animation-delay: 0.8s;
        }

        .flame-particle:nth-child(4) {
          left: 20px;
          animation-delay: 1.2s;
        }

        .flame-particle:nth-child(5) {
          left: 25px;
          animation-delay: 1.6s;
        }

        @keyframes flameRise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          20% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.3);
          }
        }

        .elite-glow {
          position: absolute;
          top: 8%;
          left: 15px;
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(255, 100, 0, 0.12), transparent 70%);
          border-radius: 50%;
          animation: eliteGlowPulse 3s ease-in-out infinite;
          filter: blur(15px);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes eliteGlowPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
        }

        .pcard-elite:hover .pcard-emoji {
          animation: fireExplosion 0.5s ease-out, fireFlicker 1.5s ease-in-out infinite;
        }

        @keyframes fireExplosion {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
            filter: brightness(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .pcard-elite:hover {
          box-shadow: 
            0 0 50px rgba(255, 100, 0, 0.3),
            0 0 80px rgba(255, 150, 0, 0.2);
        }

        /* ====== SIMPLE BUTTON ANIMATIONS ====== */
        .btn-premium {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .btn-premium:hover::before {
          left: 100%;
        }

        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
        }

        .pcard-featured {
          transform: scale(1.05);
          box-shadow: 0 0 70px rgba(255, 120, 0, 0.35);
          border-color: rgba(255, 120, 0, 0.6);
          z-index: 5;
          position: relative;
          background: rgba(16, 16, 24, 0.9) !important;
          backdrop-filter: blur(14px) !important;
        }

        .pcard-featured:hover {
          transform: scale(1.05) translateY(-6px);
          border-color: rgba(255, 120, 0, 0.8);
          box-shadow: 0 0 80px rgba(255, 90, 0, 0.45);
        }

        .pcard-featured .pcard-label-text {
          color: #FF8A00;
          text-shadow: 0 0 15px rgba(255, 138, 0, 0.4);
        }

        /* ====== PULSE PRO (ENERGY) ANIMATIONS ====== */
        .pcard-featured .pcard-emoji {
          animation: energyPulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(255, 200, 0, 0.8));
        }

        @keyframes energyPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 8px rgba(255, 200, 0, 0.8));
          }
          25% {
            transform: scale(1.15) rotate(-10deg);
            filter: drop-shadow(0 0 15px rgba(255, 200, 0, 1)) drop-shadow(0 0 25px rgba(255, 150, 0, 0.6));
          }
          50% {
            transform: scale(1.1) rotate(10deg);
            filter: drop-shadow(0 0 20px rgba(255, 200, 0, 1)) drop-shadow(0 0 35px rgba(255, 100, 0, 0.8));
          }
          75% {
            transform: scale(1.15) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgba(255, 200, 0, 1)) drop-shadow(0 0 25px rgba(255, 150, 0, 0.6));
          }
        }

        .pcard-featured:hover .pcard-emoji {
          animation: energyExplosion 0.6s ease-out, energyPulse 1s ease-in-out infinite;
        }

        @keyframes energyExplosion {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.4) rotate(15deg);
            filter: 
              drop-shadow(0 0 30px rgba(255, 200, 0, 1)) 
              drop-shadow(0 0 50px rgba(255, 150, 0, 1))
              drop-shadow(0 0 70px rgba(255, 100, 0, 0.8));
          }
          60% {
            transform: scale(0.9) rotate(-10deg);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Fire Particles */
        .fire-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }

        .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #FFD600;
          box-shadow: 0 0 15px #FF4D00, 0 0 30px #FFD600;
          opacity: 0;
          animation: spark-rise var(--duration) infinite ease-out;
          animation-delay: var(--delay);
          left: var(--x);
          bottom: var(--y);
          filter: blur(0.5px);
        }

        @keyframes spark-rise {
          0% {
            transform: translateY(0) translateX(0) scale(1.5);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) translateX(var(--tx)) scale(0);
            opacity: 0;
          }
        }

        .pcard-badge {
          display: none !important; /* Removido conforme solicitado */
        }

        /* Centralização do Header do Card (Estilo Stripe) */
        .pcard-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 28px;
        }

        .pcard-emoji {
          position: absolute;
          left: 0;
          flex-shrink: 0;
          font-size: 1.25rem;
          z-index: 2;
          line-height: 1;
        }

        .pcard-label-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #A855F7;
          letter-spacing: -0.01em;
          text-align: center;
          width: 100%;
          line-height: 1;
          position: relative;
          z-index: 2;
        }

        .pcard-price-wrap {
          position: relative;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0;
          margin-bottom: 24px;
          width: auto;
        }

        .pcard-currency {
          position: absolute;
          left: 0;
          transform: translateX(-120%);
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
          opacity: 0.5;
        }

        .pcard-price {
          font-family: 'Outfit', sans-serif;
          font-size: 48px; /* Conforme exemplo Stripe solicitado */
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.02em;
          line-height: 1;
          text-align: center;
        }

        .pcard-description {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: var(--gray-light);
          line-height: 1.6;
          margin-bottom: 40px;
          min-height: 72px;
          opacity: 0.65;
          text-align: center;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pcard-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), transparent);
          margin-bottom: 40px;
        }

        .pcard-features {
          list-style: none;
          padding: 0;
          margin: 24px 0 48px;
          display: flex;
          flex-direction: column;
          align-items: center; /* Centraliza a lista como um todo */
          gap: 0;
          flex: 1;
          width: 100%;
          min-height: 220px; /* Alinha o rodapé */
        }

        .pcard-features li {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--gray-light);
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Alinha seta + texto entre si */
          gap: 14px;
          line-height: 1.4;
          margin: 0 auto 12px auto; /* Centraliza o item no card */
          opacity: 0.85;
          width: 100%;
          max-width: 260px; /* Largura mínima/máxima para alinhar à esquerda visualmente no centro */
          text-align: left;
        }

        .pcard-features li strong {
          color: var(--white);
        }

        .pcard-footer {
          margin-top: auto;
          width: 100%;
        }

        .pcard-note {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--gray-mid);
          text-align: center;
          margin-bottom: 24px;
          font-weight: 500;
          min-height: 40px; /* Alinha o botão */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-premium {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #7C3AED, #A855F7);
          color: #fff;
          border: none;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-premium:hover {
          transform: translateY(-4px) scale(1.02);
          filter: brightness(1.2);
          box-shadow: 0 12px 25px rgba(124, 58, 237, 0.5);
        }

        .btn-premium::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 20%;
          height: 200%;
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(30deg);
          transition: all 0.6s;
          opacity: 0;
        }

        .btn-premium:hover::after {
          left: 120%;
          opacity: 1;
        }

        /* Padronizamos o estilo outline para seguir o roxo pleno solicitado */
        .btn-premium-outline {
          background: linear-gradient(135deg, #7C3AED, #A855F7);
        }

        @media (max-width: 1200px) {
          .pcard {
            padding: 48px 32px;
          }
          .pcard-price {
            font-size: 3.2rem;
          }
        }

        @media (max-width: 1024px) {
          .plans-grid-premium {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .pcard-featured {
            transform: none;
          }
          .pcard-featured:hover {
            transform: translateY(-4px);
          }
          .pcard:last-child {
            grid-column: 1 / -1;
            max-width: 550px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .plans-premium {
            padding: 100px 0 120px;
          }
          .plans-grid-premium {
            grid-template-columns: 1fr;
          }
          .pcard:last-child {
            max-width: 100%;
          }
          .pcard {
            padding: 48px 32px;
          }
          .pcard-price {
            font-size: 3rem;
          }
          .premium-title {
            font-size: 2.5rem;
          }
        }
        /* ============================= */

        .landing-page * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .landing-page {
          --bg-deep: #07070b;
          --bg-card: rgba(17, 17, 24, 0.62);
          --bg-card2: rgba(19, 19, 28, 0.48);
          --purple-neon: #8A2BE2;
          --purple-bright: #9D3FFF;
          --purple-light: #B56BFF;
          --purple-glow: rgba(138, 43, 226, 0.45);
          --purple-glow2: rgba(138, 43, 226, 0.15);
          --white: #FFFFFF;
          --gray-light: #C8C8D8;
          --gray-mid: #A1A1BF;
          --border: rgba(138, 43, 226, 0.22);
          --font-main: 'Space Grotesk', 'Inter', sans-serif;
          --font-body: 'Inter', sans-serif;
          --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          color: var(--white);
          font-family: var(--font-body);
          line-height: 1.65;
          overflow-x: hidden;
          position: relative;
          z-index: 2;
          isolation: isolate;
        }

        .landing-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(138, 43, 226, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138, 43, 226, 0.028) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .landing-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(circle at 20% 18%, rgba(157, 63, 255, 0.12), transparent 28%),
            radial-gradient(circle at 78% 24%, rgba(138, 43, 226, 0.08), transparent 24%),
            radial-gradient(circle at 60% 78%, rgba(181, 107, 255, 0.07), transparent 26%);
          pointer-events: none;
          z-index: 0;
        }

        .landing-page html {
          scroll-behavior: smooth;
        }

        .landing-page .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .landing-page .section {
          position: relative;
          z-index: 1;
          padding: 100px 0;
        }

        .landing-page .section-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--purple-light);
          background: rgba(138, 43, 226, 0.12);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .landing-page .section-title {
          font-family: var(--font-main);
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 800;
          line-height: 1.2;
          color: var(--white);
          margin-bottom: 18px;
        }

        .landing-page .section-title span {
          color: var(--purple-bright);
        }

        .landing-page .section-subtitle {
          font-size: 1.05rem;
          color: var(--gray-light);
          max-width: 620px;
          line-height: 1.75;
        }

        .landing-page .text-center {
          text-align: center;
        }

        .landing-page .text-center .section-subtitle {
          margin: 0 auto;
        }

        .landing-page .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 1rem;
          border-radius: 10px;
          padding: 15px 32px;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .landing-page .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
          opacity: 0;
          transition: var(--transition);
        }

        .landing-page .btn:hover::before {
          opacity: 1;
        }

        .landing-page .btn-primary {
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          color: #fff;
          box-shadow: 0 0 24px var(--purple-glow), 0 4px 20px rgba(138,43,226,0.35);
          border-radius: 12px;
          position: relative;
          z-index: 1;
        }

        /* Subtle energy aura for primary buttons */
        .landing-page .btn-primary::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 14px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.4) 0%,
            rgba(168, 85, 247, 0.2) 50%,
            transparent 70%
          );
          filter: blur(8px);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .landing-page .btn-primary:hover::before {
          opacity: 1;
        }

        .landing-page .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(157, 63, 255, 0.45), 0 10px 28px rgba(138,43,226,0.28);
        }

        @media (max-width: 600px) {
          .landing-page .btn-nav {
            padding: 8px 14px;
            font-size: 0.85rem;
            border-radius: 12px;
          }
        }

        .landing-page .btn-secondary {
          background: rgba(255,255,255,0.04);
          color: var(--white);
          border: 1.5px solid var(--border);
          backdrop-filter: blur(14px);
        }

        .landing-page .btn-secondary:hover {
          border-color: var(--purple-bright);
          color: var(--purple-light);
          box-shadow: 0 0 18px var(--purple-glow2);
          transform: translateY(-2px);
        }

        .landing-page .btn-whatsapp {
          background: linear-gradient(135deg, #25D366, #1ebe5b);
          color: #fff;
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.35);
        }

        .landing-page .btn-whatsapp:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 36px rgba(37, 211, 102, 0.55);
        }

        .landing-page .btn-lg {
          font-size: 1.15rem;
          padding: 18px 44px;
          border-radius: 12px;
        }

        .landing-page .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 18px 0;
          transition: var(--transition);
        }

        .landing-page .navbar.scrolled {
          background: rgba(11, 11, 15, 0.55);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 12px 0;
        }

        .landing-page .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .landing-page .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .landing-page .navbar-logo img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 14px var(--purple-glow);
        }

        .landing-page .navbar-logo-text {
          font-family: var(--font-main);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--white);
          letter-spacing: 0.02em;
        }

        .landing-page .navbar-logo-text span {
          color: var(--purple-light);
        }

        .landing-page .navbar-cta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .landing-page .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        /* Purple Fireworks */
        .hero-fireworks {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .fw-particle {
          position: absolute;
          bottom: -10px;
          left: var(--x);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: #A855F7;
          box-shadow:
            0 0 6px #A855F7,
            0 0 12px #7C3AED,
            0 0 20px rgba(168, 85, 247, 0.6);
          opacity: 0;
          animation: fireworkRise var(--duration) ease-out infinite;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }

        .fw-particle.fw-violet {
          background: #7C3AED;
          box-shadow:
            0 0 6px #7C3AED,
            0 0 12px #6D28D9,
            0 0 20px rgba(124, 58, 237, 0.6);
        }

        .fw-particle.fw-pink {
          background: #D946EF;
          box-shadow:
            0 0 6px #D946EF,
            0 0 12px #A855F7,
            0 0 20px rgba(217, 70, 239, 0.6);
        }

        @keyframes fireworkRise {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0.5);
          }
          5% {
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(calc(sin(var(--delay, 0) * 137deg) * 40px)) scale(0.2);
          }
        }

        .landing-page .hero::after {
          content: '';
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 700px;
          background: radial-gradient(ellipse at center, rgba(138, 43, 226, 0.16) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .landing-page .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .landing-page .hero-content,
        .landing-page .hero-visual {
          position: relative;
          z-index: 1;
        }

        .landing-page .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--purple-light);
          background: rgba(138, 43, 226, 0.1);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 28px;
          backdrop-filter: blur(10px);
        }

        .landing-page .hero-badge .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--purple-bright);
          box-shadow: 0 0 8px var(--purple-bright);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .landing-page .hero-title {
          font-family: var(--font-main);
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 24px;
        }

        .landing-page .hero-title .highlight {
          color: var(--purple-bright);
          text-shadow: 0 0 30px rgba(138, 43, 226, 0.6);
          display: inline-block;
        }

        .landing-page .hero-subtitle {
          font-size: 1.15rem;
          color: var(--gray-light);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 520px;
          position: relative;
          z-index: 1;
        }

        .landing-page .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        /* Shimmer sweep no botão roxo */
        .landing-page .hero-buttons .btn-primary {
          position: relative;
          overflow: hidden;
        }

        .landing-page .hero-buttons .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.2),
            transparent
          );
          animation: shimmerSweep 3s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes shimmerSweep {
          0% { left: -100%; }
          40%, 100% { left: 150%; }
        }

        .landing-page .hero-buttons .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 0 40px rgba(138,43,226,0.7),
            0 0 80px rgba(168,85,247,0.4);
        }

        /* Ping rings no botão WhatsApp */
        .landing-page .hero-buttons .btn-whatsapp {
          position: relative;
          overflow: visible;
        }

        .landing-page .hero-buttons .btn-whatsapp::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 14px;
          border: 1.5px solid rgba(37,211,102,0.5);
          animation: waPing 2.5s ease-out infinite;
          pointer-events: none;
        }

        .landing-page .hero-buttons .btn-whatsapp::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 16px;
          border: 1px solid rgba(37,211,102,0.25);
          animation: waPing 2.5s ease-out infinite 0.5s;
          pointer-events: none;
        }

        @keyframes waPing {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.12); }
        }

        .landing-page .hero-buttons .btn-whatsapp:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 0 40px rgba(37,211,102,0.7),
            0 0 80px rgba(37,211,102,0.3);
        }

        .landing-page .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .landing-page .hero-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .landing-page .hero-logo-wrap::before {
          content: '';
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.22) 0%, transparent 70%);
          animation: breathe 4s ease-in-out infinite;
        }

        .landing-page .hero-logo-wrap::after {
          content: '';
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(138, 43, 226, 0.25);
          animation: rotate-ring 20s linear infinite;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .landing-page .hero-logo-img {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 60px rgba(138, 43, 226, 0.55), 0 0 120px rgba(138, 43, 226, 0.2);
          position: relative;
          z-index: 1;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }

        .landing-page .orbit-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--purple-bright);
          box-shadow: 0 0 12px var(--purple-bright);
        }

        .landing-page .orbit-dot:nth-child(1) {
          animation: orbit1 8s linear infinite;
        }

        .landing-page .orbit-dot:nth-child(2) {
          animation: orbit2 12s linear infinite;
          background: var(--purple-light);
          width: 7px;
          height: 7px;
        }

        .landing-page .orbit-dot:nth-child(3) {
          animation: orbit3 6s linear infinite;
          background: #fff;
          width: 5px;
          height: 5px;
          box-shadow: 0 0 8px #fff;
        }

        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }

        @keyframes orbit2 {
          from { transform: rotate(120deg) translateX(190px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(190px) rotate(-480deg); }
        }

        @keyframes orbit3 {
          from { transform: rotate(240deg) translateX(140px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(140px) rotate(-600deg); }
        }

        .landing-page .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid var(--border);
        }

        .landing-page .hero-stat-item {
          display: flex;
          flex-direction: column;
        }

        .landing-page .hero-stat-number {
          font-family: var(--font-main);
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--purple-light);
          text-shadow: 0 0 16px rgba(138,43,226,0.5);
          animation: statPulse 2s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes statPulse {
          0%, 100% {
            transform: scale(1);
            text-shadow: 0 0 16px rgba(138,43,226,0.5);
          }
          50% {
            transform: scale(1.05);
            text-shadow: 
              0 0 25px rgba(138,43,226,0.8),
              0 0 40px rgba(168, 85, 247, 0.6);
          }
        }

        .landing-page .hero-stat-item:nth-child(1) .hero-stat-number {
          animation-delay: 0s;
        }

        .landing-page .hero-stat-item:nth-child(2) .hero-stat-number {
          animation-delay: 0.3s;
        }

        .landing-page .hero-stat-item:nth-child(3) .hero-stat-number {
          animation-delay: 0.6s;
        }

        .landing-page .hero-stat-label {
          font-size: 0.82rem;
          color: var(--gray-light);
          font-weight: 500;
        }

        .landing-page .problema {
          background: linear-gradient(
            180deg,
            rgba(11, 11, 15, 0.14) 0%,
            rgba(19, 19, 28, 0.26) 50%,
            rgba(11, 11, 15, 0.14) 100%
          );
          backdrop-filter: blur(6px);
        }

        .landing-page .problema-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .landing-page .problema-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 32px;
        }

        .landing-page .problema-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: var(--transition);
          backdrop-filter: blur(16px);
        }

        .landing-page .problema-item:hover {
          border-color: rgba(138, 43, 226, 0.4);
          box-shadow: 0 0 20px var(--purple-glow2);
          transform: translateX(4px);
        }

        .landing-page .problema-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 10px;
          background: rgba(138, 43, 226, 0.12);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--purple-light);
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        /* Purple Energy Glow for problema icons */
        .landing-page .problema-icon::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 14px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.5) 0%,
            rgba(168, 85, 247, 0.25) 40%,
            transparent 70%
          );
          filter: blur(10px);
          opacity: 0.6;
          z-index: -1;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        .landing-page .problema-item:nth-child(1) .problema-icon::before {
          animation-delay: 0s;
        }

        .landing-page .problema-item:nth-child(2) .problema-icon::before {
          animation-delay: 0.8s;
        }

        .landing-page .problema-item:nth-child(3) .problema-icon::before {
          animation-delay: 1.6s;
        }

        .landing-page .problema-item-text strong {
          display: block;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--white);
          margin-bottom: 4px;
        }

        .landing-page .problema-item-text p {
          font-size: 0.88rem;
          color: var(--gray-light);
          line-height: 1.6;
        }

        .landing-page .alert-box {
          background: linear-gradient(135deg, rgba(138,43,226,0.12), rgba(138,43,226,0.05));
          border: 1px solid rgba(138,43,226,0.3);
          border-radius: 16px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(18px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Subtle Floating Orbs Background */
        .landing-page .alert-box::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(124, 58, 237, 0.08) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: orbFloat 8s ease-in-out infinite;
          filter: blur(40px);
          z-index: 0;
        }

        .landing-page .alert-box::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 250px;
          height: 250px;
          background: radial-gradient(
            circle,
            rgba(217, 70, 239, 0.12) 0%,
            rgba(168, 85, 247, 0.06) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: orbFloat 10s ease-in-out infinite reverse;
          filter: blur(40px);
          z-index: 0;
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 1;
          }
        }

        .landing-page .alert-box:hover {
          border-color: rgba(168, 85, 247, 0.5);
          box-shadow: 
            0 20px 60px rgba(138, 43, 226, 0.2),
            0 0 80px rgba(168, 85, 247, 0.1);
          transform: translateY(-4px);
        }

        .landing-page .alert-number {
          font-family: var(--font-main);
          font-size: 4.5rem;
          font-weight: 900;
          background: linear-gradient(
            135deg,
            #A855F7 0%,
            #D946EF 50%,
            #A855F7 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          animation: gradientFlow 4s ease infinite;
          filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.4));
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .landing-page .alert-box:hover .alert-number {
          animation: gradientFlow 2s ease infinite, numberFloat 0.6s ease-out;
          filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6));
        }

        @keyframes numberFloat {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Elegant Sparkles */
        .landing-page .alert-sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 
            0 0 10px rgba(168, 85, 247, 0.8),
            0 0 20px rgba(217, 70, 239, 0.6);
          opacity: 0;
          pointer-events: none;
          z-index: 2;
          animation: sparkleFloat 3s ease-in-out infinite;
        }

        .landing-page .alert-sparkle:nth-child(1) {
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .landing-page .alert-sparkle:nth-child(2) {
          top: 25%;
          right: 20%;
          animation-delay: 1s;
        }

        .landing-page .alert-sparkle:nth-child(3) {
          bottom: 30%;
          left: 25%;
          animation-delay: 2s;
        }

        @keyframes sparkleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(-5px) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1.5);
          }
          90% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
          }
        }

        /* Highlighted Text Animation - More Subtle */
        .landing-page .alert-highlight {
          position: relative;
          display: inline-block;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.2),
            rgba(217, 70, 239, 0.2)
          );
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .landing-page .alert-box:hover .alert-highlight {
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.3),
            rgba(217, 70, 239, 0.3)
          );
          color: #fff !important;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }

        .landing-page .alert-text {
          font-size: 1.05rem;
          color: var(--gray-light);
          line-height: 1.7;
        }

        .landing-page .alert-source {
          font-size: 0.75rem;
          color: var(--gray-light);
          margin-top: 16px;
        }

        .landing-page .solucao-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 56px;
        }

        .landing-page .solucao-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 28px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(16px);
        }

        /* Animated Gradient Border */
        .landing-page .solucao-card {
          background: 
            linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
            linear-gradient(
              var(--angle, 0deg),
              rgba(124, 58, 237, 0.4),
              rgba(168, 85, 247, 0.6),
              rgba(217, 70, 239, 0.4),
              rgba(124, 58, 237, 0.4)
            ) border-box;
          animation: borderRotate 4s linear infinite;
        }

        @keyframes borderRotate {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        /* Top Glow Line */
        .landing-page .solucao-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.8),
            rgba(217, 70, 239, 1),
            rgba(168, 85, 247, 0.8),
            transparent
          );
          opacity: 0;
          transition: all 0.6s ease;
          filter: blur(2px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
        }

        /* Plasma Background Effect */
        .landing-page .solucao-card::after {
          content: '';
          position: absolute;
          inset: -100%;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(168, 85, 247, 0.15) 0%,
            rgba(124, 58, 237, 0.08) 25%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
          pointer-events: none;
        }

        .landing-page .solucao-card:hover::after {
          opacity: 1;
        }

        .landing-page .solucao-card:hover {
          border-color: rgba(168, 85, 247, 0.8);
          box-shadow: 
            0 0 60px rgba(138, 43, 226, 0.4),
            0 0 100px rgba(168, 85, 247, 0.2),
            0 20px 60px rgba(138, 43, 226, 0.3),
            inset 0 0 80px rgba(138, 43, 226, 0.05);
          transform: translateY(-12px) scale(1.02);
        }

        .landing-page .solucao-card:hover::before {
          opacity: 1;
          left: 100%;
          transition: left 0.8s ease;
        }

        /* Holographic Scan Lines */
        .landing-page .card-hologram {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(168, 85, 247, 0.03) 0px,
            rgba(168, 85, 247, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
          animation: hologramScan 2s linear infinite;
        }

        .landing-page .solucao-card:hover .card-hologram {
          opacity: 1;
        }

        @keyframes hologramScan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(20px);
          }
        }

        /* Explosive Particles */
        .landing-page .card-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, #D946EF, #A855F7);
          box-shadow: 
            0 0 15px #D946EF,
            0 0 30px #A855F7;
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }

        .landing-page .solucao-card:hover .card-particle {
          animation: particleExplode 1.5s ease-out infinite;
        }

        .landing-page .card-particle:nth-child(1) {
          top: 50%;
          left: 50%;
          animation-delay: 0s;
        }

        .landing-page .card-particle:nth-child(2) {
          top: 50%;
          left: 50%;
          animation-delay: 0.25s;
        }

        .landing-page .card-particle:nth-child(3) {
          top: 50%;
          left: 50%;
          animation-delay: 0.5s;
        }

        .landing-page .card-particle:nth-child(4) {
          top: 50%;
          left: 50%;
          animation-delay: 0.75s;
        }

        .landing-page .card-particle:nth-child(5) {
          top: 50%;
          left: 50%;
          animation-delay: 1s;
        }

        .landing-page .card-particle:nth-child(6) {
          top: 50%;
          left: 50%;
          animation-delay: 1.25s;
        }

        @keyframes particleExplode {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--tx, 100px) * cos(var(--angle, 0deg))),
              calc(var(--ty, 100px) * sin(var(--angle, 0deg)))
            ) scale(0);
            opacity: 0;
          }
        }

        .landing-page .card-particle:nth-child(1) {
          --angle: 0deg;
          --tx: 120px;
          --ty: 120px;
        }

        .landing-page .card-particle:nth-child(2) {
          --angle: 60deg;
          --tx: 100px;
          --ty: 100px;
        }

        .landing-page .card-particle:nth-child(3) {
          --angle: 120deg;
          --tx: 110px;
          --ty: 110px;
        }

        .landing-page .card-particle:nth-child(4) {
          --angle: 180deg;
          --tx: 130px;
          --ty: 130px;
        }

        .landing-page .card-particle:nth-child(5) {
          --angle: 240deg;
          --tx: 90px;
          --ty: 90px;
        }

        .landing-page .card-particle:nth-child(6) {
          --angle: 300deg;
          --tx: 115px;
          --ty: 115px;
        }

        .landing-page .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(138,43,226,0.2), rgba(138,43,226,0.06));
          border: 1px solid rgba(138,43,226,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--purple-light);
          margin-bottom: 24px;
          box-shadow: 0 0 20px rgba(138,43,226,0.15);
          position: relative;
          z-index: 1;
        }

        /* Purple Energy Glow Effect */
        .landing-page .card-icon::before {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 18px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.6) 0%,
            rgba(168, 85, 247, 0.3) 40%,
            transparent 70%
          );
          filter: blur(12px);
          opacity: 0.5;
          z-index: -1;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        /* Icon Rotation on Hover */
        .landing-page .solucao-card:hover .card-icon {
          animation: iconSpin 0.6s ease-out;
          box-shadow: 
            0 0 40px rgba(138, 43, 226, 0.6),
            0 0 80px rgba(168, 85, 247, 0.4);
        }

        @keyframes iconSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* Title Glow on Hover */
        .landing-page .solucao-card:hover .card-title {
          color: #fff;
          text-shadow: 
            0 0 20px rgba(168, 85, 247, 0.8),
            0 0 40px rgba(138, 43, 226, 0.5);
          animation: titlePulse 0.5s ease-out;
        }

        @keyframes titlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Energy Waves Expanding from Center */
        .landing-page .energy-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 2px solid rgba(168, 85, 247, 0.6);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .landing-page .solucao-card:hover .energy-wave {
          animation: waveExpand 1.5s ease-out infinite;
        }

        .landing-page .energy-wave:nth-child(8) {
          animation-delay: 0s;
        }

        .landing-page .energy-wave:nth-child(9) {
          animation-delay: 0.5s;
        }

        .landing-page .energy-wave:nth-child(10) {
          animation-delay: 1s;
        }

        @keyframes waveExpand {
          0% {
            width: 0;
            height: 0;
            margin-left: 0;
            margin-top: 0;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            width: 400px;
            height: 400px;
            margin-left: -200px;
            margin-top: -200px;
            opacity: 0;
            border-width: 1px;
          }
        }

        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.05); 
          }
        }

        /* Stagger animation for each card */
        .landing-page .solucao-card:nth-child(1) .card-icon::before {
          animation-delay: 0s;
        }

        .landing-page .solucao-card:nth-child(2) .card-icon::before {
          animation-delay: 0.8s;
        }

        .landing-page .solucao-card:nth-child(3) .card-icon::before {
          animation-delay: 1.6s;
        }

        .landing-page .card-title {
          font-family: var(--font-main);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 12px;
        }

        .landing-page .card-text {
          font-size: 0.9rem;
          color: var(--gray-light);
          line-height: 1.7;
        }

        .landing-page .card-feature-list {
          list-style: none;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .landing-page .card-feature-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--gray-light);
        }

        .landing-page .card-feature-list li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--purple-bright);
          box-shadow: 0 0 6px var(--purple-bright);
          flex-shrink: 0;
        }

        .landing-page .como-funciona {
          background: rgba(19, 19, 28, 0.22);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px);
        }

        .landing-page .como-funciona::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(138,43,226,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .landing-page .steps-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 60px;
          position: relative;
        }

        .landing-page .steps-container::before {
          content: '';
          position: absolute;
          top: 44px;
          left: calc(16.66% + 20px);
          right: calc(16.66% + 20px);
          height: 1px;
          background: linear-gradient(90deg, var(--purple-neon), var(--purple-bright), var(--purple-neon));
          opacity: 0.3;
          z-index: 0;
        }

        /* Animated Energy Overlay */
        .landing-page .steps-container::after {
          content: '';
          position: absolute;
          top: 43px;
          left: calc(16.66% + 20px);
          right: calc(16.66% + 20px);
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 15%,
            rgba(124, 58, 237, 0.3) 35%,
            rgba(168, 85, 247, 0.7) 45%,
            rgba(217, 70, 239, 1) 50%,
            rgba(168, 85, 247, 0.7) 55%,
            rgba(124, 58, 237, 0.3) 65%,
            transparent 85%,
            transparent 100%
          );
          background-size: 200% 100%;
          background-position: -100% 0;
          animation: energy-flow 3s ease-in-out infinite;
          filter: blur(1.5px);
          box-shadow: 
            0 0 12px rgba(168, 85, 247, 0.8),
            0 0 24px rgba(124, 58, 237, 0.5),
            0 0 36px rgba(217, 70, 239, 0.3);
          z-index: 0;
          will-change: background-position;
          border-radius: 2px;
        }

        @keyframes energy-flow {
          0% {
            background-position: -100% 0;
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 100% 0;
            opacity: 0.8;
          }
        }

        /* Energy Particles */
        .landing-page .steps-container {
          overflow: visible;
        }

        .landing-page .steps-container .energy-particle {
          position: absolute;
          top: 42px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, #D946EF, #A855F7);
          box-shadow: 
            0 0 10px #D946EF,
            0 0 20px #A855F7,
            0 0 30px rgba(217, 70, 239, 0.5);
          opacity: 0;
          z-index: 0;
          will-change: transform, opacity;
          filter: blur(0.5px);
        }

        .landing-page .steps-container .energy-particle:nth-child(1) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 0s;
        }

        .landing-page .steps-container .energy-particle:nth-child(2) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .landing-page .steps-container .energy-particle:nth-child(3) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .landing-page .steps-container .energy-particle:nth-child(4) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .landing-page .steps-container .energy-particle:nth-child(5) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 2s;
        }

        .landing-page .steps-container .energy-particle:nth-child(6) {
          animation: particle-flow 3s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        @keyframes particle-flow {
          0% {
            left: calc(16.66% + 20px);
            opacity: 0;
            transform: translateY(0) scale(0.3);
          }
          5% {
            opacity: 0.6;
          }
          15% {
            opacity: 1;
            transform: translateY(-3px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(3px) scale(1.3);
          }
          85% {
            opacity: 1;
            transform: translateY(-3px) scale(1);
          }
          95% {
            opacity: 0.6;
          }
          100% {
            left: calc(83.34% - 20px);
            opacity: 0;
            transform: translateY(0) scale(0.3);
          }
        }

        .landing-page .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          position: relative;
        }

        .landing-page .step-number {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-main);
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          box-shadow: 0 0 30px var(--purple-glow), 0 0 60px rgba(138,43,226,0.2);
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
          animation: step-pulse 3s ease-in-out infinite;
        }

        .landing-page .step-item:nth-child(7) .step-number {
          animation-delay: 0s;
        }

        .landing-page .step-item:nth-child(8) .step-number {
          animation-delay: 1s;
        }

        .landing-page .step-item:nth-child(9) .step-number {
          animation-delay: 2s;
        }

        @keyframes step-pulse {
          0%, 100% {
            box-shadow: 0 0 30px var(--purple-glow), 0 0 60px rgba(138,43,226,0.2);
          }
          33% {
            box-shadow: 
              0 0 40px var(--purple-glow), 
              0 0 80px rgba(138,43,226,0.4),
              0 0 100px rgba(217, 70, 239, 0.3);
          }
        }

        .landing-page .step-title {
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 12px;
        }

        .landing-page .step-text {
          font-size: 0.9rem;
          color: var(--gray-light);
          line-height: 1.7;
        }

        .landing-page .autoridade-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .landing-page .autoridade-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .landing-page .metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        /* Animated Border Glow */
        .landing-page .metric-card {
          background: 
            linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
            linear-gradient(
              135deg,
              rgba(124, 58, 237, 0.3),
              rgba(168, 85, 247, 0.5),
              rgba(217, 70, 239, 0.3),
              rgba(168, 85, 247, 0.5),
              rgba(124, 58, 237, 0.3)
            ) border-box;
          background-size: 100% 100%, 300% 300%;
          animation: borderGlow 4s ease infinite;
        }

        @keyframes borderGlow {
          0%, 100% {
            background-position: 0% 0%, 0% 50%;
          }
          50% {
            background-position: 0% 0%, 100% 50%;
          }
        }

        /* Epic Energy Glow Background */
        .landing-page .metric-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(124, 58, 237, 0.4),
            rgba(168, 85, 247, 0.4),
            rgba(217, 70, 239, 0.4),
            rgba(168, 85, 247, 0.4),
            rgba(124, 58, 237, 0.4)
          );
          background-size: 300% 300%;
          opacity: 0;
          z-index: -1;
          animation: gradientShift 4s ease infinite;
          filter: blur(12px);
          transition: opacity 0.4s ease;
        }

        .landing-page .metric-card:hover::before {
          opacity: 0.6;
        }

        /* Scanning Energy Line */
        .landing-page .metric-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.3) 50%,
            transparent
          );
          animation: energyScan 3s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes energyScan {
          0% {
            left: -100%;
          }
          50%, 100% {
            left: 100%;
          }
        }

        /* Floating Energy Particles */
        .landing-page .metric-card {
          --particle-color: rgba(168, 85, 247, 0.8);
        }

        .landing-page .metric-card:nth-child(1) { --particle-color: rgba(124, 58, 237, 0.8); }
        .landing-page .metric-card:nth-child(2) { --particle-color: rgba(168, 85, 247, 0.8); }
        .landing-page .metric-card:nth-child(3) { --particle-color: rgba(217, 70, 239, 0.8); }
        .landing-page .metric-card:nth-child(4) { --particle-color: rgba(147, 51, 234, 0.8); }

        .landing-page .metric-card:hover {
          border-color: rgba(168, 85, 247, 0.8);
          box-shadow: 
            0 0 40px rgba(138, 43, 226, 0.4),
            0 0 80px rgba(168, 85, 247, 0.2),
            inset 0 0 60px rgba(138, 43, 226, 0.1);
          transform: translateY(-8px) scale(1.02);
        }

        .landing-page .metric-number {
          font-family: var(--font-main);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--purple-light);
          text-shadow: 
            0 0 20px rgba(168, 85, 247, 0.8),
            0 0 40px rgba(138, 43, 226, 0.5),
            0 0 60px rgba(217, 70, 239, 0.3);
          line-height: 1;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
          animation: numberPulse 2s ease-in-out infinite;
        }

        @keyframes numberPulse {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(168, 85, 247, 0.8),
              0 0 40px rgba(138, 43, 226, 0.5),
              0 0 60px rgba(217, 70, 239, 0.3);
          }
          50% {
            text-shadow: 
              0 0 30px rgba(168, 85, 247, 1),
              0 0 60px rgba(138, 43, 226, 0.8),
              0 0 90px rgba(217, 70, 239, 0.5);
          }
        }

        .landing-page .metric-card:hover .metric-number {
          animation: numberExplosion 0.6s ease-out;
          color: #fff;
        }

        @keyframes numberExplosion {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
            text-shadow: 
              0 0 40px rgba(168, 85, 247, 1),
              0 0 80px rgba(138, 43, 226, 1),
              0 0 120px rgba(217, 70, 239, 0.8);
          }
          100% {
            transform: scale(1);
          }
        }

        .landing-page .metric-label {
          font-size: 0.85rem;
          color: var(--gray-light);
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }

        /* Stagger animation delays */
        .landing-page .metric-card:nth-child(1)::after {
          animation-delay: 0s;
        }

        .landing-page .metric-card:nth-child(2)::after {
          animation-delay: 0.75s;
        }

        .landing-page .metric-card:nth-child(3)::after {
          animation-delay: 1.5s;
        }

        .landing-page .metric-card:nth-child(4)::after {
          animation-delay: 2.25s;
        }

        .landing-page .metric-card:nth-child(1) .metric-number {
          animation-delay: 0s;
        }

        .landing-page .metric-card:nth-child(2) .metric-number {
          animation-delay: 0.5s;
        }

        .landing-page .metric-card:nth-child(3) .metric-number {
          animation-delay: 1s;
        }

        .landing-page .metric-card:nth-child(4) .metric-number {
          animation-delay: 1.5s;
        }

        /* Floating Energy Particles Inside Cards */
        .landing-page .metric-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--particle-color);
          box-shadow: 
            0 0 10px var(--particle-color),
            0 0 20px var(--particle-color);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .landing-page .metric-card:hover .metric-particle {
          animation: particleFloat 2s ease-in-out infinite;
        }

        .landing-page .metric-particle:nth-child(1) {
          left: 20%;
          bottom: 10%;
          animation-delay: 0s;
        }

        .landing-page .metric-particle:nth-child(2) {
          left: 50%;
          bottom: 10%;
          animation-delay: 0.6s;
        }

        .landing-page .metric-particle:nth-child(3) {
          left: 80%;
          bottom: 10%;
          animation-delay: 1.2s;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) translateX(5px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-60px) translateX(-10px) scale(1.5);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-120px) translateX(15px) scale(0.5);
            opacity: 0;
          }
        }

        .landing-page .autoridade-quote {
          background: linear-gradient(135deg, rgba(138,43,226,0.08), rgba(138,43,226,0.02));
          border: 1px solid var(--border);
          border-left: 3px solid var(--purple-bright);
          border-radius: 0 16px 16px 0;
          padding: 28px 28px;
          margin-top: 28px;
          font-size: 1rem;
          color: var(--gray-light);
          line-height: 1.75;
          font-style: italic;
          backdrop-filter: blur(14px);
        }

        .landing-page .cta-final {
          background: rgba(11, 11, 15, 0.1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(4px);
        }

        .landing-page .cta-final::before {
          content: '';
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(ellipse at center bottom, rgba(138,43,226,0.2) 0%, transparent 65%);
          pointer-events: none;
        }

        .landing-page .cta-box {
          background: linear-gradient(135deg, rgba(138,43,226,0.16), rgba(138,43,226,0.05));
          border: 1px solid rgba(138,43,226,0.3);
          border-radius: 28px;
          padding: 72px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(18px);
          box-shadow: 0 0 60px rgba(138, 43, 226, 0.08);
        }

        /* Cosmic Nebula Background */
        .landing-page .cta-box::before {
          content: '';
          position: absolute;
          inset: -100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(217, 70, 239, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 60%);
          animation: nebulaDrift 20s ease-in-out infinite;
          filter: blur(60px);
          z-index: 0;
        }

        @keyframes nebulaDrift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) rotate(240deg) scale(0.9);
          }
        }

        /* Dimensional Portal Effect */
        .landing-page .cta-box::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          margin-left: -150px;
          margin-top: -150px;
          background: 
            radial-gradient(circle, 
              rgba(168, 85, 247, 0.2) 0%,
              rgba(217, 70, 239, 0.15) 30%,
              transparent 70%
            );
          border-radius: 50%;
          animation: portalPulse 4s ease-in-out infinite;
          filter: blur(40px);
          z-index: 0;
        }

        @keyframes portalPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
        }

        /* Cosmic Stars */
        .landing-page .cosmic-star {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(168, 85, 247, 0.6),
            0 0 30px rgba(217, 70, 239, 0.4);
          animation: starTwinkle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          z-index: 1;
          pointer-events: none;
        }

        @keyframes starTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        /* Orbital Rings */
        .landing-page .orbital-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .landing-page .ring-1 {
          width: 400px;
          height: 400px;
          margin-left: -200px;
          margin-top: -200px;
          animation: ringRotate 20s linear infinite;
          border-style: dashed;
        }

        .landing-page .ring-2 {
          width: 550px;
          height: 550px;
          margin-left: -275px;
          margin-top: -275px;
          animation: ringRotate 30s linear infinite reverse;
          opacity: 0.5;
        }

        .landing-page .ring-3 {
          width: 700px;
          height: 700px;
          margin-left: -350px;
          margin-top: -350px;
          animation: ringRotate 40s linear infinite;
          opacity: 0.3;
          border-style: dotted;
        }

        @keyframes ringRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Energy Particles Orbiting */
        .landing-page .energy-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #D946EF, #A855F7);
          border-radius: 50%;
          box-shadow: 
            0 0 15px #D946EF,
            0 0 30px #A855F7,
            0 0 45px rgba(217, 70, 239, 0.5);
          animation: particleOrbit 8s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes particleOrbit {
          from {
            transform: 
              rotate(var(--angle)) 
              translateX(250px) 
              rotate(calc(-1 * var(--angle)));
          }
          to {
            transform: 
              rotate(calc(var(--angle) + 360deg)) 
              translateX(250px) 
              rotate(calc(-1 * (var(--angle) + 360deg)));
          }
        }

        /* Title with Cosmic Glow */
        .landing-page .cta-title {
          font-family: var(--font-main);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 20px;
          position: relative;
          z-index: 3;
          animation: titleFloat 6s ease-in-out infinite;
          text-shadow: 
            0 0 20px rgba(168, 85, 247, 0.5),
            0 0 40px rgba(217, 70, 239, 0.3);
        }

        @keyframes titleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Subtitle with Glow */
        .landing-page .cta-subtitle {
          font-size: 1.1rem;
          color: var(--gray-light);
          max-width: 560px;
          margin: 0 auto 44px;
          line-height: 1.75;
          position: relative;
          z-index: 3;
        }

        /* Buttons with Cosmic Energy */
        .landing-page .cta-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
          position: relative;
          z-index: 3;
        }

        .landing-page .cta-box:hover {
          box-shadow: 
            0 0 100px rgba(138, 43, 226, 0.3),
            0 0 150px rgba(168, 85, 247, 0.2),
            inset 0 0 100px rgba(138, 43, 226, 0.05);
          border-color: rgba(168, 85, 247, 0.6);
        }

        .landing-page .cta-box:hover .cosmic-star {
          animation-duration: 1.5s;
        }

        .landing-page .cta-box:hover .orbital-ring {
          border-color: rgba(168, 85, 247, 0.6);
        }

        .landing-page .cta-box:hover .energy-particle {
          animation-duration: 4s;
          box-shadow: 
            0 0 20px #D946EF,
            0 0 40px #A855F7,
            0 0 60px rgba(217, 70, 239, 0.8);
        }

        .landing-page .footer {
          background: rgba(17, 17, 24, 0.42);
          border-top: 1px solid var(--border);
          padding: 48px 0 32px;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(16px);
        }

        .landing-page .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 32px;
        }

        .landing-page .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .landing-page .footer-brand img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 12px var(--purple-glow);
        }

        .landing-page .footer-brand-name {
          font-family: var(--font-main);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--white);
        }

        .landing-page .footer-tagline {
          font-size: 0.88rem;
          color: var(--gray-light);
          line-height: 1.65;
          margin-bottom: 20px;
        }

        .landing-page .footer-col-title {
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--white);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .landing-page .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .landing-page .footer-list li {
          font-size: 0.88rem;
          color: var(--gray-light);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .landing-page .footer-list li i {
          color: var(--purple-light);
          font-size: 0.8rem;
          width: 14px;
        }

        .landing-page .footer-list a {
          color: var(--gray-light);
          text-decoration: none;
          transition: color 0.2s;
        }

        .landing-page .footer-list a:hover {
          color: var(--purple-light);
        }

        .landing-page .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .landing-page .footer-copy {
          font-size: 0.82rem;
          color: var(--gray-light);
        }

        .landing-page .footer-copy span {
          color: var(--purple-light);
        }

        .landing-page .whatsapp-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366, #1ebe5b);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.6rem;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.45);
          transition: var(--transition);
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1s both;
        }

        .landing-page .whatsapp-float:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 36px rgba(37, 211, 102, 0.65);
        }

        .landing-page .whatsapp-float::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.35);
          animation: ping 2s ease-out infinite;
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes bounce-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .landing-page .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .landing-page .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .landing-page .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .landing-page .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .landing-page .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .landing-page .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .landing-page .delay-1 { transition-delay: 0.1s; }
        .landing-page .delay-2 { transition-delay: 0.2s; }
        .landing-page .delay-3 { transition-delay: 0.3s; }
        .landing-page .delay-4 { transition-delay: 0.4s; }

        @media (max-width: 900px) {
          .landing-page .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .landing-page .hero-buttons {
            justify-content: center;
          }

          .landing-page .hero-stats {
            justify-content: center;
          }

          .landing-page .hero-visual {
            order: -1;
          }

          .landing-page .hero-logo-img {
            width: 200px;
            height: 200px;
          }

          .landing-page .hero-logo-wrap::before { width: 280px; height: 280px; }
          .landing-page .hero-logo-wrap::after { width: 240px; height: 240px; }

          .landing-page .problema-grid {
            grid-template-columns: 1fr;
          }

          .landing-page .solucao-cards {
            grid-template-columns: 1fr;
          }

          .landing-page .steps-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .landing-page .steps-container::before { display: none; }
          .landing-page .steps-container::after { display: none; }
          .landing-page .steps-container .energy-particle { display: none; }

          .landing-page .autoridade-inner {
            grid-template-columns: 1fr;
          }

          .landing-page .footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .landing-page .cta-box {
            padding: 48px 28px;
          }

          .landing-page .navbar-cta .btn-secondary {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .landing-page .section { padding: 72px 0; }

          .landing-page .hero-stats {
            flex-wrap: wrap;
            gap: 24px;
          }

          .landing-page .autoridade-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .landing-page .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .landing-page .btn-lg {
            width: 100%;
            padding: 16px 24px;
            font-size: 1rem;
          }

          .landing-page .hero-buttons,
          .landing-page .cta-buttons {
            flex-direction: column;
          }
        }

        /* ======================== FAQ SECTION ======================== */
        .faq-section {
          background: rgba(10, 5, 25, 0.3);
        }

        .faq-container {
          max-width: 800px;
          margin: 48px auto 0;
        }

        .faq-item {
          background: rgba(17, 17, 24, 0.6);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 16px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: rgba(124, 58, 237, 0.4);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.1);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(124, 58, 237, 0.05);
        }

        .faq-question.active {
          background: rgba(124, 58, 237, 0.08);
        }

        .faq-question-text {
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--white);
          margin: 0;
          padding-right: 20px;
          line-height: 1.4;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--purple-bright);
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.1);
          transition: all 0.3s ease;
        }

        .faq-question:hover .faq-icon {
          background: rgba(124, 58, 237, 0.2);
          transform: scale(1.1);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .faq-answer.open {
          max-height: 500px;
          padding: 0 28px 24px 28px;
        }

        .faq-answer p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--gray-light);
          margin: 0;
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 20px 20px;
          }

          .faq-question-text {
            font-size: 1rem;
          }

          .faq-answer.open {
            padding: 0 20px 20px 20px;
          }

          .faq-answer p {
            font-size: 0.95rem;
          }
        }
      `}</style>

      {/* FAQ Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Quanto custa criar um site em Curitiba?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O valor de um site pode variar de acordo com a complexidade do projeto. Na Pulse Futuro, temos planos a partir de R$ 350, ideais para empresas que querem começar com um site profissional."
              }
            },
            {
              "@type": "Question",
              "name": "Em quanto tempo meu site fica pronto?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O prazo médio de entrega é de 3 a 7 dias, dependendo do tipo de site e das informações enviadas."
              }
            },
            {
              "@type": "Question",
              "name": "O site já vem otimizado para o Google?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Todos os sites são entregues com técnicas de SEO aplicadas, como estrutura correta e carregamento rápido."
              }
            },
            {
              "@type": "Question",
              "name": "Vocês fazem landing pages também?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Criamos landing pages focadas em conversão para gerar contatos e vendas."
              }
            },
            {
              "@type": "Question",
              "name": "O site funciona no celular?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Todos os nossos sites são totalmente responsivos e funcionam perfeitamente em celulares."
              }
            },
            {
              "@type": "Question",
              "name": "Ter um site realmente traz clientes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Um site aumenta sua credibilidade e permite que sua empresa seja encontrada no Google."
              }
            }
          ]
        })}
      </script>
    </div>
  );
}