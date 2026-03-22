import React from 'react';

const plans = [
  {
    name: 'Pulse Start',
    price: 'R$ 350',
    subtitle: 'Entrada rápida e profissional no mundo digital',
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
    subtitle: 'A estrutura ideal para converter visitantes em clientes',
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
    subtitle: 'Máxima performance e autoridade para o seu negócio',
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
    <section className="plans-section" id="planos">
      <div className="plans-container">
        <div className="plans-header">
          <span className="plans-kicker">INVESTIMENTO</span>
          <h2 className="plans-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="plans-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a estrutura
            perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.isFeatured ? 'featured' : ''}`}
            >
              {plan.isFeatured && <div className="featured-badge">Mais escolhido</div>}

              <div className="plan-top">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-subtitle">{plan.subtitle}</p>
                <p className="plan-intro">{plan.intro}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="bullet" />
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
                className={`plan-button ${plan.isFeatured ? 'featured-button' : ''}`}
              >
                {plan.buttonText}
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .plans-section {
          position: relative;
          padding: 170px 0 110px;
        }

        .plans-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .plans-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 72px;
        }

        .plans-kicker {
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
        }

        .plans-title {
          margin: 0 0 16px;
          color: #fff;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: -0.05em;
        }

        .plans-title span {
          color: #a855f7;
        }

        .plans-subtitle {
          margin: 0 auto;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 780px;
          padding: 28px 28px 30px;
          background: rgba(14, 10, 22, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
        }

        .plan-card.featured {
          border-color: rgba(168, 85, 247, 0.48);
          box-shadow:
            0 16px 36px rgba(0, 0, 0, 0.22),
            0 0 0 1px rgba(168, 85, 247, 0.08);
        }

        .featured-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 6px 10px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .plan-top {
          margin-bottom: 22px;
          padding-right: 110px;
        }

        .plan-name {
          margin: 0 0 18px;
          color: #fff;
          font-size: 2.1rem;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .plan-price {
          margin: 0 0 14px;
          color: #f5f5f5;
          font-size: 1.55rem;
          line-height: 1.1;
          font-weight: 800;
        }

        .plan-subtitle {
          margin: 0 0 28px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.98rem;
          line-height: 1.55;
          font-weight: 600;
        }

        .plan-intro {
          margin: 0;
          color: #ffffff;
          font-size: 0.98rem;
          line-height: 1.6;
          font-weight: 700;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex: 1;
        }

        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #ffffff;
          font-size: 0.98rem;
          line-height: 1.55;
        }

        .bullet {
          flex: 0 0 auto;
          width: 7px;
          height: 7px;
          margin-top: 0.62rem;
          background: #facc15;
          transform: rotate(45deg);
        }

        .plan-button {
          margin-top: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
          padding: 16px 22px;
          background: #facc15;
          color: #09090b;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          border: none;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 72%);
          transition: transform 0.22s ease, filter 0.22s ease;
        }

        .plan-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
        }

        .featured-button {
          background: linear-gradient(90deg, #9333ea, #c084fc);
          color: #fff;
        }

        @media (max-width: 1100px) {
          .plans-section {
            padding: 140px 0 90px;
          }

          .plans-grid {
            grid-template-columns: 1fr;
            max-width: 760px;
            margin: 0 auto;
          }

          .plan-card {
            min-height: unset;
          }
        }

        @media (max-width: 768px) {
          .plans-section {
            padding: 115px 0 80px;
          }

          .plans-container {
            padding: 0 16px;
          }

          .plans-header {
            margin-bottom: 42px;
          }

          .plans-title {
            font-size: clamp(2rem, 11vw, 3rem);
          }

          .plans-subtitle {
            font-size: 0.96rem;
            line-height: 1.7;
          }

          .plans-grid {
            gap: 16px;
          }

          .plan-card {
            padding: 22px 18px 22px;
          }

          .featured-badge {
            top: 14px;
            right: 14px;
            font-size: 0.62rem;
            padding: 5px 8px;
          }

          .plan-top {
            padding-right: 92px;
            margin-bottom: 18px;
          }

          .plan-name {
            font-size: 1.8rem;
            margin-bottom: 14px;
          }

          .plan-price {
            font-size: 1.35rem;
            margin-bottom: 10px;
          }

          .plan-subtitle,
          .plan-intro,
          .plan-features li {
            font-size: 0.94rem;
          }

          .plan-features {
            gap: 14px;
          }

          .plan-button {
            min-height: 56px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}