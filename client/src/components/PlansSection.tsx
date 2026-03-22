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
    <section className="section nps-master" id="planos">
      <div className="container">
        <div className="nps-header reveal">
          <div className="nps-kicker">🚀 Criação de Sites</div>
          <h2 className="nps-title">Planos Pulse Futuro</h2>
          <p className="nps-subtitle">
            Estruturas sob medida para o tamanho da sua ambição. Transparência total e pagamento único.
          </p>
        </div>

        <div className="nps-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`nps-card reveal delay-${index + 1} ${
                plan.isPopular ? 'nps-popular' : ''
              }`}
            >
              {plan.isPopular && <div className="nps-popular-flag">Mais Escolhido</div>}

              <div className="nps-top">
                <div className="nps-icon-wrapper">{plan.icon}</div>
                <div className="nps-name-row">
                  <h3 className="nps-name">{plan.name}</h3>
                  <span className="nps-badge">{plan.badge}</span>
                </div>
                <p className="nps-desc">{plan.description}</p>
              </div>

              <div className="nps-price-box">
                <span className="nps-currency">R$</span>
                <span className="nps-price">{plan.price}</span>
                <span className="nps-billing">/único</span>
              </div>

              <ul className="nps-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check nps-check-icon"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="nps-target-box">
                {plan.target}
              </div>

              <a
                href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Gostaria%20de%20come%C3%A7ar%20meu%20projeto%20com%20o%20plano%20${encodeURIComponent(
                  plan.name
                )}.%20Podemos%20conversar?`}
                className={`nps-btn ${plan.isPopular ? 'nps-btn-primary' : 'nps-btn-secondary'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero começar agora
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ====================================================
           NPS (New Plans Section) - BUG-FREE & ELEGANT
           ==================================================== */
           
        .nps-master {
          position: relative;
          padding: 120px 0;
          background: transparent; /* No absolute backgrounds that break the grid */
        }

        .nps-master .container {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .nps-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .nps-kicker {
          display: inline-block;
          font-weight: 800;
          font-size: 0.85rem;
          color: #B56BFF;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 20px;
          padding: 6px 16px;
          background: rgba(138, 43, 226, 0.12);
          border-radius: 100px;
        }

        .nps-title {
          font-family: var(--font-main);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .nps-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.65);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* FLEXBOX para máxima estabilidade no Mobile/Desktop */
        .nps-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 28px;
        }

        .nps-card {
          flex: 1;
          position: relative;
          background: rgba(15, 12, 22, 0.65); /* Violeta profundo transparente para encaixar na LandingPage */
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 48px 36px 40px; /* Mais recheio interno */
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .nps-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .nps-popular {
          background: rgba(22, 14, 34, 0.7); /* Ligeiramente mais aceso */
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 20px 60px rgba(168, 85, 247, 0.15);
          transform: translateY(-12px);
          z-index: 10;
        }

        .nps-popular:hover {
          transform: translateY(-16px);
          border-color: rgba(168, 85, 247, 0.5);
          box-shadow: 0 30px 80px rgba(168, 85, 247, 0.25);
        }

        /* SELO CORRIGIDO - OVERFLOW HIDDEN DESTROYED IT BEFORE */
        .nps-popular-flag {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #A855F7, #EC4899);
          color: #fff;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 8px 18px;
          border-radius: 100px;
          box-shadow: 0 8px 20px rgba(236,72,153,0.35);
          white-space: nowrap;
          z-index: 5; /* O card não esconde mais isso! */
        }

        .nps-top {
          margin-bottom: 8px;
        }

        .nps-icon-wrapper {
          font-size: 2rem;
          margin-bottom: 24px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
        }

        .nps-popular .nps-icon-wrapper {
          background: rgba(168, 85, 247, 0.15);
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: inset 0 2px 10px rgba(168,85,247,0.2);
        }

        .nps-name-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .nps-name {
          font-family: var(--font-main);
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .nps-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          background: rgba(255,255,255,0.1);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 6px;
        }

        .nps-popular .nps-badge {
          background: rgba(236,72,153,0.15);
          color: #F9A8D4;
        }

        .nps-desc {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.95rem;
          line-height: 1.6;
          min-height: 48px; /* Traz estabilidade */
        }

        /* PREÇO ELEGANTE */
        .nps-price-box {
          display: flex;
          align-items: baseline;
          padding: 24px 0 32px;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08); /* Linha divisória limpa aqui */
        }

        .nps-currency {
          font-size: 1.3rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          margin-right: 6px;
        }

        .nps-popular .nps-currency {
          color: #B56BFF;
        }

        .nps-price {
          font-family: var(--font-main);
          font-size: 3.6rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .nps-billing {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 600;
          margin-left: 6px;
        }

        /* FEATURES COM ICONE BONITO */
        .nps-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1; /* Estica para empurrar os botões */
          margin-bottom: 32px;
        }

        .nps-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .nps-check-icon {
          color: #B56BFF; /* FontAwesome Check Elegante */
          font-size: 0.9rem;
          margin-top: 3px;
        }

        /* TARGET BOX: Limpa, sem traços de borda confusos, fundo integrado */
        .nps-target-box {
          margin-top: auto;
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05); /* Sólido ultra-fino em vez de dashed */
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .nps-popular .nps-target-box {
          background: rgba(168, 85, 247, 0.08); /* Fundo roxo suave */
          border-color: rgba(168, 85, 247, 0.15);
          color: #fff;
        }

        /* BOTÕES SIMPLESMENTE PODEROSOS E SÓLIDOS */
        .nps-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 18px 24px;
          border-radius: 12px;
          font-family: var(--font-main);
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          text-transform: uppercase;
        }

        .nps-btn-primary {
          background: #A855F7; /* Roxão sólido seguro que não briga com outras cores */
          color: #fff;
          box-shadow: 0 4px 16px rgba(168,85,247,0.4);
          border: none;
        }

        .nps-btn-primary:hover {
          transform: translateY(-2px);
          background: #B56BFF;
          box-shadow: 0 8px 24px rgba(168,85,247,0.5);
        }

        .nps-btn-secondary {
          background: rgba(255,255,255,0.06);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .nps-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.25);
        }


        /* ====================================================
           MOBILE PERFEITO
           ==================================================== */
        @media (max-width: 1100px) {
          .nps-grid {
            flex-direction: column;
            align-items: center;
            gap: 48px; /* Mais espaço pra caixa popular flutuar sua badge no topo */
          }
          
          .nps-popular {
            transform: translateY(0);
          }

          .nps-popular:hover {
            transform: translateY(-4px);
          }

          .nps-master {
            padding: 80px 0;
          }

          .nps-title {
            font-size: 2.8rem;
          }

          .nps-card {
            width: 100%;
            max-width: 440px;
            padding: 40px 32px;
          }

          .nps-popular-flag {
            /* No celular, mantemos absoluto se houver espaço, ou tornamos em bloco caso não */
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}