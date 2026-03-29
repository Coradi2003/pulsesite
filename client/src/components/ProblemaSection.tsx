import { Search, UserX, TrendingUp } from "lucide-react";

export default function ProblemaSection() {
  return (
    <section
      className="section problema"
      id="problema"
      style={{ position: "relative" }}
    >
      {/* Diagonal Ribbons with Parallax */}
      <div className="diagonal-ribbons-wrapper">
        <div className="diagonal-ribbon ribbon-top">
          <div className="ribbon-track">
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
          </div>
        </div>
        <div className="diagonal-ribbon ribbon-bottom">
          <div className="ribbon-track">
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
            <span className="ribbon-text">
              ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦
              PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE
              FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO ✦ PULSE FUTURO
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="problema-grid">
          <div className="reveal-left">
            <span className="section-tag">O Problema</span>
            <h2 className="section-title">
              Por que sua empresa precisa de um
              <br />
              <span>site profissional</span>
            </h2>
            <p className="section-subtitle">
              Hoje, antes de qualquer compra ou contratação, as pessoas abrem o
              Google. Se sua empresa não aparece, ela simplesmente não existe
              para esses clientes.
            </p>

            <div className="problema-list">
              <div className="problema-item">
                <div className="problema-icon">
                  <Search className="w-5 h-5" />
                </div>
                <div className="problema-item-text">
                  <strong>Invisível no Google</strong>
                  <p>
                    Sem site, seu negócio não aparece nas buscas e perde espaço
                    para a concorrência que já está online.
                  </p>
                </div>
              </div>

              <div className="problema-item">
                <div className="problema-icon">
                  <UserX className="w-5 h-5" />
                </div>
                <div className="problema-item-text">
                  <strong>Credibilidade comprometida</strong>
                  <p>
                    Clientes desconfiam de empresas sem presença digital. Um
                    site profissional transmite confiança imediata.
                  </p>
                </div>
              </div>

              <div className="problema-item">
                <div className="problema-icon">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="problema-item-text">
                  <strong>Crescimento limitado</strong>
                  <p>
                    Depender apenas de indicações limita seu alcance. O digital
                    abre sua empresa para novos mercados 24h por dia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="alert-box">
              <span className="alert-sparkle"></span>
              <span className="alert-sparkle"></span>
              <span className="alert-sparkle"></span>
              <div className="alert-number">97%</div>
              <p className="alert-text">
                dos consumidores brasileiros pesquisam na internet antes de
                comprar ou contratar um serviço local. Empresas sem site ficam{" "}
                <strong
                  className="alert-highlight"
                  style={{ color: "var(--purple-light)" }}
                >
                  completamente invisíveis
                </strong>{" "}
                para essa maioria.
              </p>
              <p className="alert-source">
                Fonte: Google Consumer Insights Brasil
              </p>

              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "28px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div className="alert-number" style={{ fontSize: "3rem" }}>
                  +60%
                </div>
                <p className="alert-text">
                  das buscas locais no Google resultam em uma visita à loja ou
                  contato com a empresa nas próximas 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
