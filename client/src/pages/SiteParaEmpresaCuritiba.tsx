import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import Footer from '../components/Footer';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l149.5-39.2c32.8 18 69.4 27.5 106.6 27.5h.1c122.3 0 221.9-99.5 221.9-222 0-59.3-23.1-115-65-156.9zM224 457.1c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 376.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 50.1 0 97.2 19.5 132.6 54.9C392.2 176 411.7 223.1 411.7 274c0 101.9-83 184.9-184.9 184.9zM324.9 308.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.5 7.4-14.1 2.3-4.6 1.2-8.8-.2-11.6-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item reveal">
      <button className={`faq-question ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
        <h3 className="faq-question-text">{question}</h3>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function SiteParaEmpresaCuritiba() {
  useEffect(() => {
    // Title
    document.title = 'Site para Empresas em Curitiba | Pulse Futuro';

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Criamos sites profissionais para empresas em Curitiba que querem mais credibilidade, presença digital e clientes. Solicite um orçamento.');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://pulsefuturo.com.br/site-para-empresa-curitiba');

    return () => {
      document.title = 'Pulse Futuro';
      canonical?.remove();
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot"></span>
                Agência Digital · Curitiba, PR
              </div>
              <h1 className="hero-title">
                Site para Empresas em Curitiba
                <br />
                <span className="highlight">com Estrutura Profissional</span>
              </h1>
              <p className="hero-subtitle">
                Criamos sites corporativos para empresas de Curitiba que precisam transmitir 
                credibilidade, conquistar a confiança dos clientes e fortalecer sua presença 
                digital com uma identidade profissional e moderna.
              </p>
              <div className="hero-buttons">
                <a href="#contato" className="btn btn-primary btn-lg">
                  <Rocket className="w-5 h-5" />
                  Quero um Site Profissional
                </a>
                <a
                  href="https://wa.me/5541984253194?text=Quero%20um%20site%20para%20minha%20empresa%20em%20Curitiba!"
                  className="btn btn-whatsapp btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section" id="intro">
        <div className="container">
          <div className="text-center reveal">
            <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Em Curitiba, o mercado corporativo é competitivo e exigente. Antes de fechar qualquer 
              negócio, seus potenciais clientes pesquisam sua empresa online. Um site corporativo 
              profissional é o cartão de visitas digital da sua empresa — ele transmite seriedade, 
              organiza suas informações e facilita o contato com quem já está pronto para contratar.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section" id="beneficios">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">Vantagens</span>
            <h2 className="section-title">
              O que um site corporativo <span>faz pela sua empresa</span>
            </h2>
          </div>
          <div className="solucao-cards">
            <div className="solucao-card reveal delay-1">
              <h3 className="card-title">Credibilidade Imediata</h3>
              <p className="card-text">
                Empresas com site profissional transmitem confiança antes mesmo do primeiro 
                contato. Seus clientes chegam mais seguros e prontos para fechar negócio.
              </p>
            </div>
            <div className="solucao-card reveal delay-2">
              <h3 className="card-title">Presença Digital Sólida</h3>
              <p className="card-text">
                Apareça no Google quando seus clientes pesquisarem pelos serviços que você 
                oferece. Um site bem estruturado é a base de qualquer estratégia digital.
              </p>
            </div>
            <div className="solucao-card reveal delay-3">
              <h3 className="card-title">Contato e Orçamentos Facilitados</h3>
              <p className="card-text">
                Formulários, botões de WhatsApp e informações organizadas tornam mais fácil 
                para o cliente entrar em contato e solicitar uma proposta comercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" id="como-funciona">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">Processo</span>
            <h2 className="section-title">
              Como desenvolvemos o <span>site da sua empresa</span>
            </h2>
          </div>
          <div className="steps-container">
            <div className="step-item reveal delay-1">
              <div className="step-number">01</div>
              <h3 className="step-title">Entendemos seu Negócio</h3>
              <p className="step-text">
                Analisamos seu segmento, seus diferenciais competitivos e o perfil dos seus 
                clientes para criar uma estrutura que comunique o valor real da sua empresa.
              </p>
            </div>
            <div className="step-item reveal delay-2">
              <div className="step-number">02</div>
              <h3 className="step-title">Design e Estrutura Corporativa</h3>
              <p className="step-text">
                Desenvolvemos um layout moderno e alinhado à identidade visual da sua marca, 
                com hierarquia clara de informações e foco na experiência do visitante.
              </p>
            </div>
            <div className="step-item reveal delay-3">
              <div className="step-number">03</div>
              <h3 className="step-title">Publicação e Suporte Contínuo</h3>
              <p className="step-text">
                Publicamos seu site com domínio, hospedagem e configurações técnicas incluídas, 
                com suporte disponível para atualizações e melhorias futuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section" id="diferenciais">
        <div className="container">
          <div className="autoridade-inner">
            <div className="reveal-left">
              <span className="section-tag">Diferenciais</span>
              <h2 className="section-title">
                Sites corporativos feitos para <span>empresas sérias</span>
              </h2>
              <p className="section-subtitle">
                Não entregamos apenas um site bonito. Entregamos uma presença digital 
                estratégica, pensada para representar sua empresa com profissionalismo 
                e gerar resultados reais no mercado de Curitiba.
              </p>
            </div>
            <div className="reveal-right">
              <div className="autoridade-metrics">
                <div className="metric-card">
                  <div className="metric-number">3-7</div>
                  <div className="metric-label">Dias para seu site corporativo entrar no ar</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">100%</div>
                  <div className="metric-label">Responsivo e adaptado para todos os dispositivos</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">SEO</div>
                  <div className="metric-label">Estrutura otimizada para aparecer no Google</div>
                </div>
                <div className="metric-card">
                  <div className="metric-number">1 ano</div>
                  <div className="metric-label">Domínio e hospedagem inclusos no plano</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">
              Perguntas Frequentes sobre <span>Site para Empresa em Curitiba</span>
            </h2>
          </div>
          <div className="faq-container">
            <FAQItem
              question="Quanto custa um site para empresa em Curitiba?"
              answer="O investimento varia conforme o porte do projeto — número de páginas, funcionalidades e nível de personalização. Na Pulse Futuro, temos planos a partir de R$ 350 para sites de uma página e opções mais completas para empresas que precisam de múltiplas seções, formulários e integração com redes sociais."
            />
            <FAQItem
              question="Qual é o prazo de entrega de um site corporativo?"
              answer="O prazo médio é de 3 a 7 dias úteis após o envio das informações e aprovação do briefing. Projetos mais completos, com várias páginas e funcionalidades específicas, podem levar até 15 dias, sempre com acompanhamento próximo em cada etapa."
            />
            <FAQItem
              question="Um site profissional realmente ajuda a passar mais confiança?"
              answer="Sim, e de forma significativa. Estudos mostram que mais de 75% dos consumidores julgam a credibilidade de uma empresa pela qualidade do seu site. Uma presença digital bem estruturada transmite seriedade antes mesmo do primeiro contato comercial."
            />
            <FAQItem
              question="O site vai funcionar bem no celular?"
              answer="Sim. Todos os sites que desenvolvemos são 100% responsivos, adaptando-se perfeitamente a smartphones, tablets e computadores. Isso é fundamental, já que a maioria das pesquisas por empresas locais em Curitiba acontece pelo celular."
            />
            <FAQItem
              question="O site ajuda minha empresa a aparecer no Google?"
              answer="Sim. Desenvolvemos todos os sites com boas práticas de SEO aplicadas desde a estrutura: headings corretos, URLs amigáveis, meta tags, velocidade de carregamento e código limpo. Isso dá à sua empresa as melhores condições de aparecer nas buscas locais."
            />
            <FAQItem
              question="Domínio e hospedagem estão inclusos no plano?"
              answer="Sim. Nossos planos incluem domínio .com.br por 1 ano e hospedagem de alta performance. Você não precisa contratar nada separado — cuidamos de toda a parte técnica para que você foque no seu negócio."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-final" id="contato">
        <div className="container">
          <div className="cta-box reveal">
            <span className="section-tag">Comece Agora</span>
            <h2 className="cta-title">
              Sua empresa merece um site
              <br />
              <span style={{ color: 'var(--purple-bright)', textShadow: '0 0 30px rgba(138,43,226,0.6)' }}>
                à altura do seu trabalho
              </span>
            </h2>
            <p className="cta-subtitle">
              Não deixe seus clientes encontrarem a concorrência antes de você. Fale com a Pulse Futuro e tenha um site corporativo profissional no ar em poucos dias.
            </p>
            <div className="cta-buttons">
              <a
                href="https://wa.me/5541984253194?text=Quero%20um%20site%20para%20minha%20empresa%20em%20Curitiba!"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rocket className="w-5 h-5" />
                Quero um Site Profissional
              </a>
              <a
                href="https://wa.me/5541984253194?text=Quero%20um%20site%20para%20minha%20empresa%20em%20Curitiba!"
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Service Schema */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Criação de Sites para Empresas",
        "name": "Site para Empresas em Curitiba",
        "description": "Criamos sites profissionais para empresas em Curitiba que querem mais credibilidade, presença digital e clientes.",
        "areaServed": { "@type": "City", "name": "Curitiba" },
        "provider": { "@type": "Organization", "name": "Pulse Futuro", "url": "https://pulsefuturo.com.br" }
      })}</script>

      {/* FAQ Schema */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Quanto custa um site para empresa em Curitiba?", "acceptedAnswer": { "@type": "Answer", "text": "O investimento varia conforme o porte do projeto. Na Pulse Futuro, temos planos a partir de R$ 350 para sites de uma página e opções mais completas para empresas que precisam de múltiplas seções, formulários e integração com redes sociais." } },
          { "@type": "Question", "name": "Qual é o prazo de entrega de um site corporativo?", "acceptedAnswer": { "@type": "Answer", "text": "O prazo médio é de 3 a 7 dias úteis após o envio das informações e aprovação do briefing. Projetos mais completos podem levar até 15 dias, sempre com acompanhamento próximo em cada etapa." } },
          { "@type": "Question", "name": "Um site profissional realmente ajuda a passar mais confiança?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Mais de 75% dos consumidores julgam a credibilidade de uma empresa pela qualidade do seu site. Uma presença digital bem estruturada transmite seriedade antes mesmo do primeiro contato comercial." } },
          { "@type": "Question", "name": "O site vai funcionar bem no celular?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Todos os sites que desenvolvemos são 100% responsivos, adaptando-se perfeitamente a smartphones, tablets e computadores." } },
          { "@type": "Question", "name": "O site ajuda minha empresa a aparecer no Google?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Desenvolvemos todos os sites com boas práticas de SEO: headings corretos, URLs amigáveis, meta tags, velocidade de carregamento e código limpo para as melhores condições de aparecer nas buscas locais." } },
          { "@type": "Question", "name": "Domínio e hospedagem estão inclusos no plano?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Nossos planos incluem domínio .com.br por 1 ano e hospedagem de alta performance. Cuidamos de toda a parte técnica para que você foque no seu negócio." } }
        ]
      })}</script>
    </div>
  );
}