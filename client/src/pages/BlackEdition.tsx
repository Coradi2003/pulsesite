import React, { useEffect } from 'react';
import { Shield, Zap, Target, ArrowRight, Check, Rocket } from 'lucide-react';
import '../styles/black-edition.css';

// WhatsApp CTA Link Generator
const WHATSAPP_NUMBER = '5541984606633';
const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function BlackEdition() {
  useEffect(() => {
    // Modify body to prevent standard background interference just in case
    document.body.style.background = '#050505';
    
    // Add scroll animations logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('be-animate-slide-up');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.be-animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      document.body.style.background = '';
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="black-edition">
      {/* Navigation */}
      <nav className="be-nav">
        <div className="be-container be-nav-inner">
          <div className="be-nav-logo">
            <img src="/logo.png" alt="Pulse Futuro Logo" width={32} height={32} />
            Pulse<span>Futuro</span>
          </div>
          <a href={getWhatsAppLink("Olá! Quero saber mais sobre os projetos Elite.")} target="_blank" rel="noopener noreferrer" className="be-btn-outline">
            Falar com especialista
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="be-hero">
        <div className="be-hero-glow"></div>
        <div className="be-container">
          <div className="be-hero-content be-animate-on-scroll">
            <div className="be-badge">Projetos Elite</div>
            <h1 className="be-hero-title">
              Elevando marcas ao <br />
              <span>Padrão Absoluto.</span>
            </h1>
            <p className="be-hero-subtitle be-animate-on-scroll be-delay-100">
              Não fazemos apenas sites. Construímos presenças digitais luxuosas, calculadas
              e projetadas em cada pixel para máxima autoridade e conversão implacável.
            </p>
            <div className="be-hero-actions be-animate-on-scroll be-delay-200">
              <a href="#plans" className="be-btn-primary">
                Ver Projetos Exclusivos <ArrowRight className="w-4 h-4" />
              </a>
              <a href={getWhatsAppLink("Quero construir a autoridade digital da minha marca")} target="_blank" rel="noopener noreferrer" className="be-btn-secondary">
                Agendar Reunião de Valor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Features */}
      <section className="be-section">
        <div className="be-container">
          <div className="be-section-header be-animate-on-scroll">
            <h2 className="be-section-title">Design Sem Concessões.</h2>
            <p className="be-text-secondary">A diferença entre estar na internet e dominar o seu mercado.</p>
          </div>
          
          <div className="be-grid">
            <div className="be-card be-animate-on-scroll be-delay-100">
              <div className="be-card-icon"><Target className="w-6 h-6" /></div>
              <h3 className="be-card-title">Precisão Cirúrgica</h3>
              <p className="be-card-text">
                Sem elementos poluídos. Utilizamos arquitetura de UX minimalista onde
                cada espaçamento atrai o olhar do cliente exatamente para a conversão.
              </p>
            </div>
            
            <div className="be-card be-animate-on-scroll be-delay-200">
              <div className="be-card-icon"><Zap className="w-6 h-6" /></div>
              <h3 className="be-card-title">Performance Extrema</h3>
              <p className="be-card-text">
                Construção state-of-the-art. Tempos de carregamento otimizados
                ao milissegundo para garantir retenção absoluta no tráfego pago.
              </p>
            </div>
            
            <div className="be-card be-animate-on-scroll be-delay-300">
              <div className="be-card-icon"><Shield className="w-6 h-6" /></div>
              <h3 className="be-card-title">Autoridade Imediata</h3>
              <p className="be-card-text">
                Um design luxuoso aumenta a percepção de valor instantaneamente.
                Faça o seu serviço parecer naturalmente o mais valorizado do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Credibility */}
      <section className="be-trust-section">
        <div className="be-container">
          <div className="be-trust-grid be-animate-on-scroll">
            <div className="be-trust-metric">
              <span className="be-trust-number">97%</span>
              <span className="be-trust-label">Retenção de Clientes</span>
            </div>
            <div className="be-trust-divider"></div>
            <div className="be-trust-metric">
              <span className="be-trust-number">3x</span>
              <span className="be-trust-label">Percepção de Valor</span>
            </div>
            <div className="be-trust-divider"></div>
            <div className="be-trust-metric">
              <span className="be-trust-number">Elite</span>
              <span className="be-trust-label">Padrão de Qualidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Pricing */}
      <section className="be-section" id="plans">
        <div className="be-container">
          <div className="be-section-header be-animate-on-scroll">
            <h2 className="be-section-title">O Padrão Elite.</h2>
            <p className="be-text-secondary">Escolha a escala da sua presença digital corporativa.</p>
          </div>

          <div className="be-pricing-grid">
            {/* Plan 1 */}
            <div className="be-plan be-animate-on-scroll be-delay-100">
              <h3 className="be-plan-name">Assinatura Essential</h3>
              <div className="be-plan-price">
                <span>R$</span> 3.500
              </div>
              <p className="be-text-secondary">Landing Page cinematográfica para alta conversão em lançamentos e serviços.</p>
              
              <div className="be-plan-divider"></div>
              
              <ul className="be-plan-features">
                <li><Check className="w-5 h-5" /> Arquitetura de Conversão Premium</li>
                <li><Check className="w-5 h-5" /> Design Minimalista Elite</li>
                <li><Check className="w-5 h-5" /> Velocidade Extrema (Grade A)</li>
                <li><Check className="w-5 h-5" /> Otimização Mobile Flawless</li>
                <li><Check className="w-5 h-5" /> Setup de Analytics & Pixels</li>
              </ul>
              
              <a href={getWhatsAppLink("Gostaria de solicitar o projeto Essential Elite de R$3.500")} target="_blank" rel="noopener noreferrer" className="be-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Selecionar Essential
              </a>
            </div>

            {/* Plan 2 - Featured */}
            <div className="be-plan be-plan-featured be-animate-on-scroll be-delay-200">
              <div className="be-plan-featured-label">Padrão Ouro</div>
              <h3 className="be-plan-name" style={{ color: '#fff' }}>Assinatura Corporate</h3>
              <div className="be-plan-price" style={{ color: '#fff' }}>
                <span>R$</span> 7.900
              </div>
              <p className="be-text-secondary">Presença digital completa e imponente para empresas consolidadas.</p>
              
              <div className="be-plan-divider"></div>
              
              <ul className="be-plan-features">
                <li><Check className="w-5 h-5" /> Até 8 Páginas Corporativas</li>
                <li><Check className="w-5 h-5" /> Identidade Visual Expandida</li>
                <li><Check className="w-5 h-5" /> Micro-interações Cinemáticas</li>
                <li><Check className="w-5 h-5" /> CMS Próprio para Blog / Projetos</li>
                <li><Check className="w-5 h-5" /> SEO Avançado e Estrutural</li>
                <li><Check className="w-5 h-5" /> Suporte & Manutenção Priority (3 Meses)</li>
              </ul>
              
              <a href={getWhatsAppLink("Gostaria de solicitar o projeto Corporate Elite de R$7.900")} target="_blank" rel="noopener noreferrer" className="be-btn-primary">
                Aplicar para Corporate
              </a>
            </div>

            {/* Plan 3 */}
            <div className="be-plan be-animate-on-scroll be-delay-300">
              <h3 className="be-plan-name">Assinatura Bespoke</h3>
              <div className="be-plan-price">
                <span>R$</span> 15k+
              </div>
              <p className="be-text-secondary">Soluções feitas sob medida, sem limitações. Engenharia de software e design puro.</p>
              
              <div className="be-plan-divider"></div>
              
              <ul className="be-plan-features">
                <li><Check className="w-5 h-5" /> Sistemas Web Customizados</li>
                <li><Check className="w-5 h-5" /> Dashboard Administrativo</li>
                <li><Check className="w-5 h-5" /> Integrações via API (ERP/CRM)</li>
                <li><Check className="w-5 h-5" /> Automação de Fluxos Internos</li>
                <li><Check className="w-5 h-5" /> UX Research Dedicado</li>
              </ul>
              
              <a href={getWhatsAppLink("Gostaria de agendar uma consultoria para um projeto Bespoke (Software Edge)")} target="_blank" rel="noopener noreferrer" className="be-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Agendar Consultoria
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="be-cta-section">
        <div className="be-container">
          <div className="be-cta-content be-animate-on-scroll">
            <h2 className="be-cta-title">A excelência aguarda.</h2>
            <p className="be-text-secondary" style={{ marginBottom: '2.5rem', fontSize: '1.125rem' }}>
              Deixe a concorrência no passado. Junte-se ao seleto grupo de empresas
              que operam no mais alto nível de sofisticação digital.
            </p>
            <a href={getWhatsAppLink("Estou pronto para transformar a minha marca para o padrão Elite")} target="_blank" rel="noopener noreferrer" className="be-cta-btn">
              <Rocket className="w-5 h-5" /> Iniciar Transformação Digital
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="be-footer">
        <div className="be-container be-footer-inner">
          <div className="be-nav-logo" style={{ fontSize: '1.125rem' }}>
            Pulse<span style={{ color: 'var(--be-text-secondary)' }}>Futuro</span>
            <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', marginTop: '0.2rem', color: '#7c3aed', fontWeight: 600 }}>BLACK EDITION</span>
          </div>
          <p>© {new Date().getFullYear()} Pulse Futuro. Projetado no mais alto padrão.</p>
        </div>
      </footer>
    </div>
  );
}
