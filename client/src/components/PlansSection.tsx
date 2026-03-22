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
    isFeatured: false,
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
    isFeatured: true,
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
    isFeatured: false,
  },
];

export default function PlansSection() {
  return (
    <section className="pulse-plans-section" id="planos">
      <div className="pulse-plans-shell">
        <div className="pulse-plans-header">
          <span className="pulse-plans-kicker">INVESTIMENTO</span>

          <h2 className="pulse-plans-title">
            Planos sob <span>Medida</span>
          </h2>

          <p className="pulse-plans-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a
            estrutura perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="pulse-plans-grid">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`pulse-plan-card ${plan.isFeatured ? 'is-featured' : ''}`}
            >
              {plan.isFeatured && (
                <div className="pulse-featured-badge">Mais escolhido</div>
              )}

              <div className="pulse-plan-top">
                <h3 className="pulse-plan-name">{plan.name}</h3>
                <p className="pulse-plan-price">{plan.price}</p>
                <p className="pulse-plan-subtitle">{plan.subtitle}</p>
                <p className="pulse-plan-intro">{plan.intro}</p>
              </div>

              <ul className="pulse-plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="pulse-plan-bullet" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5541984606633?text=${encodeURIComponent(
                  `Olá! Quero saber mais sobre o plano ${plan.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`pulse-plan-button ${
                  plan.isFeatured ? 'is-featured-button' : ''
                }`}
              >
                {plan.buttonText}
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .pulse-plans-section {
          position: relative;
          padding: 170px 0 110px;
          z-index: 1;
        }

        .pulse-plans-shell {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .pulse-plans-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 72px;
        }

        .pulse-plans-kicker {
          display: inline-block;
          margin-bottom: 14px;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(168, 85, 247, 0.35);
          background: rgba(168, 85, 247, 0.08);
          color: #c084fc;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pulse-plans-title {
          margin: 0 0 16px;
          color: #fff;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: -0.05em;
        }

        .pulse-plans-title span {
          color: #a855f7;
        }

        .pulse-plans-subtitle {
          margin: 0 auto;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .pulse-plans-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          align-items: stretch;
        }

        .pulse-plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 30px 26px 28px;
          background: rgba(14, 10, 22, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          min-width: 0;
        }

        .pulse-plan-card:hover {
          transform: translateY(-4px);
          border-color: rgba(168, 85, 247, 0.25);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
        }

        .pulse-plan-card.is-featured {
          border-color: rgba(168, 85, 247, 0.48);
          box-shadow:
            0 16px 36px rgba(0, 0, 0, 0.22),
            0 0 0 1px rgba(168, 85, 247, 0.08);
        }

        .pulse-featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #fff;
          font-size: 0.66rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 6px 10px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .pulse-plan-top {
          margin-bottom: 22px;
          padding-right: 112px;
        }

        .pulse-plan-name {
          margin: 0 0 14px;
          color: #fff;
          font-size: 1.9rem;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.04em;
          overflow-wrap: anywhere;
        }

        .pulse-plan-price {
          margin: 0 0 12px;
          color: #f5f5f5;
          font-size: 1.7rem;
          line-height: 1.05;
          font-weight: 800;
        }

        .pulse-plan-subtitle {
          margin: 0 0 18px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.98rem;
          line-height: 1.55;
          font-weight: 600;
        }

        .pulse-plan-intro {
          margin: 0;
          color: #ffffff;
          font-size: 0.98rem;
          line-height: 1.55;
          font-weight: 700;
        }

        .pulse-plan-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex: 1;
        }

        .pulse-plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #ffffff;
          font-size: 0.98rem;
          line-height: 1.55;
          min-width: 0;
        }

        .pulse-plan-features li span:last-child {
          overflow-wrap: anywhere;
        }

        .pulse-plan-bullet {
          flex: 0 0 auto;
          width: 7px;
          height: 7px;
          margin-top: 0.62rem;
          background: #facc15;
          transform: rotate(45deg);
        }

        .pulse-plan-button {
          margin-top: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 58px;
          padding: 16px 22px;
          background: #facc15;
          color: #09090b;
          text-decoration: none;
          font-size: 0.98rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          border: none;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 72%);
          transition: transform 0.22s ease, filter 0.22s ease;
          text-align: center;
        }

        .pulse-plan-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
        }

        .pulse-plan-button.is-featured-button {
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #fff;
        }

        @media (max-width: 1100px) {
          .pulse-plans-section {
            padding: 140px 0 90px;
          }

          .pulse-plans-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .pulse-plan-card {
            padding: 26px 22px 24px;
          }

          .pulse-plan-top {
            padding-right: 112px;
          }
        }

        @media (max-width: 768px) {
          .pulse-plans-section {
            padding: 115px 0 80px;
          }

          .pulse-plans-shell {
            width: min(100%, calc(100% - 24px));
          }

          .pulse-plans-header {
            margin-bottom: 42px;
          }

          .pulse-plans-title {
            font-size: clamp(2rem, 11vw, 3rem);
          }

          .pulse-plans-subtitle {
            font-size: 0.96rem;
            line-height: 1.7;
          }

          .pulse-plans-grid {
            gap: 16px;
            max-width: 100%;
          }

          .pulse-plan-card {
            padding: 22px 18px 22px;
          }

          .pulse-featured-badge {
            top: 14px;
            right: 14px;
            font-size: 0.6rem;
            padding: 5px 8px;
          }

          .pulse-plan-top {
            padding-right: 84px;
            margin-bottom: 18px;
          }

          .pulse-plan-name {
            font-size: 1.65rem;
            margin-bottom: 12px;
          }

          .pulse-plan-price {
            font-size: 1.45rem;
            margin-bottom: 10px;
          }

          .pulse-plan-subtitle,
          .pulse-plan-intro,
          .pulse-plan-features li {
            font-size: 0.94rem;
          }

          .pulse-plan-features {
            gap: 14px;
          }

          .pulse-plan-button {
            min-height: 56px;
            font-size: 0.94rem;
            margin-top: 26px;
          }
        }
      `}</style>
    </section>
  );
}