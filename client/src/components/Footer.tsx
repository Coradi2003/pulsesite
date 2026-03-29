import { ChevronRight, MapPin, Mail, Instagram } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    fill="currentColor"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l149.5-39.2c32.8 18 69.4 27.5 106.6 27.5h.1c122.3 0 221.9-99.5 221.9-222 0-59.3-23.1-115-65-156.9zM224 457.1c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 376.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 50.1 0 97.2 19.5 132.6 54.9C392.2 176 411.7 223.1 411.7 274c0 101.9-83 184.9-184.9 184.9zM324.9 308.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.5 7.4-14.1 2.3-4.6 1.2-8.8-.2-11.6-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">
                <img src="/logo.png" alt="Pulse Futuro" />
                <span className="footer-brand-name">Pulse Futuro</span>
              </div>
              <p className="footer-tagline">
                Serviços de marketing na internet.
                <br />
                Transformamos negócios locais em referências digitais.
              </p>
              <a
                href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.9rem", padding: "11px 22px" }}
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                Falar no WhatsApp
              </a>
            </div>

            <div>
              <p className="footer-col-title">Serviços</p>
              <ul className="footer-list">
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  <a href="/criacao-de-sites-curitiba">Sites Profissionais</a>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  <a href="/landing-page-curitiba">Landing Pages</a>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  <a href="/site-para-empresa-curitiba">Site para Empresas</a>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" /> SEO
                  Local
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" />{" "}
                  Google Meu Negócio
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400" />{" "}
                  Marketing Digital
                </li>
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Contato</p>
              <ul className="footer-list">
                <li>
                  <MapPin className="w-4 h-4 text-purple-400" />
                  Curitiba — PR
                </li>
                <li>
                  <Mail className="w-4 h-4 text-purple-400" />
                  <a href="mailto:contato@pulsefuturo.com.br">
                    contato@pulsefuturo.com.br
                  </a>
                </li>
                <li>
                  <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (41) 98460-6633
                  </a>
                </li>
                <li>
                  <Instagram className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                  <a
                    href="https://instagram.com/pulsefuturo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @pulsefuturo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; 2026 <span>Pulse Futuro</span>. Todos os direitos
              reservados.
            </p>
            <p className="footer-copy">
              Feito com <span>♥</span> em Curitiba, PR
            </p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/5541984606633?text=Quero%20meu%20site%20profissional!"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
      </a>
    </>
  );
}
