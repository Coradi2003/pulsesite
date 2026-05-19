import { ChevronRight } from 'lucide-react';

export default function PlansSection() {
  return (
    <section className="section plans-premium" id="planos">
      <div className="container">
        <div className="plans-header-premium text-center reveal">
          <span className="premium-tag">💰 INVESTIMENTO ÚNICO</span>
          <h2 className="premium-title">
            Planos de criação de sites <span>em Curitiba</span>
          </h2>
          <p className="premium-subtitle">
            Sua empresa no digital com design de alto nível e foco total em conversão. Sem mensalidades escondidas.
          </p>
        </div>

        <div className="plans-grid-premium">
          {/* ====== BÁSICO ====== */}
          <div className="pcard pcard-start reveal delay-1">
            <div className="pcard-header">
              <span className="pcard-emoji">🚀</span>
              <span className="pcard-label-text">Pulse Start</span>
            </div>
            <div className="pcard-price-wrap">
              <span className="pcard-currency">R$</span>
              <span className="pcard-price">350</span>
            </div>
            <div className="pcard-description">
              Ideal para autônomos e novos negócios que precisam de presença digital rápida.
            </div>
            
            <div className="pcard-divider" />
            
            <ul className="pcard-features">
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Site 1 página moderno</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> WhatsApp integrado</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Domínio .com.br (1 ano)</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Hospedagem inclusa</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Entrega em 2 horas</li>
            </ul>
            
            <div className="pcard-footer">
              <p className="pcard-note">Pagamento único sem taxas mensais</p>
              <a href="https://wa.me/5541984253194?text=Quero%20o%20plano%20Pulse%20Start!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                Quero o Pulse Start!
              </a>
            </div>
          </div>

          {/* ====== PRO (FEATURED) ====== */}
          <div className="pcard pcard-featured reveal delay-2">
            <div className="pcard-header">
              <span className="pcard-emoji">⚡</span>
              <span className="pcard-label-text">Pulse Pro</span>
            </div>
            <div className="pcard-price-wrap">
              <span className="pcard-currency">R$</span>
              <span className="pcard-price">650</span>
            </div>
            <div className="pcard-description">
              O site completo que coloca sua empresa no topo do Google e gera autoridade.
            </div>
            
            <div className="pcard-divider" />
            
            <ul className="pcard-features">
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> Até 5 páginas estratégicas</li>
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> <strong>SEO (Google) incluso</strong></li>
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> Integração total de redes</li>
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> Google Analytics em tempo real</li>
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> Domínio + Hospedagem (1 ano)</li>
              <li><ChevronRight className="w-4 h-4 text-purple-400" /> Manutenção por 6 meses</li>
            </ul>
            
            <div className="pcard-footer">
              <p className="pcard-note">Foco total em resultados e vendas</p>
              <a href="https://wa.me/5541984253194?text=Quero%20o%20plano%20Pulse%20Pro!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                Quero o Pulse Pro!
              </a>
            </div>
          </div>

          {/* ====== ELITE ====== */}
          <div className="pcard pcard-elite reveal delay-3">
            <div className="pcard-header">
              <span className="pcard-emoji">🔥</span>
              <span className="pcard-label-text">Pulse Elite</span>
            </div>
            <div className="pcard-price-wrap">
              <span className="pcard-currency">R$</span>
              <span className="pcard-price">1.200</span>
            </div>
            <div className="pcard-description">
              Para quem busca excelência máxima, animações personalizadas e funis de venda.
            </div>
            
            <div className="pcard-divider" />
            
            <ul className="pcard-features">
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Até 10 páginas ou sistemas</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> UX Envolvente + Animações</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Integração de funis e pixels</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Copywriting focado em vendas</li>
              <li><ChevronRight className="w-4 h-4 text-purple-500" /> Suporte prioritário 1 ano</li>
            </ul>
            
            <div className="pcard-footer">
              <p className="pcard-note">Nível máximo de personalização</p>
              <a href="https://wa.me/5541984253194?text=Quero%20o%20plano%20Pulse%20Elite!" className="btn-premium" target="_blank" rel="noopener noreferrer">
                Quero o Pulse Elite!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
