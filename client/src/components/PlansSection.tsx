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
    btnText: 'Começar agora',
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
    btnText: 'Quero o Pulse Pro',
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
    btnText: 'Começar agora',
  },
];

export default function PlansSection() {
  return (
    <section className="section planos-ultra" id="planos">
      <div className="container">
        <div className="planos-header reveal">
          <h2 className="planos-title">Escolha seu plano</h2>
          <p className="planos-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas.
          </p>
        </div>

        <div className="planos-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plano-card reveal delay-${index + 1} ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && <div className="popular-badge">Mais escolhido</div>}
              
              <div className="plano-top">
                <h3 className="plano-name">{plan.name}</h3>
                <p className="plano-desc">{plan.description}</p>
              </div>
              
              <div className="plano-price-wrap">
                <span className="plano-currency">R$</span>
                <span className="plano-price">{plan.price}</span>
                <span className="plano-billing">/único</span>
              </div>

              <div className="plano-divider"></div>

              <ul className="plano-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plano-footer">
                <a
                  href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20${encodeURIComponent(
                    plan.name
                  )}.%20Podemos%20conversar?`}
                  className={`btn-plano ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* 
          Ultra-Minimalist Premium Design 
          Inspired by Linear, Vercel, and Apple Pro.
          No messy gradients, no overflow bugs, extreme cleanliness.
        */
        .planos-ultra {
          padding: 120px 0;
          position: relative;
          z-index: 1;
        }

        .planos-header {
          text-align: center;
          margin-bottom: 80px;
          padding: 0 20px;
        }

        .planos-title {
          font-family: var(--font-main);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .planos-subtitle {
          font-size: 1.15rem;
          color: #a1a1aa; /* Zinc 400 */
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Flexbox is inherently stable and bug-free across devices */
        .planos-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 24px;
          flex-wrap: nowrap;
        }

        .plano-card {
          flex: 1;
          min-width: 320px;
          max-width: 380px;
          background: rgba(20, 20, 25, 0.4); /* Very subtle dark fill */
          border: 1px solid rgba(255, 255, 255, 0.08); /* crisp thin border */
          border-radius: 24px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
          position: relative;
        }

        .plano-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .plano-card.popular {
          background: rgba(25, 25, 32, 0.6);
          border-color: rgba(138, 43, 226, 0.6);
          transform: translateY(-8px);
        }

        .popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: #8A2BE2;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 14px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(138,43,226,0.3);
        }

        .plano-top {
          margin-bottom: 32px;
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.35rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .plano-desc {
          font-size: 0.95rem;
          color: #a1a1aa;
          line-height: 1.6;
          min-height: 48px;
        }

        .plano-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .plano-currency {
          font-size: 1.2rem;
          font-weight: 500;
          color: #a1a1aa;
        }

        .plano-price {
          font-family: var(--font-main);
          font-size: 3.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .plano-billing {
          font-size: 0.9rem;
          color: #a1a1aa;
          font-weight: 500;
        }

        .plano-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 32px 0;
        }

        .plano-card.popular .plano-divider {
          background: rgba(138, 43, 226, 0.3);
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 48px;
          flex-grow: 1;
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: #e4e4e7; /* Zinc 200 */
          line-height: 1.5;
        }

        .plano-features li i {
          color: #8A2BE2;
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .plano-card.popular .plano-features li i {
          color: #A855F7;
        }

        .plano-footer {
          margin-top: auto;
        }

        .btn-plano {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 16px 24px;
          border-radius: 12px;
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .btn-primary {
          background: #fff;
          color: #000;
          border: 1px solid #fff;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
        }

        .btn-primary:hover {
          background: #f4f4f5;
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        /* 
          Bug-Free Mobile Responsive
        */
        @media (max-width: 1024px) {
          .planos-ultra {
            padding: 80px 0;
          }
          
          .planos-grid {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }

          .plano-card {
            width: 100%;
            max-width: 420px;
            padding: 40px 32px;
          }

          .plano-card.popular {
            transform: translateY(0);
          }
          
          .plano-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
