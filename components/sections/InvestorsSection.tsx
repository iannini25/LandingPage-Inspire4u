"use client"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { InvestorForm } from "@/components/forms/InvestorForm"

const pillars = [
  { icon: "◎", tag: "Governança", title: "Base Sólida",     desc: "Estrutura que viabiliza crescimento sustentável e retorno previsível." },
  { icon: "◈", tag: "Produto",    title: "Athena7",          desc: "Plataforma única no mundo. Mercado endereçável global e urgente." },
  { icon: "◇", tag: "Expansão",   title: "Brasil · Irlanda", desc: "Dois dos maiores ecossistemas de fintech do mundo em sinergia." },
]

export function InvestorsSection() {
  return (
    <section
      id="investidores"
      className="relative py-28 overflow-hidden grain"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(212,144,10,0.07) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <RevealOnScroll>
              <p className="t-eyebrow text-[var(--amber-br)] mb-4">O Futuro é Coletivo</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="t-display text-[var(--t0)] mb-6">
                Seja parte da vanguarda.{" "}
                <span className="text-grad-gold">Invista na inspiração.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="space-y-4 mb-10">
                <p className="t-lead text-[var(--t2)]">
                  A Inspire4U não está apenas prestando consultoria; estamos construindo um
                  ecossistema baseado em governança sólida, inovação sem fronteiras e ambientes
                  de trabalho mais justos.
                </p>
                <p className="t-body text-[var(--t3)]">
                  Buscamos investidores que não apenas procurem retorno financeiro, mas que
                  queiram liderar a transformação no mercado de fintechs.
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {pillars.map((p, i) => (
                <RevealOnScroll key={p.title} delay={0.3 + i * 0.1} direction="left">
                  <div
                    className="p-5 rounded-xl flex items-start gap-4"
                    style={{
                      background: "var(--bg-glass-xs)",
                      border: "1px solid var(--b1)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: "var(--ba)", background: "var(--bg-glass-sm)" })}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: "var(--b1)", background: "var(--bg-glass-xs)" })}
                  >
                    <span className="text-2xl" style={{ color: "var(--v5)" }}>{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="t-label text-[0.55rem] px-2 py-0.5 rounded-full"
                          style={{ background: "var(--amber-glow)", color: "var(--amber-lt)", border: "1px solid var(--ba)" }}
                        >
                          {p.tag}
                        </span>
                        <span className="t-heading text-[var(--t1)] text-sm">{p.title}</span>
                      </div>
                      <p className="t-body text-[var(--t3)] text-sm">{p.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll delay={0.2} direction="scale">
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--b1)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <h3 className="t-title text-[var(--t0)] text-xl mb-2">Junte-se a nós</h3>
              <p className="t-body text-[var(--t3)] text-sm mb-8">
                Preencha o formulário e nossa equipe de desenvolvimento de negócios
                entrará em contato para explorar sinergias.
              </p>
              <InvestorForm />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
