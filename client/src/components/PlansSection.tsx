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
    btnText: 'Quero meu site',
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
    btnText: 'Quero meu site',
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
    btnText: 'Quero meu site',
  },
];

export default function PlansSection() {
  return (
    <section className="section planos-ultra" id="planos">
      <div className="container">
        <div className="planos-header">
          <span className="planos-kicker">Investimento</span>
          <h2 className="planos-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="planos-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a
            estrutura perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="planos-grid">
          {plans.map((plan, index) => (
            <article
              key={index}
              className={`plano-card ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="popular-badge">Mais escolhido</div>
              )}

              <div className="plano-top">
                <h3 className="plano-name">{plan.name}</h3>
                <p className="plano-desc">{plan.description}</p>
              </div>

              <div className="plano-price-wrap">
                <span className="plano-currency">R$</span>
                <span className="plano-price">{plan.price}</span>
                <span className="plano-billing">/único</span>
              </div>

              <div className="plano-divider" />

              <ul className="plano-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plano-footer">
                <a
                  href={`https://wa.me/5541984606633?text=${encodeURIComponent(
                    `Olá! Quero saber mais sobre o plano ${plan.name}.`
                  )}`}
                  className={`btn-plano ${
                    plan.isPopular ? 'btn-primary' : 'btn-secondary'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.btnText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .planos-ultra {
          position: relative;
          z-index: 1;
          padding: 170px 0 120px;
        }

        .planos-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 72px;
          padding: 0 20px;
        }

        .planos-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          margin-bottom: 18px;
          border-radius: 999px;
          border: 1px solid rgba(168, 85, 247, 0.35);
          background: rgba(168, 85, 247, 0.08);
          color: #c084fc;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .planos-title {
          margin: 0 0 18px;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 0.98;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .planos-title span {
          color: #a855f7;
        }

        .planos-subtitle {
          margin: 0 auto;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.08rem;
          line-height: 1.8;
        }

        .planos-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          align-items: stretch;
        }

        .plano-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          padding: 34px 28px 26px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)),
            rgba(10, 8, 18, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          overflow: hidden;
        }

        .plano-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow:
            0 18px 48px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .plano-card.popular {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(168, 85, 247, 0.6);
          box-shadow:
            0 20px 54px rgba(0, 0, 0, 0.34),
            0 0 0 1px rgba(168, 85, 247, 0.12),
            0 0 36px rgba(168, 85, 247, 0.14);
        }

        .plano-card.popular:hover {
          transform: translateY(-14px) scale(1.02);
          border-color: rgba(168, 85, 247, 0.75);
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.36),
            0 0 0 1px rgba(168, 85, 247, 0.18),
            0 0 44px rgba(168, 85, 247, 0.2);
        }

        .popular-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #9333ea, #c084fc);
          color: #fff;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: 0 10px 24px rgba(168, 85, 247, 0.28);
        }

        .plano-top {
          margin-bottom: 24px;
          padding-right: 90px;
        }

        .plano-name {
          margin: 0 0 12px;
          color: #fff;
          font-size: 2rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .plano-desc {
          margin: 0;
          min-height: 52px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1rem;
          line-height: 1.6;
        }

        .plano-price-wrap {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-bottom: 24px;
        }

        .plano-currency {
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.15rem;
          line-height: 1;
          font-weight: 700;
          transform: translateY(-8px);
        }

        .plano-price {
          color: #fff;
          font-size: clamp(3rem, 4vw, 4rem);
          line-height: 0.9;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .plano-billing {
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .plano-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04),
            rgba(255,255,255,0.14),
            rgba(255,255,255,0.04)
          );
          margin-bottom: 24px;
        }

        .plano-card.popular .plano-divider {
          background: linear-gradient(
            90deg,
            rgba(168,85,247,0.08),
            rgba(168,85,247,0.4),
            rgba(168,85,247,0.08)
          );
        }

        .plano-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 1rem;
          line-height: 1.5;
        }

        .feature-check {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.14);
          border: 1px solid rgba(168, 85, 247, 0.28);
          color: #d8b4fe;
          font-size: 0.85rem;
          font-weight: 900;
          margin-top: 1px;
        }

        .plano-footer {
          margin-top: 28px;
        }

        .btn-plano {
          width: 100%;
          min-height: 58px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 22px;
          border-radius: 16px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
        }

        .btn-plano:hover {
          transform: translateY(-2px);
        }

        .btn-secondary {
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
        }

        .btn-primary {
          color: #fff;
          border: 1px solid rgba(168, 85, 247, 0.52);
          background: linear-gradient(135deg, #7e22ce, #a855f7 55%, #c084fc);
          box-shadow: 0 14px 28px rgba(168, 85, 247, 0.28);
        }

        .btn-primary:hover {
          box-shadow: 0 18px 34px rgba(168, 85, 247, 0.38);
        }

        @media (max-width: 1100px) {
          .planos-ultra {
            padding: 140px 0 100px;
          }

          .planos-grid {
            grid-template-columns: 1fr;
            max-width: 640px;
            margin: 0 auto;
          }

          .plano-card,
          .plano-card.popular,
          .plano-card:hover,
          .plano-card.popular:hover {
            transform: none;
          }
        }

        @media (max-width: 768px) {
          .planos-ultra {
            padding: 110px 0 90px;
          }

          .planos-header {
            margin-bottom: 44px;
            padding: 0 14px;
          }

          .planos-kicker {
            margin-bottom: 14px;
            font-size: 0.74rem;
            padding: 7px 14px;
          }

          .planos-title {
            font-size: clamp(2rem, 10vw, 2.8rem);
            margin-bottom: 14px;
          }

          .planos-subtitle {
            font-size: 0.98rem;
            line-height: 1.7;
          }

          .planos-grid {
            gap: 20px;
          }

          .plano-card {
            padding: 26px 20px 20px;
            border-radius: 22px;
          }

          .popular-badge {
            top: 14px;
            right: 14px;
            font-size: 0.68rem;
            padding: 6px 10px;
          }

          .plano-top {
            margin-bottom: 18px;
            padding-right: 86px;
          }

          .plano-name {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }

          .plano-desc {
            min-height: auto;
            font-size: 0.96rem;
          }

          .plano-price-wrap {
            gap: 6px;
            margin-bottom: 18px;
          }

          .plano-currency {
            font-size: 1rem;
            transform: translateY(-6px);
          }

          .plano-price {
            font-size: clamp(2.4rem, 11vw, 3rem);
          }

          .plano-billing {
            font-size: 0.88rem;
            margin-bottom: 4px;
          }

          .plano-divider {
            margin-bottom: 18px;
          }

          .plano-features {
            gap: 12px;
          }

          .plano-features li {
            font-size: 0.96rem;
          }

          .feature-check {
            width: 20px;
            height: 20px;
            font-size: 0.78rem;
          }

          .plano-footer {
            margin-top: 22px;
          }

          .btn-plano {
            min-height: 54px;
            border-radius: 14px;
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
}