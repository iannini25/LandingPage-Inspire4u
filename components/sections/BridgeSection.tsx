"use client"
import { useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { cn } from "@/lib/cn"

const GlobeCanvas = dynamic(() => import("@/components/three/GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-[480px] rounded-2xl flex items-center justify-center"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--b1)" }}
    >
      <div className="w-32 h-32 rounded-full border border-[var(--bv)] animate-pulse" />
    </div>
  ),
})

const pillars = [
  { number: "01", title: "Ecossistemas Conectados", desc: "Duas das maiores hubs de fintech do mundo trabalhando em sintonia estratégica." },
  { number: "02", title: "Parcerias Reais",          desc: "Pontes concretas entre empresas, investidores e reguladores dos dois países." },
  { number: "03", title: "Pesquisa e Inovação",      desc: "Troca de conhecimento que alimenta o futuro de um mercado financeiro mais eficiente." },
]

export function BridgeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    gsap.fromTo(".pillar-h-line",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut", stagger: 0.2,
        scrollTrigger: { trigger: ".pillars-grid", start: "top 75%", once: true } }
    )
    gsap.fromTo(".pillar-item",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".pillars-grid", start: "top 75%", once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="conexoes"
      className="relative py-28 overflow-hidden grain"
      style={{ background: "var(--bg-deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(168,85,247,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,144,10,0.06) 0%, transparent 65%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealOnScroll>
              <p className="t-eyebrow text-[var(--v5)] mb-4">Nossas Conexões</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="t-display text-[var(--t0)] mb-6">
                Conectamos mentes,{" "}
                <span className="text-grad-aurora">criamos oportunidades.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="t-lead text-[var(--t2)] mb-10" style={{ maxWidth: "52ch" }}>
                O futuro das finanças é colaborativo e sem fronteiras. A Inspire4U é o elo
                estratégico entre o ecossistema de fintechs do Brasil e da Irlanda, dois polos
                de inovação pulsantes. Fomentamos parcerias, promovemos pesquisas e abrimos
                portas para negócios que nascem da troca de conhecimento.
              </p>
            </RevealOnScroll>

            <div className="pillars-grid space-y-0">
              {pillars.map((p) => (
                <div key={p.number}>
                  <div className="pillar-h-line h-px w-full origin-left" style={{ background: "var(--b1)" }} aria-hidden="true" />
                  <div className="pillar-item flex items-start gap-5 py-6">
                    <span className="t-label flex-shrink-0 w-8" style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>
                      {p.number}
                    </span>
                    <div>
                      <h3 className="t-heading text-[var(--t1)] text-base mb-1.5">{p.title}</h3>
                      <p className="t-body text-[var(--t3)] text-sm">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pillar-h-line h-px w-full origin-left" style={{ background: "var(--b1)" }} />
            </div>

            <RevealOnScroll delay={0.5}>
              <MagneticButton className="mt-8">
                <Link
                  href="/conexoes"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[0.9375rem]",
                    "border border-[var(--bv)] text-[var(--v6)]",
                    "hover:bg-[rgba(75,0,130,0.12)] hover:text-white hover:border-[var(--bvs)]",
                    "hover:shadow-[0_0_20px_var(--glow-v3)]",
                    "transition-all duration-300"
                  )}
                >
                  Explore as conexões →
                </Link>
              </MagneticButton>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.2} direction="scale">
            <div>
              <GlobeCanvas />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div
                  className="p-4 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--bv)" }}
                >
                  <p className="text-xl mb-1">🇧🇷</p>
                  <p className="font-bold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--v5)" }}>Brasil</p>
                  <p className="t-label text-[0.5rem] mt-0.5" style={{ color: "var(--t4)" }}>São Paulo</p>
                </div>
                <div
                  className="p-4 rounded-xl text-center"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid var(--ba)" }}
                >
                  <p className="text-xl mb-1">🇮🇪</p>
                  <p className="font-bold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--amber-br)" }}>Irlanda</p>
                  <p className="t-label text-[0.5rem] mt-0.5" style={{ color: "var(--t4)" }}>Dublin</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
