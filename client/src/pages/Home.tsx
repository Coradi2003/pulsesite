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

      <section className="section problema" id="problema" style={{ position: 'relative' }}>
        {/* Diagonal Ribbons with Parallax */}
        <div className="diagonal-ribbons-wrapper">
          <div className="diagonal-ribbon ribbon-top">
            <div className="ribbon-track">
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
            </div>
          </div>
          <div className="diagonal-ribbon ribbon-bottom">
            <div className="ribbon-track">
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
              <span className="ribbon-text">✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO</span>
            </div>
          </div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
                <span className="alert-sparkle"></span>
                <span className="alert-sparkle"></span>
                <span className="alert-sparkle"></span>
                <div className="alert-number">97%</div>
                <p className="alert-text">
                  dos consumidores brasileiros pesquisam na internet antes de comprar ou contratar
                  um serviço local. Empresas sem site ficam{' '}
                  <strong className="alert-highlight" style={{ color: 'var(--purple-light)' }}>
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
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <div className="card-hologram"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
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
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <div className="card-hologram"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
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
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <span className="card-particle"></span>
              <div className="card-hologram"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
              <div className="energy-wave"></div>
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
            <span className="energy-particle"></span>
            <span className="energy-particle"></span>
            <span className="energy-particle"></span>
            <span className="energy-particle"></span>
            <span className="energy-particle"></span>
            <span className="energy-particle"></span>
            
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
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <div className="metric-number">+200%</div>
                  <div className="metric-label">
                    Aumento médio de visibilidade online com site otimizado
                  </div>
                </div>
                <div className="metric-card">
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <div className="metric-number">24/7</div>
                  <div className="metric-label">
                    Seu negócio trabalhando para você enquanto você descansa
                  </div>
                </div>
                <div className="metric-card">
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <div className="metric-number">3x</div>
                  <div className="metric-label">
                    Mais credibilidade percebida pelos clientes
                  </div>
                </div>
                <div className="metric-card">
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <span className="metric-particle"></span>
                  <div className="metric-number">3h</div>
                  <div className="metric-label">Tempo médio para seu site entrar no ar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PREMIUM PLANS SECTION ===================== */}
      <section className="section plans-premium" id="planos">
        <div className="container">
          <div className="plans-header-premium text-center reveal">
            <span className="premium-tag">💰 INVESTIMENTO ÚNICO</span>
            <h2 className="premium-title">
              Escolha seu plano e <span>comece a vender</span>
            </h2>
            <p className="premium-subtitle">
              Sua empresa no digital com design de alto nível e foco total em conversão. Sem mensalidades escondidas.
            </p>
          </div>

          <div className="plans-grid-premium">
            {/* ====== BÁSICO ====== */}
            <div className="pcard pcard-start reveal delay-1">
              <span className="rocket-trail"></span>
              <span className="rocket-trail"></span>
              <span className="rocket-trail"></span>
              <div className="pcard-header">
                <span className="pcard-emoji">🚀</span>
                <span className="pcard-label-text">Pulse Start</span>
              </div>
              <div className="pcard-price-wrap">
                <span className="pcard-currency">R$</span>
                <span className="pcard-price">350</span>
              </div>
              <div className="pcard-description">
                Ideal para autônomos e novos negócios que precisam de presença digital rápida.
              </div>
              
              <div className="pcard-divider" />
              
              <ul className="pcard-features">
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Site 1 página moderno</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> WhatsApp integrado</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Domínio .com.br (1 ano)</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Hospedagem inclusa</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Entrega em 2 horas</li>
              </ul>
              
              <div className="pcard-footer">
                <p className="pcard-note">Pagamento único sem taxas mensais</p>
                <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Start!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                  Quero o Pulse Start!
                </a>
              </div>
            </div>

            {/* ====== PRO (FEATURED) ====== */}
            <div className="pcard pcard-featured reveal delay-2">
              <div className="fire-particles">
                <span className="spark" style={{'--x': '2%', '--y': '0%', '--tx': '30px', '--duration': '1.1s', '--delay': '0s'} as any}></span>
                <span className="spark" style={{'--x': '15%', '--y': '0%', '--tx': '-20px', '--duration': '1.4s', '--delay': '0.2s'} as any}></span>
                <span className="spark" style={{'--x': '30%', '--y': '0%', '--tx': '25px', '--duration': '1.2s', '--delay': '0.4s'} as any}></span>
                <span className="spark" style={{'--x': '45%', '--y': '0%', '--tx': '-30px', '--duration': '1.6s', '--delay': '0.6s'} as any}></span>
                <span className="spark" style={{'--x': '60%', '--y': '0%', '--tx': '20px', '--duration': '1.3s', '--delay': '0.8s'} as any}></span>
                <span className="spark" style={{'--x': '75%', '--y': '0%', '--tx': '-25px', '--duration': '1.5s', '--delay': '1s'} as any}></span>
                <span className="spark" style={{'--x': '90%', '--y': '0%', '--tx': '15px', '--duration': '1.1s', '--delay': '1.2s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '10%', '--tx': '-10px', '--duration': '1.3s', '--delay': '0.3s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '30%', '--tx': '20px', '--duration': '1.7s', '--delay': '0.7s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '50%', '--tx': '-15px', '--duration': '1.4s', '--delay': '1.1s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '70%', '--tx': '25px', '--duration': '1.2s', '--delay': '1.5s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '90%', '--tx': '-20px', '--duration': '1.6s', '--delay': '1.9s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '20%', '--tx': '18px', '--duration': '1.5s', '--delay': '0.1s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '40%', '--tx': '-12px', '--duration': '1.8s', '--delay': '0.5s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '60%', '--tx': '22px', '--duration': '1.3s', '--delay': '0.9s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '80%', '--tx': '-18px', '--duration': '1.6s', '--delay': '1.3s'} as any}></span>
                <span className="spark" style={{'--x': '8%', '--y': '0%', '--tx': '35px', '--duration': '1.2s', '--delay': '0.4s'} as any}></span>
                <span className="spark" style={{'--x': '38%', '--y': '0%', '--tx': '-35px', '--duration': '1.4s', '--delay': '0.8s'} as any}></span>
                <span className="spark" style={{'--x': '68%', '--y': '0%', '--tx': '40px', '--duration': '1.1s', '--delay': '1.2s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '20%', '--tx': '-25px', '--duration': '1.5s', '--delay': '0.1s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '45%', '--tx': '30px', '--duration': '1.3s', '--delay': '0.5s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '75%', '--tx': '-15px', '--duration': '1.7s', '--delay': '0.9s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '15%', '--tx': '20px', '--duration': '1.2s', '--delay': '0.2s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '55%', '--tx': '-25px', '--duration': '1.6s', '--delay': '0.6s'} as any}></span>
                <span className="spark" style={{'--x': '50%', '--y': '0%', '--tx': '5px', '--duration': '1s', '--delay': '1.4s'} as any}></span>
                <span className="spark" style={{'--x': '20%', '--y': '0%', '--tx': '-5px', '--duration': '1.3s', '--delay': '0.2s'} as any}></span>
                <span className="spark" style={{'--x': '80%', '--y': '0%', '--tx': '10px', '--duration': '1.1s', '--delay': '0.8s'} as any}></span>
                <span className="spark" style={{'--x': '98%', '--y': '5%', '--tx': '-15px', '--duration': '1.4s', '--delay': '1.3s'} as any}></span>
                <span className="spark" style={{'--x': '2%', '--y': '95%', '--tx': '15px', '--duration': '1.6s', '--delay': '0.5s'} as any}></span>
              </div>
              <div className="pcard-header">
                <span className="pcard-emoji">⚡</span>
                <span className="pcard-label-text">Pulse Pro</span>
              </div>
              <div className="pcard-price-wrap">
                <span className="pcard-currency">R$</span>
                <span className="pcard-price">650</span>
              </div>
              <div className="pcard-description">
                O site completo que coloca sua empresa no topo do Google e gera autoridade.
              </div>
              
              <div className="pcard-divider" />
              
              <ul className="pcard-features">
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> Até 5 páginas estratégicas</li>
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> <strong>SEO (Google) incluso</strong></li>
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> Integração total de redes</li>
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> Google Analytics em tempo real</li>
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> Domínio + Hospedagem (1 ano)</li>
                <li><ChevronRight className="w-4 h-4 text-purple-400" /> Manutenção por 6 meses</li>
              </ul>
              
              <div className="pcard-footer">
                <p className="pcard-note">Foco total em resultados e vendas</p>
                <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Pro!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                  Quero o Pulse Pro!
                </a>
              </div>
            </div>

            {/* ====== ELITE ====== */}
            <div className="pcard pcard-elite reveal delay-3">
              <span className="flame-particle"></span>
              <span className="flame-particle"></span>
              <span className="flame-particle"></span>
              <span className="flame-particle"></span>
              <span className="flame-particle"></span>
              <div className="elite-glow"></div>
              <div className="pcard-header">
                <span className="pcard-emoji">🔥</span>
                <span className="pcard-label-text">Pulse Elite</span>
              </div>
              <div className="pcard-price-wrap">
                <span className="pcard-currency">R$</span>
                <span className="pcard-price">1.200</span>
              </div>
              <div className="pcard-description">
                Para quem busca excelência máxima, animações personalizadas e funis de venda.
              </div>
              
              <div className="pcard-divider" />
              
              <ul className="pcard-features">
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Até 10 páginas ou sistemas</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> UX Envolvente + Animações</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Integração de funis e pixels</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Copywriting focado em vendas</li>
                <li><ChevronRight className="w-4 h-4 text-purple-500" /> Suporte prioritário 1 ano</li>
              </ul>
              
              <div className="pcard-footer">
                <p className="pcard-note">Nível máximo de personalização</p>
                <a href="https://wa.me/5541984606633?text=Quero%20o%20plano%20Pulse%20Elite!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                  Quero Pulse Elite!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="section cta-final" id="cta">
        <div className="container">
          <div className="cta-box reveal">
            {/* Cosmic Stars */}
            <span className="cosmic-star" style={{'--x': '10%', '--y': '15%', '--delay': '0s', '--duration': '3s'} as any}></span>
            <span className="cosmic-star" style={{'--x': '85%', '--y': '20%', '--delay': '0.5s', '--duration': '3.5s'} as any}></span>
            <span className="cosmic-star" style={{'--x': '20%', '--y': '75%', '--delay': '1s', '--duration': '4s'} as any}></span>
            <span className="cosmic-star" style={{'--x': '90%', '--y': '80%', '--delay': '1.5s', '--duration': '3.2s'} as any}></span>
            <span className="cosmic-star" style={{'--x': '50%', '--y': '10%', '--delay': '2s', '--duration': '3.8s'} as any}></span>
            <span className="cosmic-star" style={{'--x': '15%', '--y': '50%', '--delay': '2.5s', '--duration': '3.3s'} as any}></span>
            
            {/* Orbital Rings */}
            <div className="orbital-ring ring-1"></div>
            <div className="orbital-ring ring-2"></div>
            <div className="orbital-ring ring-3"></div>
            
            {/* Energy Particles */}
            <span className="energy-particle" style={{'--angle': '0deg'} as any}></span>
            <span className="energy-particle" style={{'--angle': '60deg'} as any}></span>
            <span className="energy-particle" style={{'--angle': '120deg'} as any}></span>
            <span className="energy-particle" style={{'--angle': '180deg'} as any}></span>
            <span className="energy-particle" style={{'--angle': '240deg'} as any}></span>
            <span className="energy-particle" style={{'--angle': '300deg'} as any}></span>
            
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
          overflow: visible;
        }

        .pcard-start .pcard-emoji {
          animation: rocketBounce 2s ease-in-out infinite;
        }

        @keyframes rocketBounce {
          0%, 100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-10px) rotate(-40deg);
          }
        }

        .rocket-trail {
          position: absolute;
          bottom: 20%;
          left: 15%;
          width: 6px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(124, 58, 237, 0.8), transparent);
          border-radius: 50%;
          opacity: 0;
          animation: rocketTrail 2s ease-out infinite;
          pointer-events: none;
        }

        .rocket-trail:nth-child(1) {
          animation-delay: 0s;
          left: 12%;
        }

        .rocket-trail:nth-child(2) {
          animation-delay: 0.3s;
          left: 15%;
        }

        .rocket-trail:nth-child(3) {
          animation-delay: 0.6s;
          left: 18%;
        }

        @keyframes rocketTrail {
          0% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          20% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(60px) scale(0.5);
          }
        }

        .pcard-start:hover {
          animation: rocketShake 0.5s ease-in-out;
        }

        @keyframes rocketShake {
          0%, 100% { transform: translateY(-4px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-2deg); }
          75% { transform: translateY(-6px) rotate(2deg); }
        }

        .pcard-start:hover .pcard-emoji {
          animation: rocketLaunch 0.8s ease-out;
        }

        @keyframes rocketLaunch {
          0% {
            transform: translateY(0) rotate(-45deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(-35deg) scale(1.3);
          }
          100% {
            transform: translateY(0) rotate(-45deg) scale(1);
          }
        }

        /* ====== PULSE ELITE (FIRE) ANIMATIONS ====== */
        .pcard-elite {
          position: relative;
          overflow: visible;
        }

        .pcard-elite .pcard-emoji {
          animation: fireFlicker 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(255, 100, 0, 0.8));
        }

        @keyframes fireFlicker {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 10px rgba(255, 100, 0, 0.8));
          }
          25% {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgba(255, 100, 0, 1));
          }
          50% {
            transform: scale(0.95) rotate(5deg);
            filter: drop-shadow(0 0 20px rgba(255, 150, 0, 0.9));
          }
          75% {
            transform: scale(1.05) rotate(-3deg);
            filter: drop-shadow(0 0 15px rgba(255, 100, 0, 1));
          }
        }

        .flame-particle {
          position: absolute;
          width: 8px;
          height: 12px;
          background: linear-gradient(to top, #FF4D00, #FFD600);
          border-radius: 50% 50% 0 0;
          opacity: 0;
          animation: flameRise 2s ease-out infinite;
          pointer-events: none;
          filter: blur(1px);
        }

        .flame-particle:nth-child(1) {
          top: 15%;
          left: 20%;
          animation-delay: 0s;
        }

        .flame-particle:nth-child(2) {
          top: 15%;
          left: 25%;
          animation-delay: 0.4s;
        }

        .flame-particle:nth-child(3) {
          top: 15%;
          right: 25%;
          animation-delay: 0.8s;
        }

        .flame-particle:nth-child(4) {
          top: 15%;
          right: 20%;
          animation-delay: 1.2s;
        }

        .flame-particle:nth-child(5) {
          top: 15%;
          left: 50%;
          animation-delay: 1.6s;
        }

        @keyframes flameRise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.3);
          }
        }

        .elite-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 200px;
          height: 200px;
          margin-left: -100px;
          background: radial-gradient(circle, rgba(255, 100, 0, 0.3), transparent 70%);
          border-radius: 50%;
          animation: eliteGlowPulse 3s ease-in-out infinite;
          filter: blur(30px);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes eliteGlowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .pcard-elite:hover .pcard-emoji {
          animation: fireExplosion 0.6s ease-out, fireFlicker 1.5s ease-in-out infinite;
        }

        @keyframes fireExplosion {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5) rotate(10deg);
            filter: drop-shadow(0 0 30px rgba(255, 100, 0, 1));
          }
          100% {
            transform: scale(1);
          }
        }

        .pcard-elite:hover {
          box-shadow: 
            0 0 60px rgba(255, 100, 0, 0.4),
            0 0 100px rgba(255, 150, 0, 0.3);
          border-color: rgba(255, 100, 0, 0.8);
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
          width: auto;
          margin-bottom: 28px;
        }

        .pcard-emoji {
          position: absolute;
          left: 0;
          transform: translateX(-120%);
          font-size: 1.25rem;
        }

        .pcard-label-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #A855F7;
          letter-spacing: -0.01em;
          display: inline-block;
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
      `}</style>
    </div>
  );
}