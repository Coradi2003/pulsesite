import React from 'react';

const plans = [
  {
    name: 'Pulse Start',
    price: 'R$ 350',
    subtitle: 'Entrada rápida e profissional no mundo digital.',
    intro: 'Inclui:',
    features: [
      'Site institucional moderno e responsivo',
      'Configuração de botão de WhatsApp',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem otimizada configurada',
      'Entrega expressa (até 5 dias)',
      'Manutenção gratuita por 30 dias',
    ],
    buttonText: 'Contratar Pulse Start',
    featured: false,
  },
  {
    name: 'Pulse Pro',
    price: 'R$ 650',
    subtitle: 'A estrutura ideal para converter visitantes em clientes.',
    intro: 'Inclui todos os itens do plano Start, mais:',
    features: [
      'Design estratégico e 100% personalizado',
      'Integração com redes sociais e contatos',
      'Google Analytics (visitas em tempo real)',
      'SEO básico para o Google',
      'Hospedagem rápida e segura',
      'Suporte e manutenção expandidos (6 meses)',
      'Estrutura mais forte para conversão',
    ],
    buttonText: 'Contratar Pulse Pro',
    featured: true,
  },
  {
    name: 'Pulse Elite',
    price: 'R$ 1.200',
    subtitle: 'Máxima performance e autoridade para o seu negócio.',
    intro: 'Inclui todos os itens do plano Pro, mais:',
    features: [
      'Design premium com foco total em vendas',
      'Animações modernas e interativas',
      'Tracking avançado (Pixel, Analytics, Tags)',
      'Estrutura pronta para campanhas de Ads',
      'Hospedagem de altíssima performance',
      'Suporte prioritário (VIP) 24h',
      'Manutenção completa durante 1 ano',
    ],
    buttonText: 'Contratar Pulse Elite',
    featured: false,
  },
];

export default function PlansSection() {
  return (
    <section className="pf-plans" id="planos">
      <div className="pf-plans__inner">
        <div className="pf-plans__header">
          <span className="pf-plans__kicker">INVESTIMENTO</span>

          <h2 className="pf-plans__title">
            Planos sob <span>Medida</span>
          </h2>

          <p className="pf-plans__subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a
            estrutura perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="pf-plans__grid">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`pf-plan-card ${plan.featured ? 'pf-plan-card--featured' : ''}`}
            >
              {plan.featured && (
                <div className="pf-plan-card__badge">Mais escolhido</div>
              )}

              <div className="pf-plan-card__top">
                <h3 className="pf-plan-card__name">{plan.name}</h3>
                <div className="pf-plan-card__price">{plan.price}</div>
                <p className="pf-plan-card__subtitle">{plan.subtitle}</p>
                <p className="pf-plan-card__intro">{plan.intro}</p>
              </div>

              <ul className="pf-plan-card__features">
                {plan.features.map((feature) => (
                  <li key={feature} className="pf-plan-card__feature">
                    <span className="pf-plan-card__diamond" />
                    <span className="pf-plan-card__feature-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5541984606633?text=${encodeURIComponent(
                  `Olá! Quero saber mais sobre o plano ${plan.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`pf-plan-card__button ${plan.featured ? 'pf-plan-card__button--featured' : ''}`}
              >
                {plan.buttonText}
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .pf-plans {
          width: 100%;
          padding: 170px 0 110px;
          position: relative;
          z-index: 1;
        }

        .pf-plans__inner {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .pf-plans__header {
          max-width: 880px;
          margin: 0 auto 72px;
          text-align: center;
        }

        .pf-plans__kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          margin-bottom: 14px;
          border-radius: 999px;
          border: 1px solid rgba(168, 85, 247, 0.35);
          background: rgba(168, 85, 247, 0.08);
          color: #c084fc;
          font-size: 0.78rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pf-plans__title {
          margin: 0 0 16px;
          color: #ffffff;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.05em;
        }

        .pf-plans__title span {
          color: #a855f7;
        }

        .pf-plans__subtitle {
          margin: 0 auto;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.8;
        }

        .pf-plans__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
          width: 100%;
        }

        .pf-plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 28px 26px 26px;
          background: rgba(12, 9, 20, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .pf-plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
          border-color: rgba(168, 85, 247, 0.22);
        }

        .pf-plan-card--featured {
          border-color: rgba(168, 85, 247, 0.48);
          box-shadow:
            0 16px 36px rgba(0, 0, 0, 0.22),
            0 0 0 1px rgba(168, 85, 247, 0.08);
        }

        .pf-plan-card__badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #ffffff;
          font-size: 0.66rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pf-plan-card__top {
          margin-bottom: 20px;
          padding-right: 118px;
        }

        .pf-plan-card__name {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 1.75rem;
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -0.04em;
          overflow-wrap: anywhere;
        }

        .pf-plan-card__price {
          margin: 0 0 12px;
          color: #f5f5f5;
          font-size: 1.65rem;
          font-weight: 800;
          line-height: 1.05;
        }

        .pf-plan-card__subtitle {
          margin: 0 0 14px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.45;
        }

        .pf-plan-card__intro {
          margin: 0;
          color: #ffffff;
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.45;
        }

        .pf-plan-card__features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex: 1;
        }

        .pf-plan-card__feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }

        .pf-plan-card__diamond {
          flex: 0 0 auto;
          width: 7px;
          height: 7px;
          margin-top: 0.58rem;
          background: #facc15;
          transform: rotate(45deg);
        }

        .pf-plan-card__feature-text {
          color: #ffffff;
          font-size: 0.98rem;
          font-weight: 500;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .pf-plan-card__button {
          margin-top: 30px;
          min-height: 58px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 22px;
          background: #facc15;
          color: #09090b;
          text-decoration: none;
          text-align: center;
          font-size: 0.98rem;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.02em;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 72%);
          transition: transform 0.22s ease, filter 0.22s ease;
        }

        .pf-plan-card__button:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
        }

        .pf-plan-card__button--featured {
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #ffffff;
        }

        @media (max-width: 1100px) {
          .pf-plans {
            padding: 140px 0 90px;
          }

          .pf-plans__inner {
            width: min(560px, calc(100% - 24px));
          }

          .pf-plans__grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .pf-plan-card__top {
            padding-right: 118px;
          }
        }

        @media (max-width: 768px) {
          .pf-plans {
            padding: 115px 0 80px;
          }

          .pf-plans__inner {
            width: calc(100% - 20px);
          }

          .pf-plans__header {
            margin-bottom: 42px;
          }

          .pf-plans__title {
            font-size: clamp(2rem, 11vw, 3rem);
          }

          .pf-plans__subtitle {
            font-size: 0.96rem;
            line-height: 1.7;
          }

          .pf-plan-card {
            padding: 22px 18px 22px;
          }

          .pf-plan-card__badge {
            top: 14px;
            right: 14px;
            font-size: 0.6rem;
            padding: 5px 8px;
          }

          .pf-plan-card__top {
            padding-right: 82px;
            margin-bottom: 18px;
          }

          .pf-plan-card__name {
            font-size: 1.55rem;
            margin-bottom: 10px;
          }

          .pf-plan-card__price {
            font-size: 1.38rem;
            margin-bottom: 10px;
          }

          .pf-plan-card__subtitle,
          .pf-plan-card__intro,
          .pf-plan-card__feature-text {
            font-size: 0.94rem;
          }

          .pf-plan-card__features {
            gap: 14px;
          }

          .pf-plan-card__button {
            min-height: 56px;
            margin-top: 24px;
            font-size: 0.94rem;
          }
        }
      `}</style>
    </section>
  );
}