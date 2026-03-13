import type { Metadata } from "next"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { InvestorForm } from "@/components/forms/InvestorForm"
import { CountUp } from "@/components/motion/CountUp"

export const metadata: Metadata = {
  title: "Investidores — Inspire4U",
  description: "Seja parte da vanguarda. Invista na próxima geração de governança para fintechs.",
}

const stats = [
  { value: 120, suffix: "+", label: "Fintechs Atendidas" },
  { value: 2,   suffix: "",  label: "Países de Atuação" },
  { value: 1,   suffix: "ª", label: "Plataforma Global" },
  { value: 3,   suffix: "+", label: "Anos de Mercado" },
]

const thesis = [
  { icon: "◎", title: "Mercado Inexplorado",   desc: "Governança customizada para fintechs é ainda um mercado nascente — com demanda crescente e poucos players especializados." },
  { icon: "◈", title: "Produto Único",          desc: "A Athena7 não tem concorrente direto. É a única plataforma de Canal de Denúncias desenvolvida exclusivamente por e para mulheres." },
  { icon: "◇", title: "Modelo Escalável",       desc: "Nossa metodologia de consultoria é replicável. Com o produto certo, podemos atender centenas de fintechs simultaneamente." },
  { icon: "⬡", title: "Expansão Internacional", desc: "Presença ativa em Brasil e Irlanda — dois dos maiores ecossistemas fintech do mundo — com roadmap para outros mercados." },
]

export default function InvestidoresPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden grain" style={{ background: "var(--bg-void)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% -5%, rgba(212,144,10,0.18) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--amber-br)] mb-4">Relação com Investidores</p>
            <h1 className="t-display text-[var(--t0)] mb-6">
              Invista no futuro da{" "}
              <span className="text-grad-gold">governança global.</span>
            </h1>
            <p className="t-lead text-[var(--t2)] max-w-[52ch] mx-auto">
              Estamos construindo mais do que uma consultoria. Estamos criando o padrão
              de governança ética para a próxima geração de fintechs.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((s, i) => (
              <RevealOnScroll key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <span className="t-number text-[var(--t0)] block">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </span>
                  <span className="t-eyebrow text-[var(--t3)] block mt-2">{s.label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Tese */}
      <section className="py-20 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] mb-3">Por que investir</p>
            <h2 className="t-title text-[var(--t0)] mb-14">Nossa tese de investimento</h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-6">
            {thesis.map((t, i) => (
              <RevealOnScroll key={t.title} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl h-full flex gap-4"
                  style={{ background: "var(--bg-glass-xs)", border: "1px solid var(--b1)" }}
                >
                  <span className="text-2xl flex-shrink-0" style={{ color: "var(--v5)" }}>{t.icon}</span>
                  <div>
                    <h3 className="t-heading text-[var(--t1)] mb-2">{t.title}</h3>
                    <p className="t-body text-[var(--t3)] text-sm">{t.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20 px-6" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <h2 className="t-title text-[var(--t0)] text-center mb-4">Manifeste seu interesse</h2>
            <p className="t-lead text-[var(--t2)] text-center mb-10">
              Nossa equipe de desenvolvimento de negócios retornará em até 48 horas.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2} direction="scale">
            <div className="p-8 rounded-2xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--b1)", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
              <InvestorForm />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
