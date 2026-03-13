import type { Metadata } from "next"
import { GlobeCanvasClient } from "@/components/three/GlobeCanvasClient"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"

export const metadata: Metadata = {
  title: "Conexões — Brasil & Irlanda",
  description: "A ponte estratégica entre os ecossistemas de fintechs do Brasil e da Irlanda.",
}

const initiatives = [
  { year: "2022", title: "Fundação Inspire4U",          desc: "Estabelecimento da consultoria com sede em Dublin, Irlanda." },
  { year: "2023", title: "Primeiro Hub Brasil-Irlanda",  desc: "Primeiro evento de networking conectando fintechs dos dois países." },
  { year: "2024", title: "Lançamento Athena7",           desc: "Plataforma global entra em operação com parceiros nos dois países." },
  { year: "2025", title: "Expansão Ecosystem",           desc: "120+ fintechs conectadas através da nossa rede estratégica." },
]

const sectors = [
  "Pagamentos Digitais", "Open Banking", "Crédito Alternativo",
  "Seguro Digital (Insurtech)", "Blockchain & DeFi", "Compliance & RegTech",
  "Wealth Management", "Governança ESG", "Identidade Digital",
]

export default function ConexoesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-0 overflow-hidden grain" style={{ background: "var(--bg-deep)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% -5%, rgba(107,16,184,0.40) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-0 text-center">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] mb-4">Nossas Conexões</p>
            <h1 className="t-display text-[var(--t0)] mb-6">
              Brasil e Irlanda,<br />
              <span className="text-grad-aurora">unidos pela inovação.</span>
            </h1>
            <p className="t-lead text-[var(--t2)] max-w-[55ch] mx-auto mb-0">
              Dois polos de fintech globais conectados por uma visão compartilhada de
              um mercado financeiro mais colaborativo, eficiente e justo.
            </p>
          </RevealOnScroll>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 mt-10">
          <GlobeCanvasClient />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] mb-3">Nossa trajetória</p>
            <h2 className="t-title text-[var(--t0)] mb-14">Marcos de conexão</h2>
          </RevealOnScroll>
          <div className="relative">
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, var(--v4), var(--amber-br))" }} aria-hidden="true" />
            <div className="space-y-10">
              {initiatives.map((item, i) => (
                <RevealOnScroll key={item.year} delay={i * 0.1} direction="left">
                  <div className="flex gap-8 items-start">
                    <span className="t-label text-[var(--v5)] w-14 flex-shrink-0 pt-1">{item.year}</span>
                    <div className="p-5 rounded-xl flex-1" style={{ background: "var(--bg-glass-xs)", border: "1px solid var(--b1)" }}>
                      <h3 className="t-heading text-[var(--t1)] mb-2">{item.title}</h3>
                      <p className="t-body text-[var(--t3)] text-sm">{item.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Setores */}
      <section className="py-20 px-6" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] text-center mb-3">Setores</p>
            <h2 className="t-title text-[var(--t0)] text-center mb-14">Onde conectamos</h2>
          </RevealOnScroll>
          <div className="flex flex-wrap gap-3 justify-center">
            {sectors.map((s, i) => (
              <RevealOnScroll key={s} delay={i * 0.05}>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: "var(--bg-glass-sm)", border: "1px solid var(--bv)", color: "var(--v6)" }}
                >
                  {s}
                </span>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
