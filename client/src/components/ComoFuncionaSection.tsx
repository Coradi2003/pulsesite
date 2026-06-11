export default function ComoFuncionaSection() {
  return (
    <section className="section como-funciona" id="como-funciona">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-tag">Processo</span>
          <h2 className="section-title">
            Como funciona a <span>criação do seu site</span>
          </h2>
          <p className="section-subtitle">
            Processo simples, rápido e sem complicação. Do primeiro contato ao site no ar em
            poucos dias.
          </p>
        </div>

        <div className="steps-container">
          <span className="energy-particle"></span>
          <span className="energy-particle"></span>
          <span className="energy-particle"></span>
          <span className="energy-particle"></span>
          <span className="energy-particle"></span>
          <span className="energy-particle"></span>
          
          <div className="step-item reveal delay-1">
            <div className="step-number">01</div>
            <h3 className="step-title">Entendemos seu negócio</h3>
            <p className="step-text">
              Conversamos para entender seu segmento, seus diferenciais, seu público-alvo e o
              que você precisa comunicar. Nenhum detalhe é ignorado.
            </p>
          </div>

          <div className="step-item reveal delay-2">
            <div className="step-number">02</div>
            <h3 className="step-title">Criamos o layout personalizado</h3>
            <p className="step-text">
              Nossa equipe desenvolve um design exclusivo para sua marca, com textos persuasivos
              e estrutura pensada para converter visitantes em clientes.
            </p>
          </div>

          <div className="step-item reveal delay-3">
            <div className="step-number">03</div>
            <h3 className="step-title">Colocamos seu site no ar</h3>
            <p className="step-text">
              Após sua aprovação, publicamos o site com domínio e hospedagem configurados. Seu
              negócio estará online e pronto para atrair clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
