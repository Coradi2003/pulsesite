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
    buttonClass: 'btn btn-secondary',
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
    buttonClass: 'btn btn-primary',
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
      '1 ano de domínio (.com.br) exclusivo',
      'Hospedagem de altíssima performance',
      'Suporte prioritário (VIP) 24h',
      'Manutenção completa durante 1 ano',
    ],
    isPopular: false,
    buttonClass: 'btn btn-secondary',
  },
];

export default function PlansSection() {
  return (
    <section className="section planos" id="planos">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-tag">Investimento</span>
          <h2 className="section-title">
            Escolha o <span>Plano Ideal</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transparência total. Sem mensalidades surpresas. Um investimento único para transformar o posicionamento digital da sua empresa.
          </p>
        </div>

        <div className="planos-wrapper">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plano-card reveal delay-${index + 1} ${
                plan.isPopular ? 'plano-popular' : ''
              }`}
            >
              {plan.isPopular && <div className="plano-badge">Mais Escolhido</div>}
              
              <div className="plano-header">
                <h3 className="plano-name">{plan.name}</h3>
                <p className="plano-desc">{plan.description}</p>
                <div className="plano-price-wrapper">
                  <span className="plano-currency">R$</span>
                  <span className="plano-price">{plan.price}</span>
                  <span className="plano-billing">/único</span>
                </div>
              </div>

              <div className="plano-divider"></div>

              <ul className="plano-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <div className="plano-icon-wrap">
                      <i className="fas fa-check"></i>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plano-footer">
                <a
                  href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20${encodeURIComponent(
                    plan.name
                  )}.%20Podemos%20conversar?`}
                  className={`${plan.buttonClass} w-full text-center justify-center`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '100%' }}
                >
                  Quero este plano
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .planos {
          position: relative;
          z-index: 1;
        }

        .planos-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 32px;
          margin-top: 60px;
        }

        .plano-card {
          flex: 1;
          min-width: 320px;
          max-width: 380px;
          background: rgba(19, 19, 28, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
          padding: 48px 40px 40px;
          transition: var(--transition);
          position: relative;
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
        }

        .plano-card:hover {
          background: rgba(19, 19, 28, 0.7);
          border-color: rgba(138, 43, 226, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(138, 43, 226, 0.08);
        }

        .plano-popular {
          background: linear-gradient(180deg, rgba(24, 24, 34, 0.8) 0%, rgba(15, 15, 20, 0.9) 100%);
          border: 1px solid rgba(138, 43, 226, 0.4);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 60px rgba(138, 43, 226, 0.15);
          transform: scale(1.05);
          z-index: 2;
        }
        
        .plano-popular:hover {
          transform: scale(1.05) translateY(-8px);
          border-color: var(--purple-bright);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 80px rgba(138, 43, 226, 0.25);
        }

        .plano-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 8px 24px;
          border-radius: 100px;
          box-shadow: 0 8px 20px rgba(138, 43, 226, 0.3);
          white-space: nowrap;
          z-index: 2;
        }

        .plano-header {
          text-align: center;
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }

        .plano-desc {
          font-size: 0.9rem;
          color: var(--gray-mid);
          line-height: 1.6;
          min-height: 48px;
        }

        .plano-price-wrapper {
          margin-top: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 6px;
        }

        .plano-currency {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gray-light);
          margin-bottom: 6px;
        }

        .plano-price {
          font-family: var(--font-main);
          font-size: 3.5rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.04em;
          text-shadow: 0 0 30px rgba(255,255,255,0.1);
        }

        .plano-billing {
          font-size: 0.85rem;
          color: var(--gray-mid);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .plano-popular .plano-price {
          color: #fff;
          text-shadow: 0 0 30px rgba(138, 43, 226, 0.4);
        }

        .plano-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 36px 0;
        }
        
        .plano-popular .plano-divider {
          background: linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.3), transparent);
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
          flex-grow: 1;
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.88rem;
          color: var(--gray-light);
          line-height: 1.5;
        }

        .plano-icon-wrap {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(138, 43, 226, 0.1);
          border: 1px solid rgba(138, 43, 226, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plano-features li i {
          color: var(--purple-light);
          font-size: 0.65rem;
        }

        .plano-footer {
          margin-top: auto;
          display: flex;
        }

        @media (max-width: 1024px) {
          .planos-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .plano-card {
            width: 100%;
            max-width: 440px;
            padding: 44px 32px 36px;
          }

          .plano-popular {
            transform: scale(1);
          }
          
          .plano-popular:hover {
            transform: scale(1) translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
