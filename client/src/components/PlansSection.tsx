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
    <section className="planos-ultra">
      <div className="container">
        <div className="planos-header">
          <span className="kicker">INVESTIMENTO</span>

          <h2>
            Planos sob <span>Medida</span>
          </h2>

          <p>
            Transparência total. Sem surpresas ou mensalidades ocultas.
          </p>
        </div>

        <div className="grid">
          {plans.map((plan, i) => (
            <div key={i} className={`card ${plan.isPopular ? 'popular' : ''}`}>
              
              {plan.isPopular && (
                <div className="badge">Mais escolhido</div>
              )}

              <h3>{plan.name}</h3>
              <p className="desc">{plan.description}</p>

              <div className="price">
                <span>R$</span>
                <strong>{plan.price}</strong>
                <small>/único</small>
              </div>

              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5541984606633?text=Quero o plano ${plan.name}`}
                target="_blank"
                className="btn"
              >
                Quero meu site
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`

      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .planos-ultra {
        padding: 200px 0 120px;
      }

      .planos-header {
        text-align: center;
        margin-bottom: 80px;
      }

      .kicker {
        color: #a855f7;
        font-size: 12px;
        letter-spacing: 2px;
      }

      h2 {
        font-size: 48px;
        margin: 10px 0;
        color: #fff;
      }

      h2 span {
        color: #a855f7;
      }

      .planos-header p {
        color: #aaa;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
      }

      .card {
        background: rgba(20,20,25,0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 36px 28px;
        position: relative;
        transition: 0.3s;
      }

      .card:hover {
        transform: translateY(-6px);
      }

      .popular {
        border: 1px solid #a855f7;
        transform: scale(1.02);
      }

      .badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #a855f7;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 10px;
      }

      h3 {
        color: #fff;
        margin-bottom: 10px;
      }

      .desc {
        color: #aaa;
        margin-bottom: 20px;
      }

      .price {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        margin-bottom: 20px;
      }

      .price strong {
        font-size: 36px;
        color: #fff;
      }

      ul {
        list-style: none;
        padding: 0;
        margin-bottom: 30px;
      }

      li {
        margin-bottom: 10px;
        color: #ddd;
      }

      .btn {
        display: block;
        text-align: center;
        padding: 16px;
        border-radius: 12px;
        background: linear-gradient(90deg,#9333ea,#c084fc);
        color: #fff;
        text-decoration: none;
        font-weight: bold;
      }

      @media(max-width: 900px){
        .grid {
          grid-template-columns: 1fr;
        }
      }

      `}</style>
    </section>
  );
}