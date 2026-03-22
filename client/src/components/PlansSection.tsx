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
      <div className="nps-bg-aura"></div>
      
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
              <div className="nps-card-inner">
                {plan.isPopular && <div className="nps-popular-flag">Mais Escolhido</div>}
                
                <div className="nps-top">
                  <div className="nps-icon">{plan.icon}</div>
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

                <div className="nps-divider"></div>

                <ul className="nps-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="nps-check-icon">✔️</span>
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
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ====================================================
           NPS (New Plans Section) - IMPACTFUL DESIGN
           ==================================================== */
           
        .nps-master {
          position: relative;
          padding: 120px 0;
          background: transparent;
          overflow: hidden;
        }

        .nps-bg-aura {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 800px;
          background: radial-gradient(ellipse at top, rgba(138, 43, 226, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .nps-master .container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
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
          font-size: 0.9rem;
          color: #B56BFF;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
          padding: 8px 16px;
          background: rgba(138, 43, 226, 0.1);
          border: 1px solid rgba(138, 43, 226, 0.2);
          border-radius: 100px;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.2);
        }

        .nps-title {
          font-family: var(--font-main);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 20px;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        .nps-subtitle {
          font-size: 1.15rem;
          color: #A1A1AA;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* GRID IMPLACÁVEL */
        .nps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: stretch;
        }

        /* CARDS MODERNOS COM BORDAS GRADIENTES (via wrapper e pseudo) */
        .nps-card {
          position: relative;
          border-radius: 28px;
          padding: 1px; /* Espaço para o gradiente da borda */
          background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 50px rgba(0,0,0,0.3);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
        }

        .nps-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 60px rgba(0,0,0,0.4);
        }

        .nps-card-inner {
          background: #09090C; /* Preto absoluto e encorpado */
          border-radius: 27px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        /* O DESTAQUE: Trazendo muito impacto visual pro plano intermediário */
        .nps-popular {
          background: linear-gradient(135deg, #B56BFF 0%, #EC4899 100%);
          box-shadow: 0 30px 60px rgba(138,43,226,0.3);
          transform: translateY(-16px);
          z-index: 10;
        }

        .nps-popular:hover {
          transform: translateY(-24px);
          box-shadow: 0 40px 80px rgba(138,43,226,0.4);
        }

        .nps-popular .nps-card-inner {
          /* Um fundo levemente roxo/escuro por dentro, pra manter a leitura perfeita mas impactante */
          background: linear-gradient(180deg, rgba(30,20,45,1) 0%, #09090C 40%);
        }

        .nps-popular-flag {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, #9D3FFF, #EC4899);
          color: #fff;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 8px 18px;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(236,72,153,0.4);
          white-space: nowrap;
          z-index: 5;
        }

        /* CONTEÚDO TOP */
        .nps-top {
          margin-bottom: 24px;
        }

        .nps-icon {
          font-size: 2.5rem;
          margin-bottom: 24px;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
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
          font-size: 1.8rem;
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
          color: #E4E4E7;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .nps-popular .nps-badge {
          background: rgba(236,72,153,0.15);
          color: #F9A8D4;
          border-color: rgba(236,72,153,0.3);
        }

        .nps-desc {
          color: #A1A1AA;
          font-size: 1.05rem;
          line-height: 1.6;
          min-height: 48px;
        }

        /* PREÇO MONSTRUOSO */
        .nps-price-box {
          display: flex;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .nps-currency {
          font-size: 1.4rem;
          font-weight: 700;
          color: #A1A1AA;
          margin-top: 8px;
          margin-right: 6px;
        }

        .nps-price {
          font-family: var(--font-main);
          font-size: 4.2rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .nps-billing {
          align-self: flex-end;
          font-size: 0.9rem;
          color: #71717A;
          font-weight: 600;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .nps-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          margin-bottom: 32px;
        }

        /* FEATURES */
        .nps-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex-grow: 1;
          margin-bottom: 40px;
        }

        .nps-features li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: #E4E4E7;
          line-height: 1.5;
        }

        .nps-check-icon {
          font-size: 0.9rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* BOX AVISO INFERIOR (O Kicker do Plano) */
        .nps-target-box {
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.15);
          padding: 16px 20px;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #D4D4D8;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .nps-popular .nps-target-box {
          background: rgba(236,72,153,0.05);
          border-color: rgba(236,72,153,0.25);
          color: #fff;
        }

        /* BOTÕES DE IMPACTO MÁXIMO */
        .nps-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px 24px;
          border-radius: 14px;
          font-family: var(--font-main);
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase;
        }

        .nps-btn-primary {
          background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
          color: #fff;
          box-shadow: 0 8px 24px rgba(236,72,153,0.3), inset 0 1px 1px rgba(255,255,255,0.4);
          border: none;
        }

        .nps-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(236,72,153,0.5), inset 0 1px 1px rgba(255,255,255,0.5);
          filter: brightness(1.1);
        }

        .nps-btn-secondary {
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .nps-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }


        /* ====================================================
           MOBILE BUG-FREE E IMPACTANTE
           ==================================================== */
        @media (max-width: 1100px) {
          .nps-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
            gap: 40px;
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

          .nps-card-inner {
            padding: 40px 32px;
          }

          .nps-popular-flag {
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            display: inline-block;
            margin-bottom: 24px;
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .nps-price {
            font-size: 3.5rem;
          }
          .nps-card-inner {
            padding: 32px 24px;
          }
          .nps-name {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
}