import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Quanto custa criar um site em Curitiba?',
    answer: 'O valor de um site pode variar de acordo com a complexidade do projeto. Na Pulse Futuro, temos planos a partir de R$ 350, ideais para empresas que querem começar com um site profissional.',
  },
  {
    question: 'Em quanto tempo meu site fica pronto?',
    answer: 'O prazo médio de entrega é de 3 a 7 dias, dependendo do tipo de site e das informações enviadas.',
  },
  {
    question: 'O site já vem otimizado para o Google?',
    answer: 'Sim. Todos os sites são entregues com técnicas de SEO aplicadas, como estrutura correta e carregamento rápido.',
  },
  {
    question: 'Vocês fazem landing pages também?',
    answer: 'Sim. Criamos landing pages focadas em conversão para gerar contatos e vendas.',
  },
  {
    question: 'O site funciona no celular?',
    answer: 'Sim. Todos os nossos sites são totalmente responsivos e funcionam perfeitamente em celulares.',
  },
  {
    question: 'Ter um site realmente traz clientes?',
    answer: 'Sim. Um site aumenta sua credibilidade e permite que sua empresa seja encontrada no Google.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">
            Perguntas Frequentes sobre <span>Criação de Sites</span>
          </h2>
        </div>

        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item reveal delay-${Math.min(index + 1, 3)}`}
            >
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="faq-question-text">{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
