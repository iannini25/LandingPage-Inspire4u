import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/forms/ContactForm"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { LogoImage } from "@/components/ui/LogoImage"

export const metadata: Metadata = {
  title: "Athena7 — Canal de Denúncias por e para Mulheres",
  description: "A primeira plataforma global de Canal de Denúncias criada por e para mulheres. Anonimato total, segurança psicológica e integridade garantida.",
}

const steps = [
  { n: "01", title: "Denúncia Anônima",     desc: "A colaboradora registra sua denúncia de forma completamente anônima. Nenhuma informação pessoal é exigida." },
  { n: "02", title: "Análise Segura",        desc: "A plataforma processa a denúncia com criptografia ponta-a-ponta, garantindo sigilo absoluto em cada etapa." },
  { n: "03", title: "Resolução com Impacto", desc: "Gestores capacitados recebem o relatório e agem. Cada denúncia gera mudança real na cultura da empresa." },
]

const forWhom = [
  { icon: "🏦", title: "Fintechs em crescimento",     desc: "Empresas que precisam de uma estrutura de compliance ética antes de escalar." },
  { icon: "🌍", title: "Empresas internacionais",      desc: "Corporações com operações no Brasil e na Irlanda que buscam padrão global." },
  { icon: "💜", title: "Líderes comprometidas",        desc: "Gestoras que acreditam que cultura segura é vantagem competitiva." },
]

export default function Athena7Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--v0)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden grain">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(139,53,212,0.55) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <LogoImage
            src="/images/logo-athena7-white.png"
            alt="Athena7"
            width={220}
            height={54}
            className="h-12 w-auto object-contain mx-auto mb-10"
            fallbackText="athena7"
          />
          <h1 className="t-display text-[var(--t0)] mb-6">
            A voz que cada mulher<br />
            <span className="text-grad-violet">merecia ter.</span>
          </h1>
          <p className="t-lead text-[var(--t2)] max-w-[52ch] mx-auto mb-10">
            A primeira plataforma global de Canal de Denúncias criada por e para mulheres.
            Porque nenhuma voz deve ser silenciada por falta de um canal seguro.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-b from-[var(--v3)] to-[var(--v2)] border border-[var(--bv)] shadow-[0_0_30px_var(--glow-v4)] hover:shadow-[0_0_60px_var(--glow-v5)] transition-all duration-300"
          >
            Implementar na minha empresa →
          </Link>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-6" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] text-center mb-3">Processo</p>
            <h2 className="t-title text-[var(--t0)] text-center mb-14">Como funciona</h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <RevealOnScroll key={s.n} delay={i * 0.15}>
                <div className="p-6 rounded-2xl h-full" style={{ background: "var(--bg-glass-xs)", border: "1px solid var(--b1)" }}>
                  <span className="t-number text-4xl text-grad-violet block mb-4">{s.n}</span>
                  <h3 className="t-heading text-[var(--t1)] mb-3">{s.title}</h3>
                  <p className="t-body text-[var(--t3)] text-sm">{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="t-eyebrow text-[var(--v5)] text-center mb-3">Público</p>
            <h2 className="t-title text-[var(--t0)] text-center mb-14">Para quem é a Athena7</h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {forWhom.map((f, i) => (
              <RevealOnScroll key={f.title} delay={i * 0.1} direction="scale">
                <div className="p-6 rounded-2xl text-center h-full" style={{ background: "var(--bg-surface)", border: "1px solid var(--b1)" }}>
                  <span className="text-4xl block mb-4">{f.icon}</span>
                  <h3 className="t-heading text-[var(--t1)] mb-3">{f.title}</h3>
                  <p className="t-body text-[var(--t3)] text-sm">{f.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contato */}
      <section className="py-20 px-6 text-center" style={{ background: "var(--v0)" }}>
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <h2 className="t-title text-[var(--t0)] mb-4">Pronto para implementar?</h2>
            <p className="t-lead text-[var(--t2)] mb-10">
              Fale com nossa equipe e descubra como a Athena7 pode transformar a cultura da sua empresa.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2} direction="scale">
            <div className="p-8 rounded-2xl" style={{ background: "var(--bg-glass-sm)", border: "1px solid var(--b1)", backdropFilter: "blur(16px)" }}>
              <ContactForm />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
