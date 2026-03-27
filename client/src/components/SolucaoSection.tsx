import { MonitorSmartphone, Smartphone, Target } from 'lucide-react';

export default function SolucaoSection() {
  return (
    <section className="section" id="solucao">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-tag">A Solução</span>
          <h2 className="section-title">
            Sites modernos e estratégicos <span>para seu negócio</span>
          </h2>
          <p className="section-subtitle">
            Desenvolvemos sites profissionais e estratégicos para comércios locais que querem
            crescer no digital com resultados reais.
          </p>
        </div>

        <div className="solucao-cards">
          <div className="solucao-card reveal delay-1">
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <div className="card-hologram"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="card-icon">
              <MonitorSmartphone className="w-7 h-7" />
            </div>
            <h3 className="card-title">Site Profissional e Moderno</h3>
            <p className="card-text">
              Design exclusivo, alinhado à identidade da sua marca, com visual premium que
              impressiona e gera confiança imediata.
            </p>
            <ul className="card-feature-list">
              <li>Design personalizado para sua marca</li>
              <li>Visual moderno e diferenciado</li>
              <li>Carregamento ultra-rápido</li>
              <li>Domínio e hospedagem inclusos</li>
            </ul>
          </div>

          <div className="solucao-card reveal delay-2">
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <div className="card-hologram"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="card-icon">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="card-title">Otimizado para Celular</h3>
            <p className="card-text">
              Mais de 80% dos acessos são pelo smartphone. Seu site será perfeito em qualquer
              tela, garantindo a melhor experiência.
            </p>
            <ul className="card-feature-list">
              <li>100% responsivo e adaptável</li>
              <li>Experiência mobile impecável</li>
              <li>Velocidade otimizada no 4G/5G</li>
              <li>Aprovado pelo Google Mobile</li>
            </ul>
          </div>

          <div className="solucao-card reveal delay-3">
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <span className="card-particle"></span>
            <div className="card-hologram"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="energy-wave"></div>
            <div className="card-icon">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="card-title">Pensado para Gerar Contatos</h3>
            <p className="card-text">
              Estrutura estratégica com calls-to-action inteligentes, formulários e integração
              com WhatsApp para converter visitantes em clientes.
            </p>
            <ul className="card-feature-list">
              <li>Botões de ação estratégicos</li>
              <li>Integração com WhatsApp</li>
              <li>Formulário de contato</li>
              <li>SEO local para Google Maps</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
