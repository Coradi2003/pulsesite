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
    <section className="section planos" id="planos">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-tag">Investimento</span>
          <h2 className="section-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a estrutura perfeita para o momento do seu negócio.
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
              <div className="plano-header">
                {plan.isPopular && <div className="plano-badge">Mais Escolhido</div>}
                
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
                  className={`plano-btn ${plan.isPopular ? 'plano-btn-primary' : 'plano-btn-secondary'}`}
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
          margin-top: 64px;
        }

        .plano-card {
          flex: 1;
          min-width: 320px;
          max-width: 380px;
          background: rgba(15, 15, 20, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 44px 36px;
          transition: var(--transition);
          position: relative;
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .plano-card:hover {
          background: rgba(19, 19, 28, 0.6);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        }

        /* Destaque suave e elegante para o plano Pro */
        .plano-popular {
          background: linear-gradient(180deg, rgba(22, 22, 32, 0.7) 0%, rgba(13, 13, 18, 0.8) 100%);
          border: 1px solid rgba(138, 43, 226, 0.35);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.4), inset 0 0 40px rgba(138, 43, 226, 0.05);
          transform: scale(1.02);
          z-index: 2;
        }
        
        .plano-popular:hover {
          transform: scale(1.02) translateY(-4px);
          border-color: rgba(138, 43, 226, 0.6);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(138, 43, 226, 0.08);
        }

        .plano-header {
          position: relative;
        }

        /* Badge inserido NO FLUXO do card, sem sobrepor nada */
        .plano-badge {
          display: inline-block;
          background: rgba(138, 43, 226, 0.15);
          color: var(--purple-light);
          border: 1px solid rgba(138, 43, 226, 0.3);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 6px 14px;
          border-radius: 6px;
          margin-bottom: 24px;
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
          letter-spacing: 0.01em;
        }

        .plano-desc {
          font-size: 0.9rem;
          color: var(--gray-mid);
          line-height: 1.55;
          min-height: 48px;
        }

        .plano-price-wrapper {
          margin-top: 24px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .plano-currency {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gray-mid);
        }

        /* Preço menor e mais elegante (antes 3.5rem, agora 2.6rem) */
        .plano-price {
          font-family: var(--font-main);
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .plano-billing {
          font-size: 0.85rem;
          color: var(--gray-mid);
          font-weight: 500;
        }

        .plano-popular .plano-price {
          color: #fff;
        }

        /* Linha divisória fina e sutil */
        .plano-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 32px 0;
        }
        
        .plano-popular .plano-divider {
          background: rgba(138, 43, 226, 0.2);
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
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plano-popular .plano-icon-wrap {
          background: rgba(138, 43, 226, 0.15);
        }

        .plano-features li i {
          color: var(--gray-light);
          font-size: 0.6rem;
        }

        .plano-popular .plano-features li i {
          color: var(--purple-light);
        }

        .plano-footer {
          margin-top: auto;
          display: flex;
          width: 100%;
        }

        /* Estilização exclusiva e premium para os botões dos cards */
        .plano-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 16px 24px;
          border-radius: 12px;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .plano-btn-primary {
          background: var(--purple-bright);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.3);
          border: 1px solid transparent;
        }

        .plano-btn-primary:hover {
          background: #a955ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(138, 43, 226, 0.45);
        }

        .plano-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .plano-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .planos-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }

          .plano-card {
            width: 100%;
            max-width: 440px;
            padding: 40px 32px;
          }

          .plano-popular {
            transform: scale(1);
          }
          
          .plano-popular:hover {
            transform: scale(1) translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
