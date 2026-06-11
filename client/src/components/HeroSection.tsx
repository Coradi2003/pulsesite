import { Rocket } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l149.5-39.2c32.8 18 69.4 27.5 106.6 27.5h.1c122.3 0 221.9-99.5 221.9-222 0-59.3-23.1-115-65-156.9zM224 457.1c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 376.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 50.1 0 97.2 19.5 132.6 54.9C392.2 176 411.7 223.1 411.7 274c0 101.9-83 184.9-184.9 184.9zM324.9 308.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.5 7.4-14.1 2.3-4.6 1.2-8.8-.2-11.6-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default function HeroSection() {
  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="navbar-inner">
            <a href="#hero" className="navbar-logo">
              <img src="/logo.png" alt="Pulse Futuro Logo" />
              <span className="navbar-logo-text">
                Pulse <span>Futuro</span>
              </span>
            </a>
            <div className="navbar-cta">
              <a href="/black" className="btn btn-secondary btn-nav" style={{ padding: '10px 18px', fontSize: '0.9rem' }}>
                ⚫ Pulse Black
              </a>
              <a
                href="https://wa.me/5541984253194?text=Quero%20meu%20site%20profissional!"
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
        {/* SEO-optimized H1 - visually hidden but accessible */}
        <h1 className="sr-only">Criação de Sites e Landing Pages em Curitiba | Pulse Futuro</h1>
        
        {/* Purple Fireworks */}
        <div className="hero-fireworks">
          <span className="fw-particle" style={{'--x': '8%',  '--delay': '0s',   '--duration': '2.8s', '--size': '3px'} as any}></span>
          <span className="fw-particle" style={{'--x': '15%', '--delay': '0.4s', '--duration': '3.2s', '--size': '2px'} as any}></span>
          <span className="fw-particle" style={{'--x': '22%', '--delay': '0.8s', '--duration': '2.6s', '--size': '4px'} as any}></span>
          <span className="fw-particle" style={{'--x': '30%', '--delay': '1.2s', '--duration': '3.0s', '--size': '2px'} as any}></span>
          <span className="fw-particle" style={{'--x': '38%', '--delay': '0.2s', '--duration': '2.9s', '--size': '3px'} as any}></span>
          <span className="fw-particle" style={{'--x': '45%', '--delay': '1.6s', '--duration': '3.4s', '--size': '2px'} as any}></span>
          <span className="fw-particle" style={{'--x': '52%', '--delay': '0.6s', '--duration': '2.7s', '--size': '4px'} as any}></span>
          <span className="fw-particle" style={{'--x': '60%', '--delay': '1.0s', '--duration': '3.1s', '--size': '2px'} as any}></span>
          <span className="fw-particle" style={{'--x': '68%', '--delay': '1.8s', '--duration': '2.5s', '--size': '3px'} as any}></span>
          <span className="fw-particle" style={{'--x': '75%', '--delay': '0.3s', '--duration': '3.3s', '--size': '2px'} as any}></span>
          <span className="fw-particle" style={{'--x': '82%', '--delay': '1.4s', '--duration': '2.8s', '--size': '4px'} as any}></span>
          <span className="fw-particle" style={{'--x': '90%', '--delay': '0.7s', '--duration': '3.0s', '--size': '2px'} as any}></span>
          <span className="fw-particle fw-violet" style={{'--x': '12%', '--delay': '0.5s', '--duration': '3.5s', '--size': '3px'} as any}></span>
          <span className="fw-particle fw-violet" style={{'--x': '35%', '--delay': '1.1s', '--duration': '2.9s', '--size': '2px'} as any}></span>
          <span className="fw-particle fw-violet" style={{'--x': '55%', '--delay': '0.9s', '--duration': '3.2s', '--size': '4px'} as any}></span>
          <span className="fw-particle fw-violet" style={{'--x': '72%', '--delay': '1.7s', '--duration': '2.6s', '--size': '2px'} as any}></span>
          <span className="fw-particle fw-violet" style={{'--x': '88%', '--delay': '0.1s', '--duration': '3.4s', '--size': '3px'} as any}></span>
          <span className="fw-particle fw-pink"   style={{'--x': '25%', '--delay': '1.3s', '--duration': '3.0s', '--size': '2px'} as any}></span>
          <span className="fw-particle fw-pink"   style={{'--x': '48%', '--delay': '0.6s', '--duration': '2.7s', '--size': '3px'} as any}></span>
          <span className="fw-particle fw-pink"   style={{'--x': '78%', '--delay': '1.5s', '--duration': '3.1s', '--size': '2px'} as any}></span>
        </div>

        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot"></span>
                Agência Digital · Curitiba, PR
              </div>
              <div className="hero-title">
<<<<<<< HEAD
                Seu negócio ainda (Teste)
=======
                Seu negócio ainda
>>>>>>> f53ad8650a6a275c3d79de5117c7350a24615678
                <br />
                <span className="highlight">não tem site?</span>
              </div>
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
                  href="https://wa.me/5541984253194?text=Quero%20meu%20site%20profissional!"
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
    </>
  );
}
