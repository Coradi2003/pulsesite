import { useEffect } from 'react';
import { Rocket } from 'lucide-react';
import Footer from '../components/Footer';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l149.5-39.2c32.8 18 69.4 27.5 106.6 27.5h.1c122.3 0 221.9-99.5 221.9-222 0-59.3-23.1-115-65-156.9zM224 457.1c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 376.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 50.1 0 97.2 19.5 132.6 54.9C392.2 176 411.7 223.1 411.7 274c0 101.9-83 184.9-184.9 184.9zM324.9 308.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.5 7.4-14.1 2.3-4.6 1.2-8.8-.2-11.6-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default function CriacaoDeSitesCuritiba() {
  useEffect(() => {
    // SEO meta tags
    document.title = 'Criação de Sites em Curitiba | Pulse Futuro';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Criação de sites profissionais em Curitiba. Desenvolvimento web moderno, responsivo e otimizado para SEO. Orçamento gratuito.');
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot"></span>
                Agência Digital · Curitiba, PR
              </div>
              <h1 className="hero-title">
                Criação de Sites em Curitiba
                <br />
                <span className="highlight">para Empresas que Querem Crescer</span>
              </h1>
              <p className="hero-subtitle">
                Desenvolvemos sites profissionais e modernos para empresas de Curitiba que 
                buscam aumentar sua presença digital, gerar mais leads e conquistar novos clientes online.
              </p>
              <div className="hero-buttons">
                <a href="#contato" className="btn btn-primary btn-lg">
                  <Rocket className="w-5 h-5" />
                  Solicitar Orçamento Gratuito
                </a>
                <a
                  href="https://wa.me/5541984606633?text=Quero%20criar%20um%20site%20em%20Curitiba!"
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
        </div>
      </section>

      {/* Intro Section */}
      <section className="section" id="intro">
        <div className="container">
          <div className="text-center reveal">
            <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
              A criação de sites em Curitiba é fundamental para empresas que desejam se destacar no mercado digital. 
              Nossa agência desenvolve soluções web personalizadas que combinam design moderno, funcionalidade avançada 
              e estratégias de SEO para garantir que sua empresa seja encontrada pelos clientes certos.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section" id="beneficios">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">Vantagens</span>
            <h2 className="section-title">
              Por que sua empresa precisa de um <span>site profissional</span>
            </h2>
          </div>

          <div className="solucao-cards">
            <div className="solucao-card reveal delay-1">
              <h3 className="card-title">Credibilidade e Confiança</h3>
              <p className="card-text">
                Um site profissional transmite seriedade e confiança aos seus clientes, 
                aumentando as chances de conversão e fidelização.
              </p>
            </div>

            <div className="solucao-card reveal delay-2">
              <h3 className="card-title">Geração de Leads 24/7</h3>
              <p className="card-text">
                Seu site trabalha para você mesmo quando você está dormindo, 
                captando leads e gerando oportunidades de negócio constantemente.
              </p>
            </div>

            <div className="solucao-card reveal delay-3">
              <h3 className="card-title">Visibilidade no Google</h3>
              <p className="card-text">
                Sites otimizados aparecem nas primeiras posições do Google, 
                aumentando sua visibilidade e atraindo mais clientes qualificados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" id="como-funciona">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">Processo</span>
            <h2 className="section-title">
              Como funciona nossa <span>criação de sites</span>
            </h2>
          </div>

          <div className="steps-container">
            <div className="step-item reveal delay-1">
              <div className="step-number">01</div>
              <h3 className="step-title">Análise e Planejamento</h3>
              <p className="step-text">
                Analisamos seu negócio, concorrência e público-alvo para criar 
                uma estratégia digital personalizada e eficaz.
              </p>
            </div>

            <div className="step-item reveal delay-2">
              <div className="step-number">02</div>
              <h3 className="step-title">Design e Desenvolvimento</h3>
              <p className="step-text">
                Criamos um design moderno e responsivo, desenvolvendo todas as 
                funcionalidades necessárias para seu sucesso online.
              </p>
            </div>

            <div className="step-item reveal delay-3">
              <div className="step-number">03</div>
              <h3 className="step-title">Otimização e Entrega</h3>
              <p className="step-text">
                Otimizamos seu site para SEO e velocidade, realizamos testes 
                completos e colocamos tudo no ar com suporte total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section" id="diferenciais">
        <div className="container">
          <div className="autoridade-inner">
            <div className="reveal-left">
              <span className="section-tag">Diferenciais</span>
              <h2 className="section-title">
                Por que escolher a <span>Pulse Futuro</span>
              </h2>
              <p className="section-subtitle">
                Somos especialistas em criação de sites em Curitiba, oferecendo soluções 
                completas que combinam tecnologia avançada, design premium e resultados comprovados.
              </p>
            </div>

            <div className="reveal-right">
              <div className="autoridade-metrics">
                <div className="metric-card">
                  <div className="metric-number">3-7</div>
                  <div className="metric-label">Dias para entrega do seu site completo</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">100%</div>
                  <div className="metric-label">Sites responsivos e otimizados para mobile</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">SEO</div>
                  <div className="metric-label">Otimização inclusa para Google</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">24/7</div>
                  <div className="metric-label">Suporte técnico especializado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      {/* TODO: Add FAQ section */}
      {/* TODO: Add CTA section */}

      <Footer />
    </div>
  );
}