import React from 'react';

const plans = [
  {
    icon: '💡',
    name: 'Pulse Start',
    badge: 'Básico',
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
    target: '👉 Perfeito para autônomos e iniciantes',
    isPopular: false,
  },
  {
    icon: '⚡',
    name: 'Pulse Pro',
    badge: 'Intermediário',
    price: '650',
    description: 'Mais completo, mais profissional, mais conversão.',
    features: [
      'Design estratégico e personalizado',
      'Integração com redes sociais',
      'Formulário de contato + WhatsApp',
      'Google Analytics (visitas em tempo real)',
      'SEO básico (pra aparecer no Google)',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem otimizada',
      'Suporte + manutenção por 6 meses',
    ],
    target: '👉 Ideal para empresas que querem crescer online',
    isPopular: true,
  },
  {
    icon: '🔥',
    name: 'Pulse Elite',
    badge: 'Premium',
    price: '1.200',
    description: 'Projeto completo focado em gerar clientes.',
    features: [
      'Design premium focado em conversão',
      'Animações modernas e experiência envolvente',
      'Integração completa (WhatsApp, redes sociais, formulários)',
      'Google Analytics avançado',
      'Estrutura otimizada para vendas',
      '1 ano de domínio (.com.br) incluso',
      'Hospedagem de alta performance',
      'Suporte PRIORITÁRIO 24h',
      'Manutenção durante 1 ano',
    ],
    target: '👉 Pra quem quer vender todos os dias com o site',
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
        <div className="plans-header reveal">
          <span className="plans-kicker">🚀 ESTRATÉGIA DIGITAL</span>

          <h2 className="plans-title">
            Planos Pulse <span>Futuro</span>
          </h2>

          <p className="plans-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas. Escolha a estrutura perfeita para o momento do seu negócio.
          </p>
        </div>

        <div className="plans-cards">
          {plans.map((plan, i) => (
            <article
              key={i}
              className={`plan-card reveal delay-${i + 1} ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="plan-badge">Mais escolhido</div>
              )}

              <div className="plan-top">
                <div className="plan-label-line">
                  <span className="plan-icon">{plan.icon}</span>
                  <span className="plan-name">{plan.name}</span>
                  <span className="plan-mini-tag">{plan.badge}</span>
                </div>

                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price-box">
                <div className="plan-price-row">
                  <span className="currency">R$</span>
                  <strong>{plan.price}</strong>
                </div>
                <small>Pagamento Único</small>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check"><i className="fas fa-check"></i></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="plan-target-callout">
                {plan.target}
              </div>

              <a
                href={`https://wa.me/5541984606633?text=${encodeURIComponent(
                  `Olá! Quero saber mais sobre o plano ${plan.name}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`plan-button ${plan.isPopular ? 'popular-btn' : ''}`}
              >
                QUERO COMEÇAR AGORA
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
            linear-gradient(180deg, transparent 0%, rgba(11, 2, 19, 0.4) 45%, transparent 100%);
        }

        .plans-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1240px;
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
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.08));
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
          background: rgba(192, 132, 252, 0.1);
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(192, 132, 252, 0.2);
        }

        .plans-title {
          margin: 0;
          font-family: var(--font-main);
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
          max-width: 680px;
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
          padding: 36px 32px 32px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%),
            rgba(10, 8, 18, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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
            rgba(168,85,247,0.10),
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
          transform: translateY(-8px);
          border-color: rgba(192, 132, 252, 0.3);
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.45),
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
          z-index: 2;
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

        .plan-card.popular:hover {
          transform: translateY(-16px) scale(1.02);
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
          text-transform: uppercase;
        }

        .plan-top {
          margin-bottom: 24px;
          padding-right: 0;
        }
        
        .popular .plan-top {
          padding-right: 110px; /* space for badge */
        }

        .plan-label-line {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .plan-icon {
          font-size: 1.4rem;
        }

        .plan-name {
          font-family: var(--font-main);
          color: #ffffff;
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .plan-mini-tag {
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.14);
          border: 1px solid rgba(192, 132, 252, 0.22);
          color: #d8b4fe;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .plan-description {
          margin: 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.95rem;
          line-height: 1.6;
          min-height: 48px;
        }

        .plan-price-box {
          margin-bottom: 32px;
          padding: 20px 24px;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .plan-price-row {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          line-height: 1;
        }

        .currency {
          color: rgba(255,255,255,0.6);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        
        .popular .currency {
          color: #c084fc;
        }

        .plan-price-row strong {
          font-family: var(--font-main);
          color: #ffffff;
          font-size: clamp(2.6rem, 4vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .plan-price-box small {
          display: inline-block;
          margin-top: 10px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.95rem;
          line-height: 1.5;
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
          font-size: 10px;
          margin-top: 1px;
        }

        .plan-target-callout {
          margin-top: auto;
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 12px;
          background: rgba(168, 85, 247, 0.05);
          border: 1px solid rgba(168, 85, 247, 0.15);
          color: #F3E8FF;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .plan-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 56px;
          width: 100%;
          border-radius: 14px;
          padding: 16px 24px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
        }

        .plan-button:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.25);
        }

        .popular-btn {
          background: linear-gradient(135deg, #a855f7 0%, #d946ef 100%);
          border: none;
          box-shadow: 0 14px 30px rgba(168, 85, 247, 0.25);
        }

        .popular-btn:hover {
          background: linear-gradient(135deg, #b56bff 0%, #e859a8 100%);
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(168, 85, 247, 0.35);
        }

        @media (max-width: 1100px) {
          .plans-cards {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
            gap: 32px;
          }

          .plan-card.popular {
            transform: none;
          }

          .plan-card,
          .plan-card:hover {
            transform: none;
          }

          .plans-section {
            padding: 100px 0;
          }
        }

        @media (max-width: 768px) {
          .plans-title {
            font-size: 2.8rem;
          }

          .plan-card {
            padding: 32px 24px 28px;
            border-radius: 24px;
          }

          .popular .plan-top {
            padding-right: 0;
          }

          .plan-badge {
            position: relative;
            top: 0;
            right: 0;
            display: inline-flex;
            margin-bottom: 20px;
            align-self: flex-start;
          }

          .plan-price-row strong {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}