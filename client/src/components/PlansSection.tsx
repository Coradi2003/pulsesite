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
        <div className="text-center reveal">
          <span className="section-tag">Investimento</span>
          <h2 className="section-title">
            Planos sob <span>Medida</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
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
              <div className="plano-header">
                {plan.isPopular && <div className="plano-badge">Mais Escolhido</div>}
                
                <h3 className="plano-name">{plan.name}</h3>
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
                    <div className="plano-icon-wrap">
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
                  Quero este plano
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
          padding-bottom: 60px !important;
        }

        .planos-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 64px;
          align-items: stretch; /* Garante mesma altura para todos os cards */
        }

        .plano-card {
          background: rgba(15, 15, 20, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05); /* Borda bem sutil e elegante */
          border-radius: 20px;
          padding: 40px 32px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .plano-card:hover {
          background: rgba(19, 19, 28, 0.6);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        /* Destaque sofisticado e menos agressivo para o Pulse Pro */
        .plano-popular {
          background: linear-gradient(180deg, rgba(22, 22, 32, 0.6) 0%, rgba(13, 13, 18, 0.7) 100%);
          border: 1px solid rgba(138, 43, 226, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(138, 43, 226, 0.03);
          transform: scale(1.03);
          z-index: 2;
        }
        
        .plano-popular:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(138, 43, 226, 0.5);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(138, 43, 226, 0.06);
        }

        .plano-header {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Badge elegante (agora menor e retangular com border-radius leve, estilo Linear) */
        .plano-badge {
          display: inline-block;
          align-self: flex-start;
          background: rgba(138, 43, 226, 0.12);
          color: var(--purple-light);
          border: 1px solid rgba(138, 43, 226, 0.25);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 6px 12px;
          border-radius: 4px;
          margin-bottom: 24px;
        }

        /* Título do plano MAIOR que o preço */
        .plano-name {
          font-family: var(--font-main);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        /* Descrição fixa a altura mínima para alinhar perfeitamente a linha de preço */
        .plano-desc {
          font-size: 0.9rem;
          color: var(--gray-mid);
          line-height: 1.5;
          min-height: 48px;
        }

        /* Preços alinhados perfeitamente pelo topo/base, com tamanho reduzido */
        .plano-price-wrapper {
          margin-top: 24px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .plano-currency {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-mid);
        }

        .plano-price {
          font-family: var(--font-main);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .plano-billing {
          font-size: 0.85rem;
          color: var(--gray-mid);
          font-weight: 500;
          margin-left: 2px;
        }

        .plano-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 32px 0;
        }
        
        .plano-popular .plano-divider {
          background: linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.25), transparent);
        }

        .plano-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
          flex-grow: 1; /* Preenche o espaço flexível para empurrar o botão */
        }

        .plano-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.88rem;
          color: var(--gray-light);
          line-height: 1.5;
        }

        .plano-icon-wrap {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plano-popular .plano-icon-wrap {
          background: rgba(138, 43, 226, 0.12);
        }

        .plano-features li i {
          color: var(--gray-light);
          font-size: 0.6rem;
        }

        .plano-popular .plano-features li i {
          color: var(--purple-light);
        }

        .plano-footer {
          margin-top: auto; /* Alinha todos os botões no fundo matematicamente */
          display: flex;
          width: 100%;
        }

        /* Botões extremamente requintados */
        .plano-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 24px;
          border-radius: 8px; /* Cantos levemente mais retos para manter aspecto sério */
          font-family: var(--font-main);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .plano-btn-primary {
          background: var(--purple-bright);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(138, 43, 226, 0.15);
          border: 1px solid transparent;
        }

        .plano-btn-primary:hover {
          background: #a955ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(138, 43, 226, 0.25);
        }

        .plano-btn-secondary {
          background: rgba(255, 255, 255, 0.02);
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .plano-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .planos {
            padding-bottom: 80px !important;
          }

          .planos-wrapper {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
          }

          .plano-card {
            padding: 40px 32px;
          }

          .plano-popular {
            transform: scale(1);
          }
          
          .plano-popular:hover {
            transform: scale(1) translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
