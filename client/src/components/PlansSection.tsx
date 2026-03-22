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
      'SEO básico (otimização para o Google)',
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
    <section className="plans-section" id="planos">
      <div className="plans-bg-orb orb-1" />
      <div className="plans-bg-orb orb-2" />
      <div className="plans-grid-overlay" />

      <div className="plans-container">
        <div className="plans-header">
          <span className="plans-kicker">INVESTIMENTO</span>

          <h2 className="plans-title">
            Planos sob <span>Medida</span>
          </h2>

          <p className="plans-subtitle">
            Escolha a estrutura ideal para o seu momento e tenha um site com
            aparência premium, alta conversão e presença profissional de verdade.
          </p>
        </div>

        <div className="plans-cards">
          {plans.map((plan, i) => (
            <article
              key={i}
              className={`plan-card ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="plan-badge">Mais escolhido</div>
              )}

              <div className="plan-top">
                <div className="plan-label-line">
                  <span className="plan-name">{plan.name}</span>
                  {plan.isPopular && <span className="plan-mini-tag">Premium</span>}
                </div>

                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price-box">
                <div className="plan-price-row">
                  <span className="currency">R$</span>
                  <strong>{plan.price}</strong>
                </div>
                <small>pagamento único</small>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5541984606633?text=${encodeURIComponent(
                  `Olá! Quero saber mais sobre o plano ${plan.name}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`plan-button ${plan.isPopular ? 'popular-btn' : ''}`}
              >
                Quero meu site
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .plans-section {
          position: relative;
          overflow: hidden;
          padding: 140px 0 120px;
          background:
            radial-gradient(circle at top center, rgba(168, 85, 247, 0.14), transparent 32%),
            linear-gradient(180deg, #06010d 0%, #0b0213 45%, #07010d 100%);
        }

        .plans-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .plans-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.07) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.08));
          pointer-events: none;
          z-index: 0;
        }

        .plans-bg-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          top: -100px;
          left: -100px;
          width: 320px;
          height: 320px;
          background: rgba(139, 92, 246, 0.18);
        }

        .orb-2 {
          right: -120px;
          bottom: -80px;
          width: 360px;
          height: 360px;
          background: rgba(192, 132, 252, 0.12);
        }

        .plans-header {
          max-width: 900px;
          margin: 0 auto 64px;
          text-align: center;
        }

        .plans-kicker {
          display: inline-block;
          margin-bottom: 16px;
          color: #c084fc;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .plans-title {
          margin: 0;
          font-size: clamp(2.3rem, 4vw, 4.2rem);
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .plans-title span {
          background: linear-gradient(135deg, #d8b4fe 0%, #a855f7 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .plans-subtitle {
          margin: 20px auto 0;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.06rem;
          line-height: 1.75;
        }

        .plans-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          padding: 30px 28px 28px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%),
            rgba(10, 8, 18, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .plan-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.14),
            rgba(168,85,247,0.14),
            rgba(255,255,255,0.04)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.9;
        }

        .plan-card:hover {
          transform: translateY(-10px);
          border-color: rgba(192, 132, 252, 0.35);
          box-shadow:
            0 22px 70px rgba(0, 0, 0, 0.45),
            0 0 30px rgba(168, 85, 247, 0.10);
        }

        .plan-card.popular {
          transform: translateY(-12px) scale(1.02);
          background:
            linear-gradient(180deg, rgba(168,85,247,0.10) 0%, rgba(255,255,255,0.03) 100%),
            rgba(11, 8, 20, 0.95);
          border-color: rgba(168, 85, 247, 0.55);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.48),
            0 0 45px rgba(168, 85, 247, 0.16);
        }

        .plan-card.popular::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(168,85,247,0.24), rgba(192,132,252,0.06));
          z-index: -1;
          filter: blur(20px);
        }

        .plan-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          padding: 8px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #a855f7 0%, #d946ef 100%);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.03em;
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.35);
        }

        .plan-top {
          margin-bottom: 22px;
          padding-right: 96px;
        }

        .plan-label-line {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .plan-name {
          color: #ffffff;
          font-size: 1.45rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .plan-mini-tag {
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.14);
          border: 1px solid rgba(192, 132, 252, 0.22);
          color: #d8b4fe;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .plan-description {
          margin: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1rem;
          line-height: 1.65;
          min-height: 56px;
        }

        .plan-price-box {
          margin-bottom: 24px;
          padding: 18px 18px 16px;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .plan-price-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          line-height: 1;
        }

        .currency {
          color: rgba(255,255,255,0.92);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .plan-price-row strong {
          color: #ffffff;
          font-size: clamp(2.6rem, 4vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .plan-price-box small {
          display: inline-block;
          margin-top: 10px;
          color: rgba(255, 255, 255, 0.58);
          font-size: 0.92rem;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 0.98rem;
          line-height: 1.6;
        }

        .check {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.16);
          border: 1px solid rgba(192, 132, 252, 0.18);
          color: #d8b4fe;
          font-size: 13px;
          font-weight: 700;
          margin-top: 1px;
        }

        .plan-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 58px;
          width: 100%;
          border-radius: 16px;
          padding: 16px 22px;
          background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%);
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: -0.01em;
          box-shadow: 0 14px 30px rgba(147, 51, 234, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }

        .plan-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(147, 51, 234, 0.36);
          opacity: 0.98;
        }

        .popular-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 45%, #d946ef 100%);
          box-shadow: 0 18px 40px rgba(168, 85, 247, 0.32);
        }

        @media (max-width: 1100px) {
          .plans-cards {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .plan-card.popular {
            transform: none;
          }

          .plan-card,
          .plan-card:hover {
            transform: none;
          }

          .plans-section {
            padding: 120px 0 90px;
          }
        }

        @media (max-width: 768px) {
          .plans-container {
            padding: 0 18px;
          }

          .plans-header {
            margin-bottom: 40px;
          }

          .plans-subtitle {
            font-size: 0.98rem;
            line-height: 1.7;
          }

          .plan-card {
            padding: 24px 20px 20px;
            border-radius: 22px;
          }

          .plan-top {
            padding-right: 0;
          }

          .plan-badge {
            position: static;
            display: inline-flex;
            margin-bottom: 16px;
          }

          .plan-description {
            min-height: auto;
          }

          .plan-price-box {
            padding: 16px;
            border-radius: 18px;
          }

          .plan-price-row strong {
            font-size: 2.8rem;
          }

          .plan-button {
            min-height: 56px;
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
}