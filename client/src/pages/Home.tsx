import { useEffect } from 'react';
import { Search, UserX, TrendingUp, MonitorSmartphone, Smartphone, Target, Rocket, ChevronRight, MapPin, Mail, Instagram } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l149.5-39.2c32.8 18 69.4 27.5 106.6 27.5h.1c122.3 0 221.9-99.5 221.9-222 0-59.3-23.1-115-65-156.9zM224 457.1c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 376.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 50.1 0 97.2 19.5 132.6 54.9C392.2 176 411.7 223.1 411.7 274c0 101.9-83 184.9-184.9 184.9zM324.9 308.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.5 7.4-14.1 2.3-4.6 1.2-8.8-.2-11.6-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default function Home() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
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
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="navbar-inner">
            <a href="#" className="navbar-logo">
              <img src="/logo.png" alt="Pulse Futuro Logo" />
              <span className="navbar-logo-text">
                Pulse <span>Futuro</span>
              </span>
            </a>
            <div className="navbar-cta">
              <a href="#planos" className="btn btn-secondary btn-nav" style={{ padding: '10px 18px', fontSize: '0.9rem' }}>
                💰 Planos
              </a>
              <a
                href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                          <WhatsAppIcon className="w-5 h-5 flex-shrink-0" /> WhatsApp
              </a>
              <a href="#cta" className="btn btn-primary btn-nav">
                Quero meu site
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot"></span>
                Agência Digital · Curitiba, PR
              </div>
              <h1 className="hero-title">
                Seu negócio ainda
                <br />
                <span className="highlight">não tem site?</span>
              </h1>
              <p className="hero-subtitle">
                Colocamos sua empresa no digital e ajudamos você a atrair mais clientes todos
                os dias — com um site profissional, moderno e feito para converter.
              </p>
              <div className="hero-buttons">
                <a href="#cta" className="btn btn-primary btn-lg">
                  <Rocket className="w-5 h-5" />
                  Quero meu site profissional
                </a>
                <a
                  href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                  className="btn btn-whatsapp btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                  Falar no WhatsApp
                </a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-number">97%</span>
                  <span className="hero-stat-label">
                    dos consumidores
                    <br />
                    pesquisam online
                  </span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">3x</span>
                  <span className="hero-stat-label">
                    mais contatos
                    <br />
                    com site otimizado
                  </span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">3h</span>
                  <span className="hero-stat-label">
                    para seu site
                    <br />
                    entrar no ar
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-logo-wrap">
                <span className="orbit-dot"></span>
                <span className="orbit-dot"></span>
                <span className="orbit-dot"></span>
                <img src="/logo.png" alt="Pulse Futuro" className="hero-logo-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section problema" id="problema">
        <div className="container">
          <div className="problema-grid">
            <div className="reveal-left">
              <span className="section-tag">O Problema</span>
              <h2 className="section-title">
                Você pode estar perdendo
                <br />
                <span>clientes todos os dias</span>
              </h2>
              <p className="section-subtitle">
                Hoje, antes de qualquer compra ou contratação, as pessoas abrem o Google. Se sua
                empresa não aparece, ela simplesmente não existe para esses clientes.
              </p>

              <div className="problema-list">
                <div className="problema-item">
                  <div className="problema-icon">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="problema-item-text">
                    <strong>Invisível no Google</strong>
                    <p>
                      Sem site, seu negócio não aparece nas buscas e perde espaço para a
                      concorrência que já está online.
                    </p>
                  </div>
                </div>

                <div className="problema-item">
                  <div className="problema-icon">
                    <UserX className="w-5 h-5" />
                  </div>
                  <div className="problema-item-text">
                    <strong>Credibilidade comprometida</strong>
                    <p>
                      Clientes desconfiam de empresas sem presença digital. Um site profissional
                      transmite confiança imediata.
                    </p>
                  </div>
                </div>

                <div className="problema-item">
                  <div className="problema-icon">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="problema-item-text">
                    <strong>Crescimento limitado</strong>
                    <p>
                      Depender apenas de indicações limita seu alcance. O digital abre sua empresa
                      para novos mercados 24h por dia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <div className="alert-box">
                <div className="alert-number">97%</div>
                <p className="alert-text">
                  dos consumidores brasileiros pesquisam na internet antes de comprar ou contratar
                  um serviço local. Empresas sem site ficam{' '}
                  <strong style={{ color: 'var(--purple-light)' }}>
                    completamente invisíveis
                  </strong>{' '}
                  para essa maioria.
                </p>
                <p className="alert-source">Fonte: Google Consumer Insights Brasil</p>

                <div
                  style={{
                    marginTop: '32px',
                    paddingTop: '28px',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <div className="alert-number" style={{ fontSize: '3rem' }}>
                    +60%
                  </div>
                  <p className="alert-text">
                    das buscas locais no Google resultam em uma visita à loja ou contato com a
                    empresa nas próximas 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="solucao">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">A Solução</span>
            <h2 className="section-title">
              Como a Pulse Futuro <span>resolve isso</span>
            </h2>
            <p className="section-subtitle">
              Desenvolvemos sites profissionais e estratégicos para comércios locais que querem
              crescer no digital com resultados reais.
            </p>
          </div>

          <div className="solucao-cards">
            <div className="solucao-card reveal delay-1">
              <div className="card-icon">
                <MonitorSmartphone className="w-7 h-7" />
              </div>
              <h3 className="card-title">Site Profissional e Moderno</h3>
              <p className="card-text">
                Design exclusivo, alinhado à identidade da sua marca, com visual premium que
                impressiona e gera confiança imediata.
              </p>
              <ul className="card-feature-list">
                <li>Design personalizado para sua marca</li>
                <li>Visual moderno e diferenciado</li>
                <li>Carregamento ultra-rápido</li>
                <li>Domínio e hospedagem inclusos</li>
              </ul>
            </div>

            <div className="solucao-card reveal delay-2">
              <div className="card-icon">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="card-title">Otimizado para Celular</h3>
              <p className="card-text">
                Mais de 80% dos acessos são pelo smartphone. Seu site será perfeito em qualquer
                tela, garantindo a melhor experiência.
              </p>
              <ul className="card-feature-list">
                <li>100% responsivo e adaptável</li>
                <li>Experiência mobile impecável</li>
                <li>Velocidade otimizada no 4G/5G</li>
                <li>Aprovado pelo Google Mobile</li>
              </ul>
            </div>

            <div className="solucao-card reveal delay-3">
              <div className="card-icon">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="card-title">Pensado para Gerar Contatos</h3>
              <p className="card-text">
                Estrutura estratégica com calls-to-action inteligentes, formulários e integração
                com WhatsApp para converter visitantes em clientes.
              </p>
              <ul className="card-feature-list">
                <li>Botões de ação estratégicos</li>
                <li>Integração com WhatsApp</li>
                <li>Formulário de contato</li>
                <li>SEO local para Google Maps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section como-funciona" id="como-funciona">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">Processo</span>
            <h2 className="section-title">
              Como <span>funciona</span>
            </h2>
            <p className="section-subtitle">
              Processo simples, rápido e sem complicação. Do primeiro contato ao site no ar em
              poucos dias.
            </p>
          </div>

          <div className="steps-container">
            <div className="step-item reveal delay-1">
              <div className="step-number">01</div>
              <h3 className="step-title">Entendemos seu negócio</h3>
              <p className="step-text">
                Conversamos para entender seu segmento, seus diferenciais, seu público-alvo e o
                que você precisa comunicar. Nenhum detalhe é ignorado.
              </p>
            </div>

            <div className="step-item reveal delay-2">
              <div className="step-number">02</div>
              <h3 className="step-title">Criamos o layout personalizado</h3>
              <p className="step-text">
                Nossa equipe desenvolve um design exclusivo para sua marca, com textos persuasivos
                e estrutura pensada para converter visitantes em clientes.
              </p>
            </div>

            <div className="step-item reveal delay-3">
              <div className="step-number">03</div>
              <h3 className="step-title">Colocamos seu site no ar</h3>
              <p className="step-text">
                Após sua aprovação, publicamos o site com domínio e hospedagem configurados. Seu
                negócio estará online e pronto para atrair clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="autoridade">
        <div className="container">
          <div className="autoridade-inner">
            <div className="reveal-left">
              <span className="section-tag">Autoridade</span>
              <h2 className="section-title">
                Presença digital é o novo
                <br />
                <span>cartão de visitas</span>
              </h2>
              <p className="section-subtitle">
                No mundo conectado de hoje, seu site é a primeira impressão que os clientes têm da
                sua empresa. Uma presença digital profissional não é mais um diferencial — é uma
                necessidade para qualquer negócio que queira crescer.
              </p>
              <blockquote className="autoridade-quote">
                "Empresas com site profissional geram até 3 vezes mais contatos e têm percepção de
                valor significativamente maior pelos consumidores digitais."
              </blockquote>
            </div>

            <div className="reveal-right">
              <div className="autoridade-metrics">
                <div className="metric-card">
                  <div className="metric-number">+200%</div>
                  <div className="metric-label">
                    Aumento médio de visibilidade online com site otimizado
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">24/7</div>
                  <div className="metric-label">
                    Seu negócio trabalhando para você enquanto você descansa
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">3x</div>
                  <div className="metric-label">
                    Mais credibilidade percebida pelos clientes
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">3h</div>
                  <div className="metric-label">Tempo médio para seu site entrar no ar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PLANS SECTION ===================== */}
      <section className="section plans-section" id="planos">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">💰 Planos &amp; Preços</span>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              Escolha seu plano e <span>decole agora</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 60px' }}>
              Sites profissionais que convertem. Sem enrolação, sem preço abusivo.
            </p>
          </div>

          <div className="plans-grid">
            {/* ═══ PLAN 1 — START ═══ */}
            <div className="plan-card plan-start reveal delay-1">
              <div className="plan-glow plan-glow-start" />
              <div className="plan-particles">
                {[...Array(6)].map((_, i) => <span key={i} className="plan-particle" />)}
              </div>
              <div className="plan-accent-line plan-accent-start" />
              <div className="plan-header">
                <div className="plan-icon-row">
                  <div className="plan-emoji">🚀</div>
                  <div className="plan-badge plan-badge-start">BÁSICO</div>
                </div>
                <h3 className="plan-name">Pulse Start</h3>
                <p className="plan-tagline">Sua empresa no digital em até 5 dias. Perfeito pra começar do zero.</p>
              </div>
              <div className="plan-price-block plan-price-block-start">
                <div className="plan-price-row">
                  <span className="plan-currency">R$</span>
                  <span className="plan-amount">350</span>
                </div>
                <span className="plan-price-label">pagamento único · sem surpresas</span>
              </div>
              <div className="plan-divider plan-divider-start" />
              <ul className="plan-features">
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Site de <strong>1 página</strong> responsivo</li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Design moderno e profissional</li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Botão WhatsApp integrado</li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Domínio <strong>.com.br</strong> por 1 ano incluso</li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Hospedagem otimizada</li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Entrega em até <strong>5 dias úteis</strong></li>
                <li><svg className="plan-icon plan-icon-start" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Suporte por <strong>30 dias</strong></li>
              </ul>
              <div className="plan-callout plan-callout-start">🎯 Ideal para <strong>autônomos &amp; iniciantes</strong></div>
              <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Start!" className="plan-cta" target="_blank" rel="noopener noreferrer">
                Quero começar <span className="plan-cta-arrow">→</span>
              </a>
            </div>

            {/* ═══ PLAN 2 — PRO (FEATURED) ═══ */}
            <div className="plan-card plan-pro plan-featured reveal delay-2">
              <div className="plan-glow plan-glow-pro" />
              <div className="plan-popular-badge">⚡ MAIS POPULAR</div>
              <div className="plan-particles plan-particles-pro">
                {[...Array(10)].map((_, i) => <span key={i} className="plan-particle" />)}
              </div>
              <div className="plan-accent-line plan-accent-pro" />
              <div className="plan-header">
                <div className="plan-icon-row">
                  <div className="plan-emoji">⚡</div>
                  <div className="plan-badge plan-badge-pro">INTERMEDIÁRIO</div>
                </div>
                <h3 className="plan-name">Pulse Pro</h3>
                <p className="plan-tagline">O equilíbrio perfeito entre preço e resultado. Seu site de verdade.</p>
              </div>
              <div className="plan-price-block plan-price-block-pro">
                <div className="plan-price-row">
                  <span className="plan-currency">R$</span>
                  <span className="plan-amount">650</span>
                </div>
                <span className="plan-price-label">pagamento único · sem mensalidade</span>
              </div>
              <div className="plan-divider plan-divider-pro" />
              <ul className="plan-features">
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Até <strong>5 páginas</strong> completas</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Design estratégico e personalizado</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Redes sociais + formulário + WhatsApp</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Google Analytics em tempo real</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg><strong>SEO</strong> — apareça no Google</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Domínio <strong>.com.br</strong> por 1 ano incluso</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Hospedagem otimizada</li>
                <li><svg className="plan-icon plan-icon-pro" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Suporte + manutenção por <strong>6 meses</strong></li>
              </ul>
              <div className="plan-callout plan-callout-pro">🚀 Para empresas que querem <strong>crescer online</strong></div>
              <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Pro!" className="plan-cta plan-cta-pro" target="_blank" rel="noopener noreferrer">
                Quero o Pro <span className="plan-cta-arrow">→</span>
              </a>
            </div>

            {/* ═══ PLAN 3 — ELITE ═══ */}
            <div className="plan-card plan-elite reveal delay-3">
              <div className="plan-glow plan-glow-elite" />
              <div className="plan-particles plan-particles-elite">
                {[...Array(8)].map((_, i) => <span key={i} className="plan-particle" />)}
              </div>
              <div className="plan-accent-line plan-accent-elite" />
              <div className="plan-header">
                <div className="plan-icon-row">
                  <div className="plan-emoji">🔥</div>
                  <div className="plan-badge plan-badge-elite">PREMIUM</div>
                </div>
                <h3 className="plan-name">Pulse Elite</h3>
                <p className="plan-tagline">Site de alto nível com foco total em conversão e autoridade de marca.</p>
              </div>
              <div className="plan-price-block plan-price-block-elite">
                <div className="plan-price-row">
                  <span className="plan-currency">R$</span>
                  <span className="plan-amount">1.200</span>
                </div>
                <span className="plan-price-label">investimento único · ROI garantido</span>
              </div>
              <div className="plan-divider plan-divider-elite" />
              <ul className="plan-features">
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Até <strong>10 páginas</strong> ou fluxo avançado</li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Design premium focado em <strong>conversão</strong></li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Animações profissionais + UX premium</li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Integração completa (WhatsApp, redes, forms)</li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Google Analytics <strong>avançado</strong></li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Estrutura otimizada para <strong>vendas</strong></li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Domínio + hospedagem de <strong>alta performance</strong></li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Suporte <strong>PRIORITÁRIO 24h</strong></li>
                <li><svg className="plan-icon plan-icon-elite" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4"/><path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Manutenção por <strong>1 ano completo</strong></li>
              </ul>
              <div className="plan-callout plan-callout-elite">🔥 Pra quem quer <strong>vender todos os dias</strong></div>
              <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Elite!" className="plan-cta plan-cta-elite" target="_blank" rel="noopener noreferrer">
                Quero o Elite 🔥 <span className="plan-cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-final" id="cta">
        <div className="container">
          <div className="cta-box reveal">
            <span className="section-tag">Comece Agora</span>
            <h2 className="cta-title">
              Está pronto para colocar
              <br />
              <span
                style={{
                  color: 'var(--purple-bright)',
                  textShadow: '0 0 30px rgba(138,43,226,0.6)',
                }}
              >
                sua empresa no digital?
              </span>
            </h2>
            <p className="cta-subtitle">
              Quanto você está deixando de faturar por não ter um site?
            </p>
            <div className="cta-buttons">
              <a
                href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rocket className="w-5 h-5" />
                Receber orçamento grátis
              </a>
              <a
                href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                          <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">
                <img src="/logo.png" alt="Pulse Futuro" />
                <span className="footer-brand-name">Pulse Futuro</span>
              </div>
              <p className="footer-tagline">
                Serviços de marketing na internet.
                <br />
                Transformamos negócios locais em referências digitais.
              </p>
              <a
                href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.9rem', padding: '11px 22px' }}
              >
                          <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                Falar no WhatsApp
              </a>
            </div>

            <div>
              <p className="footer-col-title">Serviços</p>
              <ul className="footer-list">
                <li><ChevronRight className="w-3.5 h-3.5 text-purple-400" /> Sites Profissionais</li>
                <li><ChevronRight className="w-3.5 h-3.5 text-purple-400" /> Landing Pages</li>
                <li><ChevronRight className="w-3.5 h-3.5 text-purple-400" /> SEO Local</li>
                <li><ChevronRight className="w-3.5 h-3.5 text-purple-400" /> Google Meu Negócio</li>
                <li><ChevronRight className="w-3.5 h-3.5 text-purple-400" /> Marketing Digital</li>
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Contato</p>
              <ul className="footer-list">
                <li>
                  <MapPin className="w-4 h-4 text-purple-400" />
                  Curitiba — PR
                </li>
                <li>
                  <Mail className="w-4 h-4 text-purple-400" />
                  <a href="mailto:contato@pulsefuturo.com.br">contato@pulsefuturo.com.br</a>
                </li>
                <li>
                            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (41) 98460-6633
                  </a>
                </li>
                <li>
                  <Instagram className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                  <a
                    href="https://instagram.com/pulsefuturo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @pulsefuturo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; 2026 <span>Pulse Futuro</span>. Todos os direitos reservados.
            </p>
            <p className="footer-copy">
              Feito com <span>♥</span> em Curitiba, PR
            </p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
                  <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
      </a>

      <style>{`

        /* ======================== PLANS ======================== */
        @keyframes planFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(0.5deg); }
          66% { transform: translateY(-5px) rotate(-0.5deg); }
        }
        @keyframes planGlowPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }
        @keyframes planGlowPulsePro {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes planShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes particleDrift {
          0% { transform: translate(0,0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 0.6; }
          100% { transform: translate(var(--px, 40px), var(--py, -60px)) scale(0); opacity: 0; }
        }
        @keyframes popularBadgePulse {
          0%, 100% { box-shadow: 0 0 12px rgba(157, 63, 255, 0.6), 0 0 28px rgba(157, 63, 255, 0.3); }
          50% { box-shadow: 0 0 22px rgba(157, 63, 255, 1), 0 0 50px rgba(157, 63, 255, 0.55); }
        }
        @keyframes borderSpin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes eliteFireBorder {
          0%, 100% { border-color: rgba(255, 100, 0, 0.5); box-shadow: 0 0 20px rgba(255,100,0,0.2), inset 0 0 20px rgba(255,100,0,0.04); }
          50% { border-color: rgba(255, 160, 0, 0.8); box-shadow: 0 0 35px rgba(255,140,0,0.4), inset 0 0 30px rgba(255,100,0,0.08); }
        }
        @keyframes priceCount {
          from { opacity: 0; transform: scale(0.7) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ctaShine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .plans-section { padding: 110px 0 120px; }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          border-radius: 24px;
          padding: 40px 32px 36px;
          border: 1px solid rgba(138, 43, 226, 0.22);
          background: rgba(13, 13, 20, 0.72);
          backdrop-filter: blur(18px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          animation: planFloat 7s ease-in-out infinite;
          cursor: default;
        }

        .plan-card:nth-child(2) { animation-duration: 8.5s; animation-delay: -1.5s; }
        .plan-card:nth-child(3) { animation-duration: 6.5s; animation-delay: -3s; }

        .plan-card:hover {
          transform: translateY(-14px) scale(1.025) !important;
          box-shadow: 0 30px 80px rgba(138, 43, 226, 0.25), 0 0 0 1px rgba(157, 63, 255, 0.35);
          animation-play-state: paused;
        }

        /* GLOW BLOBS */
        .plan-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(55px);
          pointer-events: none;
          z-index: 0;
        }
        .plan-glow-start {
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(100, 160, 255, 0.3), transparent 70%);
          top: -60px; right: -60px;
          animation: planGlowPulse 4s ease-in-out infinite;
        }
        .plan-glow-pro {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(157, 63, 255, 0.45), transparent 70%);
          top: -80px; left: 50%; transform: translateX(-50%);
          animation: planGlowPulsePro 3.5s ease-in-out infinite;
        }
        .plan-glow-elite {
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(255, 100, 0, 0.35), transparent 70%);
          top: -60px; left: -60px;
          animation: planGlowPulse 5s ease-in-out infinite 1s;
        }

        /* FLOATING PARTICLES */
        .plan-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .plan-particle {
          position: absolute;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--purple-bright);
          animation: particleDrift 4s ease-in-out infinite;
          opacity: 0;
        }

        .plan-start .plan-particle { background: #60a5fa; }
        .plan-particles-pro .plan-particle { background: var(--purple-bright); }
        .plan-particles-elite .plan-particle { background: #fb923c; }

        .plan-particle:nth-child(1) { left: 10%; top: 80%; --px: 20px; --py: -70px; animation-delay: 0s; animation-duration: 3.5s; }
        .plan-particle:nth-child(2) { left: 25%; top: 70%; --px: -15px; --py: -80px; animation-delay: 0.5s; animation-duration: 4.2s; }
        .plan-particle:nth-child(3) { left: 70%; top: 85%; --px: 30px; --py: -60px; animation-delay: 1s; animation-duration: 3.8s; }
        .plan-particle:nth-child(4) { left: 85%; top: 60%; --px: -20px; --py: -90px; animation-delay: 1.5s; animation-duration: 4.5s; }
        .plan-particle:nth-child(5) { left: 50%; top: 90%; --px: 10px; --py: -75px; animation-delay: 2s; animation-duration: 3.2s; }
        .plan-particle:nth-child(6) { left: 40%; top: 75%; --px: -25px; --py: -65px; animation-delay: 2.5s; animation-duration: 4.8s; }
        .plan-particle:nth-child(7) { left: 15%; top: 50%; --px: 35px; --py: -55px; animation-delay: 0.7s; animation-duration: 3.6s; }
        .plan-particle:nth-child(8) { left: 60%; top: 40%; --px: -30px; --py: -85px; animation-delay: 1.2s; animation-duration: 4.1s; }
        .plan-particle:nth-child(9) { left: 80%; top: 30%; --px: 25px; --py: -95px; animation-delay: 1.8s; animation-duration: 3.9s; }
        .plan-particle:nth-child(10) { left: 30%; top: 20%; --px: -18px; --py: -70px; animation-delay: 2.3s; animation-duration: 4.4s; }

        /* PLAN HEADER */
        .plan-header { position: relative; z-index: 1; margin-bottom: 24px; }
        .plan-emoji {
          font-size: 2.4rem;
          margin-bottom: 12px;
          display: block;
          filter: drop-shadow(0 0 12px rgba(157, 63, 255, 0.6));
          animation: planFloat 3s ease-in-out infinite;
        }
        .plan-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .plan-badge-start { background: rgba(96, 165, 250, 0.15); color: #93c5fd; border: 1px solid rgba(96,165,250,0.3); }
        .plan-badge-pro { background: rgba(157, 63, 255, 0.18); color: var(--purple-light); border: 1px solid var(--border); }
        .plan-badge-elite { background: rgba(251, 146, 60, 0.15); color: #fdba74; border: 1px solid rgba(251,146,60,0.3); }

        .plan-name {
          font-family: var(--font-main);
          font-size: 1.7rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.65));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .plan-featured .plan-name {
          background: linear-gradient(135deg, #fff 0%, var(--purple-light) 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .plan-elite .plan-name {
          background: linear-gradient(135deg, #fff 0%, #fb923c 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 10px;
          animation: priceCount 0.6s ease both;
        }
        .plan-currency { font-size: 1.1rem; font-weight: 700; color: var(--gray-mid); margin-top: 4px; }
        .plan-amount {
          font-family: var(--font-main);
          font-size: 3.2rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .plan-featured .plan-amount {
          background: linear-gradient(135deg, #fff 0%, var(--purple-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(157,63,255,0.5));
        }
        .plan-elite .plan-amount {
          background: linear-gradient(135deg, #fff 0%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(255,100,0,0.5));
        }

        .plan-tagline {
          font-size: 0.88rem;
          color: var(--gray-mid);
          line-height: 1.5;
        }

        /* FEATURED CARD */
        .plan-featured {
          border: 1px solid rgba(157, 63, 255, 0.5);
          background: rgba(15, 10, 30, 0.85);
          box-shadow: 0 0 50px rgba(138, 43, 226, 0.2), 0 0 120px rgba(138, 43, 226, 0.08);
          transform: scale(1.04);
        }
        .plan-featured:hover {
          transform: translateY(-14px) scale(1.06) !important;
        }

        /* ELITE CARD */
        .plan-elite {
          border: 1px solid rgba(255, 100, 0, 0.3);
          animation: planFloat 7s ease-in-out infinite, eliteFireBorder 3s ease-in-out infinite;
        }
        .plan-elite:hover {
          border-color: rgba(255, 140, 0, 0.7) !important;
          box-shadow: 0 30px 80px rgba(255, 100, 0, 0.2), 0 0 0 1px rgba(255, 140, 0, 0.4) !important;
        }

        /* "MAIS POPULAR" badge */
        .plan-popular-badge {
          position: absolute;
          top: -1px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          color: #fff;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          padding: 6px 18px;
          border-radius: 0 0 14px 14px;
          text-transform: uppercase;
          animation: popularBadgePulse 2.5s ease-in-out infinite;
          white-space: nowrap;
          z-index: 5;
        }

        /* FEATURES LIST */
        .plan-features {
          list-style: none;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.875rem;
          color: var(--gray-light);
          line-height: 1.45;
        }
        .plan-features li strong { color: #fff; }

        /* SVG CHECK ICONS */
        .plan-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .plan-icon-start { color: #60a5fa; }
        .plan-icon-pro { color: var(--purple-light); }
        .plan-icon-elite { color: #fb923c; }

        /* ACCENT TOP LINE */
        .plan-accent-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 24px 24px 0 0;
          z-index: 2;
        }
        .plan-accent-start { background: linear-gradient(90deg, #3b82f6, #60a5fa, transparent); }
        .plan-accent-pro { background: linear-gradient(90deg, var(--purple-neon), var(--purple-bright), #bf7fff, transparent); }
        .plan-accent-elite { background: linear-gradient(90deg, #ea580c, #f97316, #fbbf24, transparent); }

        /* ICON + BADGE ROW */
        .plan-icon-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .plan-emoji {
          font-size: 1.9rem;
          line-height: 1;
          filter: drop-shadow(0 0 10px rgba(157, 63, 255, 0.5));
          animation: planFloat 3s ease-in-out infinite;
        }

        /* PRICE BLOCK */
        .plan-price-block {
          border-radius: 14px;
          padding: 18px 20px 14px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .plan-price-block-start { background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59,130,246,0.18); }
        .plan-price-block-pro { background: rgba(138, 43, 226, 0.1); border: 1px solid rgba(138,43,226,0.25); }
        .plan-price-block-elite { background: rgba(234, 88, 12, 0.08); border: 1px solid rgba(234,88,12,0.2); }

        .plan-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 4px;
        }
        .plan-price-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--gray-mid);
          text-transform: uppercase;
        }

        /* DIVIDER */
        .plan-divider {
          height: 1px;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .plan-divider-start { background: linear-gradient(90deg, rgba(59,130,246,0.35), transparent); }
        .plan-divider-pro { background: linear-gradient(90deg, rgba(157,63,255,0.45), transparent); }
        .plan-divider-elite { background: linear-gradient(90deg, rgba(234,88,12,0.4), transparent); }

        /* CALLOUT STRIP */
        .plan-callout {
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.82rem;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
          line-height: 1.4;
        }
        .plan-callout strong { color: #fff; }
        .plan-callout-start { background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); color: #93c5fd; }
        .plan-callout-pro { background: rgba(138,43,226,0.1); border: 1px solid rgba(138,43,226,0.25); color: var(--purple-light); }
        .plan-callout-elite { background: rgba(234,88,12,0.08); border: 1px solid rgba(234,88,12,0.22); color: #fdba74; }

        /* CTA ARROW */
        .plan-cta-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .plan-cta:hover .plan-cta-arrow { transform: translateX(5px); }

        /* CTA BUTTONS */
        .plan-cta {
          display: block;
          text-align: center;
          text-decoration: none;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 1rem;
          padding: 15px 24px;
          border-radius: 12px;
          border: 1.5px solid rgba(138, 43, 226, 0.4);
          color: var(--white);
          background: rgba(138, 43, 226, 0.12);
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        .plan-cta::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 80px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          animation: ctaShine 3s ease-in-out infinite;
        }
        .plan-cta:hover {
          background: rgba(138, 43, 226, 0.28);
          border-color: var(--purple-bright);
          color: #fff;
          box-shadow: 0 0 24px rgba(138, 43, 226, 0.4);
          transform: translateY(-2px);
        }

        .plan-cta-pro {
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          border-color: transparent;
          box-shadow: 0 0 28px rgba(157, 63, 255, 0.45), 0 4px 20px rgba(138,43,226,0.35);
        }
        .plan-cta-pro:hover {
          box-shadow: 0 0 45px rgba(157, 63, 255, 0.7), 0 8px 30px rgba(138,43,226,0.45);
          transform: translateY(-3px) scale(1.02);
          background: linear-gradient(135deg, var(--purple-bright), #bf7fff);
        }
        .plan-cta-pro::after { animation-delay: 1s; }

        .plan-cta-elite {
          background: linear-gradient(135deg, #ea580c, #f97316);
          border-color: transparent;
          box-shadow: 0 0 28px rgba(251, 100, 0, 0.45), 0 4px 20px rgba(234,88,12,0.35);
        }
        .plan-cta-elite:hover {
          box-shadow: 0 0 50px rgba(251, 100, 0, 0.7), 0 10px 35px rgba(234,88,12,0.45);
          transform: translateY(-3px) scale(1.02);
          background: linear-gradient(135deg, #f97316, #fdba74);
        }
        .plan-cta-elite::after { animation-delay: 2s; background: linear-gradient(90deg, transparent, rgba(255,200,100,0.25), transparent); }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .plans-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          .plan-featured { transform: scale(1); }
          .plan-featured:hover { transform: translateY(-14px) scale(1.025) !important; }
        }
        @media (max-width: 600px) {
          .plan-card { padding: 36px 24px 28px; }
          .plan-amount { font-size: 2.6rem; }
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
        }

        .landing-page .hero-subtitle {
          font-size: 1.15rem;
          color: var(--gray-light);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 520px;
        }

        .landing-page .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
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
        }

        .landing-page .alert-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--purple-bright), transparent);
        }

        .landing-page .alert-number {
          font-family: var(--font-main);
          font-size: 4.5rem;
          font-weight: 900;
          color: var(--purple-bright);
          text-shadow: 0 0 30px rgba(138,43,226,0.6);
          line-height: 1;
          margin-bottom: 12px;
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
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(16px);
        }

        .landing-page .solucao-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--purple-bright), transparent);
          opacity: 0;
          transition: var(--transition);
        }

        .landing-page .solucao-card:hover {
          border-color: rgba(138, 43, 226, 0.45);
          box-shadow: 0 8px 40px rgba(138,43,226,0.15), 0 0 0 1px rgba(138,43,226,0.1);
          transform: translateY(-6px);
        }

        .landing-page .solucao-card:hover::before {
          opacity: 1;
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
          transition: var(--transition);
          backdrop-filter: blur(16px);
        }

        .landing-page .metric-card:hover {
          border-color: rgba(138,43,226,0.4);
          box-shadow: 0 4px 24px rgba(138,43,226,0.12);
        }

        .landing-page .metric-number {
          font-family: var(--font-main);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--purple-light);
          text-shadow: 0 0 16px rgba(138,43,226,0.5);
          line-height: 1;
          margin-bottom: 8px;
        }

        .landing-page .metric-label {
          font-size: 0.85rem;
          color: var(--gray-light);
          line-height: 1.5;
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

        .landing-page .cta-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--purple-bright), transparent);
        }

        .landing-page .cta-box::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(138,43,226,0.4), transparent);
        }

        .landing-page .cta-title {
          font-family: var(--font-main);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .landing-page .cta-subtitle {
          font-size: 1.1rem;
          color: var(--gray-light);
          max-width: 560px;
          margin: 0 auto 44px;
          line-height: 1.75;
        }

        .landing-page .cta-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
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
      `}</style>
    </div>
  );
}