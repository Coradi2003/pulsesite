import React from 'react';

const plans = [
  {
    name: 'Pulse Start',
    price: '350',
    description: 'Entrada rápida e profissional no mundo digital.',
    features: [
      'Site institucional moderno e responsivo',
      'Configuração de botão de WhatsApp',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem otimizada configurada',
      'Entrega expressa (até 5 dias)',
      'Manutenção gratuita por 30 dias',
    ],
    isPopular: false,
  },
  {
    name: 'Pulse Pro',
    price: '650',
    description: 'A estrutura ideal para converter visitantes em clientes.',
    features: [
      'Design estratégico e 100% personalizado',
      'Integração com redes sociais e contatos',
      'Google Analytics (visitas em tempo real)',
      'SEO Básico (otimização para o Google)',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem rápida e segura',
      'Suporte e manutenção expandidos (6 meses)',
    ],
    isPopular: true,
  },
  {
    name: 'Pulse Elite',
    price: '1.200',
    description: 'Máxima performance e autoridade para o seu negócio.',
    features: [
      'Design premium com foco total em vendas',
      'Animações modernas e interativas',
      'Tracking avançado (Pixel, Analytics, Tags)',
      'Estrutura pronta para campanhas de Ads',
      '1 ano de domínio exclusivo',
      'Hospedagem de altíssima performance',
      'Suporte prioritário (VIP) 24h',
      'Manutenção completa durante 1 ano',
    ],
    isPopular: false,
  },
];

export default function PlansSection() {
  return (
    <section className="section planos-master" id="planos">
      <div className="planos-bg-glow"></div>
      
      <div className="container">
        <div className="planos-header reveal">
          <span className="planos-tag">Estratégia & Execução</span>
          <h2 className="planos-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="planos-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas.<br className="hidden-mobile" /> 
            Escolha a estrutura perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="planos-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plano-card reveal delay-${index + 1} ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && <div className="popular-badge">Mais Escolhido</div>}
              
              <div className="plano-content">
                <div className="plano-top">
                  <h3 className="plano-name">{plan.name}</h3>
                  <p className="plano-desc">{plan.description}</p>
                </div>
                
                <div className="plano-price-box">
                  <span className="currency">R$</span>
                  <span className="price">{plan.price}</span>
                </div>
                <div className="plano-billing">Pagamento Único</div>

                <div className="plano-divider"></div>

                <ul className="plano-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20${encodeURIComponent(
                    plan.name
                  )}.%20Podemos%20conversar?`}
                  className={`btn-plano ${plan.isPopular ? 'btn-plano-primary' : 'btn-plano-secondary'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero este plano
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* 
          OVERHAUL IMPACTANTE: 
          Substituição total do conceito genérico por uma estrutura de Grid/Flex imponente, 
          uso rigoroso de espaço negativo (breathing room), e bordas de gradiente exclusivas (Linear/Vercel style).
        */
        .planos-master {
          position: relative;
          padding: 140px 0; /* Huge breathing room */
          background: transparent;
        }

        .planos-bg-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(138,43,226,0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .planos-master .container {
          position: relative;
          z-index: 1;
        }

        .planos-header {
          text-align: center;
          margin: 0 auto 80px; /* Strong separation from the cards */
        }

        .planos-tag {
          display: inline-block;
          color: #B56BFF;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          margin-bottom: 20px;
          background: rgba(138,43,226,0.1);
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(138,43,226,0.2);
        }

        .planos-title {
          font-family: var(--font-main);
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .planos-title span {
          background: linear-gradient(135deg, #B56BFF, #8A2BE2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .planos-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto;
        }

        .hidden-mobile {
          display: block;
        }

        /* 
          CARD LAYOUT:
          Using Flex with flex: 1 ensures perfect width sharing without grid overflow bugs.
        */
        .planos-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 32px;
          flex-wrap: nowrap;
        }

        /* Gradient Border Hack: we give the card 1px padding and a background. The inner content covers the center. */
        .plano-card {
          flex: 1;
          min-width: 280px;
          max-width: 380px;
          background: rgba(255, 255, 255, 0.05); /* very soft grey border */
          border-radius: 24px;
          padding: 1px; /* This creates the 1px border visually */
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .plano-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          background: rgba(255, 255, 255, 0.15); /* light up the border on hover */
        }

        .plano-content {
          background: rgba(14, 14, 20, 0.85); /* Solid dark inside */
          backdrop-filter: blur(24px);
          border-radius: 23px; /* Slightly less than outer wrapper to fit inside padding */
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* The masterpiece highlight */
        .plano-card.popular {
          background: linear-gradient(135deg, rgba(138,43,226,1), rgba(75,0,130,0.2)); 
          box-shadow: 0 24px 60px rgba(138,43,226,0.15);
          transform: translateY(-16px); /* Pop out vertically on desktop */
          z-index: 2;
        }

        .plano-card.popular:hover {
          transform: translateY(-24px);
          box-shadow: 0 32px 80px rgba(138,43,226,0.25);
          background: linear-gradient(135deg, #B56BFF, #8A2BE2); 
        }

        .plano-card.popular .plano-content {
          background: linear-gradient(180deg, rgba(22, 18, 32, 0.95) 0%, rgba(14, 14, 20, 0.95) 100%);
        }

        .popular-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #B56BFF, #8A2BE2);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 8px 18px;
          border-radius: 100px;
          box-shadow: 0 4px 16px rgba(138,43,226,0.4);
          z-index: 10;
          white-space: nowrap;
        }

        .plano-top {
          min-height: 80px; /* guarantees alignment for the price block */
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .plano-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
        }

        .plano-price-box {
          display: flex;
          align-items: flex-start;
          margin-top: 24px;
        }

        .currency {
          font-size: 1.2rem;
          font-weight: 600;
          color: #B56BFF;
          margin-top: 6px;
          margin-right: 6px;
        }

        .price {
          font-family: var(--font-main);
          font-size: 3.2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .plano-billing {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 12px;
        }

        .plano-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 36px 0;
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1;
          margin-bottom: 48px;
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .plano-features li i {
          color: #8A2BE2;
          font-size: 1rem;
          margin-top: 3px;
          filter: drop-shadow(0 0 8px rgba(138,43,226,0.4));
        }

        .plano-card.popular .plano-features li i {
          color: #B56BFF;
          filter: drop-shadow(0 0 12px rgba(181,107,255,0.6));
        }

        .btn-plano {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 18px 24px;
          border-radius: 14px;
          font-family: var(--font-main);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .btn-plano-primary {
          background: linear-gradient(180deg, #9D3FFF 0%, #8A2BE2 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(138,43,226,0.3), inset 0 1px 1px rgba(255,255,255,0.3);
          border: 1px solid rgba(138,43,226,0.6);
        }

        .btn-plano-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(138,43,226,0.5), inset 0 1px 1px rgba(255,255,255,0.4);
          filter: brightness(1.1);
        }

        .btn-plano-secondary {
          background: rgba(255,255,255,0.03);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .btn-plano-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        /* 
          MOBILE PERFECTION: 
          Forcing 1 column, centering, and stripping buggy offsets.
        */
        @media (max-width: 1024px) {
          .planos-master {
            padding: 80px 0;
          }
          
          .planos-grid {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .plano-card {
            width: 100%;
            max-width: 420px;
          }

          .plano-content {
            padding: 40px 32px;
          }

          .hidden-mobile {
            display: none;
          }

          /* Strip the desktop Y-offset completely to prevent stacking bugs */
          .plano-card.popular {
            transform: translateY(0);
          }
          .plano-card.popular:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
