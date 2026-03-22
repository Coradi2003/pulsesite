import React from 'react';

const plans = [
  {
    name: 'Pulse Start',
    price: '350',
    description: 'Ideal para quem quer entrar no digital rápido.',
    features: [
      'Site institucional moderno e responsivo',
      'Botão de WhatsApp integrado',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem otimizada',
      'Entrega rápida (até 5 dias)',
      'Manutenção por 30 dias',
    ],
    isPopular: false,
    buttonClass: 'btn btn-secondary',
  },
  {
    name: 'Pulse Pro',
    price: '650',
    description: 'Mais completo, mais profissional, mais conversão.',
    features: [
      'Design estratégico e personalizado',
      'Integração com redes sociais',
      'Formulário de contato + WhatsApp',
      'Google Analytics (visitas em tempo real)',
      'SEO básico',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem otimizada',
      'Suporte + manutenção por 6 meses',
    ],
    isPopular: true,
    buttonClass: 'btn btn-primary',
  },
  {
    name: 'Pulse Elite',
    price: '1.200',
    description: 'Projeto completo focado em gerar clientes.',
    features: [
      'Design premium focado em conversão',
      'Animações modernas',
      'Integração completa (WhatsApp, redes), formulários', // text shortened to fit gracefully
      'Google Analytics avançado',
      'Estrutura otimizada para vendas',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem de alta performance',
      'Suporte prioritário 24h',
      'Manutenção durante 1 ano',
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
            Planos Pulse <span>Futuro</span>
          </h2>
          <p className="section-subtitle">
            Escolha o plano ideal para colocar o seu negócio no digital e atrair mais clientes.
          </p>
        </div>

        <div className="planos-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plano-card reveal delay-${index + 1} ${
                plan.isPopular ? 'plano-popular' : ''
              }`}
            >
              {plan.isPopular && <div className="plano-badge">Mais Popular</div>}
              
              <div className="plano-header">
                <h3 className="plano-name">{plan.name}</h3>
                <p className="plano-desc">{plan.description}</p>
                <div className="plano-price-wrapper">
                  <span className="plano-currency">R$</span>
                  <span className="plano-price">{plan.price}</span>
                </div>
              </div>

              <ul className="plano-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="plano-footer">
                <a
                  href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Gostaria%20de%20contratar%20o%20plano%20${encodeURIComponent(
                    plan.name
                  )}.%20Podemos%20conversar?`}
                  className={`${plan.buttonClass} w-full text-center justify-center`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero meu site
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

        .planos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 60px;
          align-items: start;
        }

        .plano-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 32px;
          transition: var(--transition);
          position: relative;
          backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .plano-card:hover {
          border-color: rgba(138, 43, 226, 0.45);
          box-shadow: 0 8px 40px rgba(138, 43, 226, 0.15), 0 0 0 1px rgba(138, 43, 226, 0.1);
          transform: translateY(-6px);
        }

        .plano-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--purple-bright), transparent);
          opacity: 0;
          transition: var(--transition);
          border-radius: 20px 20px 0 0;
        }

        .plano-card:hover::before {
          opacity: 1;
        }

        .plano-popular {
          border-color: rgba(138, 43, 226, 0.5);
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.12);
          background: linear-gradient(
            180deg,
            rgba(19, 19, 28, 0.8) 0%,
            rgba(138, 43, 226, 0.05) 100%
          );
          transform: scale(1.03);
        }
        
        .plano-popular:hover {
          transform: scale(1.03) translateY(-6px);
          box-shadow: 0 12px 50px rgba(138, 43, 226, 0.25);
        }

        .plano-popular::before {
          opacity: 1;
        }

        .plano-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--purple-neon), var(--purple-bright));
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 16px;
          border-radius: 100px;
          box-shadow: 0 0 16px var(--purple-glow);
          white-space: nowrap;
          z-index: 2;
        }

        .plano-header {
          margin-bottom: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--border);
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 8px;
        }

        .plano-desc {
          font-size: 0.85rem;
          color: var(--gray-light);
          min-height: 48px;
        }

        .plano-price-wrapper {
          margin-top: 16px;
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }

        .plano-currency {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-mid);
          margin-top: 6px;
        }

        .plano-price {
          font-family: var(--font-main);
          font-size: 3rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
          flex-grow: 1;
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          color: var(--gray-light);
          line-height: 1.5;
        }

        .plano-features li i {
          color: var(--purple-bright);
          font-size: 0.9rem;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .plano-footer {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .planos-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
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
