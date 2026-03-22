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
        <div className="planos-header reveal">
          <span className="section-tag planos-tag">Investimento</span>
          <h2 className="planos-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="planos-subtitle">
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
              <div className="plano-head">
                <div className="plano-title-row">
                  <h3 className="plano-name">{plan.name}</h3>
                  {plan.isPopular && (
                    <span className="plano-badge">Mais escolhido</span>
                  )}
                </div>
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
                    <div className="plano-check">
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
          padding: 120px 0 100px !important; /* Mais respiro top/bottom geral */
        }

        .planos-header {
          text-align: center;
          margin-bottom: 80px; /* Distância espetacular até os cards */
        }

        .planos-tag {
          margin-bottom: 24px;
        }

        .planos-title {
          font-family: var(--font-main);
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .planos-title span {
          background: linear-gradient(135deg, var(--purple-light), var(--purple-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .planos-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }

        .planos-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: stretch; 
        }

        /* O estilo premium do card SaaS ($5.000+ feel) */
        .plano-card {
          background: rgba(13, 13, 18, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
          padding: 48px 40px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          backdrop-filter: blur(40px); /* vidro translúcido bem escuro e denso */
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .plano-card:hover {
          background: rgba(19, 19, 28, 0.5);
          border-color: rgba(255, 255, 255, 0.08); /* Apenas acende a borda levemente no hover */
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        /* Middle card: sofisticado, sem exagero, glow e borda premium */
        .plano-popular {
          background: linear-gradient(180deg, rgba(20, 15, 30, 0.6) 0%, rgba(13, 13, 18, 0.7) 100%);
          border: 1px solid rgba(138, 43, 226, 0.3);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.4), 
            inset 0 1px 20px rgba(138, 43, 226, 0.06); /* luz entrando de cima sutil */
          transform: scale(1.03); /* Elevação natural, elegante */
          z-index: 2;
        }
        
        .plano-popular:hover {
          transform: scale(1.03) translateY(-8px);
          border-color: rgba(138, 43, 226, 0.5);
          box-shadow: 
            0 32px 80px rgba(0, 0, 0, 0.5), 
            inset 0 1px 30px rgba(138, 43, 226, 0.1);
        }

        .plano-head {
          display: flex;
          flex-direction: column;
        }

        .plano-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .plano-name {
          font-family: var(--font-main);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* Badge elegante alinhada com título */
        .plano-badge {
          background: rgba(138, 43, 226, 0.12);
          color: #B56BFF;
          border: 1px solid rgba(138, 43, 226, 0.2);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .plano-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          min-height: 48px; /* Mantém base do preço idêntica nos 3 */
        }

        .plano-price-wrapper {
          margin-top: 36px; /* Desce um pouco mais o preço dando ar */
          display: flex;
          align-items: flex-start; /* Permite R$ ficar pra cima */
          gap: 6px;
        }

        .plano-currency {
          font-size: 1.15rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          margin-top: 6px; /* Alinha visualmente no topo no novo formato */
        }

        .plano-price {
          font-family: var(--font-main);
          font-size: 2.8rem;
          font-weight: 600; /* Mais limpo. O 600 passa sofisticação contra o 900 agressivo */
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .plano-billing {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 500;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        /* Separador super refinado usando gradiente esmaecente */
        .plano-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
          margin: 44px 0;
        }
        
        .plano-popular .plano-divider {
          background: linear-gradient(90deg, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0) 100%);
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 56px;
          flex-grow: 1; /* Estende para firmar o botão na base perfeita */
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.55;
        }

        .plano-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plano-popular .plano-check {
          background: rgba(138, 43, 226, 0.15);
        }

        .plano-features li i {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.65rem;
        }

        .plano-popular .plano-features li i {
          color: #B56BFF;
        }

        .plano-footer {
          margin-top: auto; 
          display: flex;
          width: 100%;
        }

        /* Botões robustos e de altíssima conversão */
        .plano-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 18px 24px;
          border-radius: 12px;
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 1.05rem; /* Botões mais presentes */
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .plano-btn-primary {
          background: linear-gradient(180deg, var(--purple-bright) 0%, var(--purple-neon) 100%);
          color: #ffffff;
          box-shadow: 
            0 4px 14px rgba(138, 43, 226, 0.2), 
            inset 0 1px 1px rgba(255, 255, 255, 0.2); /* bisel de luz interno, super premium */
          border: 1px solid rgba(138, 43, 226, 0.5);
        }

        .plano-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 24px rgba(138, 43, 226, 0.4), 
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
          filter: brightness(1.1);
        }

        .plano-btn-secondary {
          background: rgba(255, 255, 255, 0.02);
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .plano-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        /* Responsividade CORRIGIDA: Empilha em 1 coluna e usa max-width para controle */
        @media (max-width: 1024px) {
          .planos {
            padding: 80px 0 60px !important;
          }

          .planos-header {
            margin-bottom: 56px;
            padding: 0 24px;
          }

          .planos-title {
            font-size: 2rem;
          }

          .planos-wrapper {
            grid-template-columns: minmax(auto, 420px); /* Ocupa centro até 420px */
            justify-content: center;
            gap: 32px;
          }

          .plano-card {
            padding: 44px 32px;
            width: 100%; /* Adapta fluido até o minmax do grid */
          }

          /* Tira o scale() que estoura bordas mobile e usa flat state seguro */
          .plano-popular {
            transform: scale(1);
          }
          
          .plano-popular:hover {
            transform: scale(1) translateY(-4px);
          }

          .plano-title-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
