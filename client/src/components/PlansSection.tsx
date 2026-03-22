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
    btnText: 'Começar agora',
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
    btnText: 'Quero o Pulse Pro',
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
    btnText: 'Começar agora',
  },
];

export default function PlansSection() {
  return (
    <section className="section planos-ultra" id="planos">
      <div className="container">
        <div className="planos-header">
          <h2 className="planos-title">Planos sob Medida</h2>
          <p className="planos-subtitle">
            Transparência total. Sem surpresas ou mensalidades ocultas.
          </p>
        </div>

        <div className="planos-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plano-card ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && <div className="popular-badge">Mais escolhido</div>}

              <div className="plano-top">
                <h3 className="plano-name">{plan.name}</h3>
                <p className="plano-desc">{plan.description}</p>
              </div>

              <div className="plano-price-wrap">
                <span className="plano-currency">R$</span>
                <span className="plano-price">{plan.price}</span>
                <span className="plano-billing">/único</span>
              </div>

              <div className="plano-divider"></div>

              <ul className="plano-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plano-footer">
                <a
                  href={`https://wa.me/5541984606633?text=Ol%C3%A1!%20Quero%20o%20plano%20${plan.name}`}
                  className={`btn-plano ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`

      .planos-ultra {
        padding: 160px 0 120px;
      }

      .planos-header {
        text-align: center;
        margin-bottom: 80px;
      }

      .planos-title {
        font-size: 3rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 16px;
      }

      .planos-subtitle {
        color: #a1a1aa;
        max-width: 600px;
        margin: 0 auto;
      }

      .planos-grid {
        display: flex;
        justify-content: center;
        gap: 32px;
        flex-wrap: wrap;
      }

      .plano-card {
        flex: 1;
        max-width: 360px;
        background: rgba(20,20,25,0.6);
        border-radius: 28px;
        padding: 56px 40px;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.08);
        transition: 0.3s;
      }

      .plano-card:hover {
        transform: translateY(-6px);
      }

      .plano-card.popular {
        border: 1px solid #8A2BE2;
        transform: scale(1.05);
      }

      .popular-badge {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        background: #8A2BE2;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 12px;
      }

      .plano-name {
        font-size: 1.4rem;
        margin-bottom: 10px;
      }

      .plano-price {
        font-size: 2.8rem;
        font-weight: bold;
      }

      .plano-features {
        margin: 30px 0;
      }

      .btn-plano {
        padding: 18px;
        border-radius: 14px;
        font-size: 1.05rem;
      }

      @media (max-width: 768px) {
        .planos-grid {
          flex-direction: column;
          align-items: center;
        }
      }

      `}</style>
    </section>
  );
}