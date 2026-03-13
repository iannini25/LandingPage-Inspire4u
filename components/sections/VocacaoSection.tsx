"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"

const pillars = [
  { icon: "⬡", title: "Agilidade Preservada",    desc: "Velocidade de inovação sem ser freada por burocracias. Nossa governança se adapta ao ritmo da fintech." },
  { icon: "◎", title: "Arquitetura Inteligente",  desc: "Não são regras — são estruturas que permitem crescer de forma sustentável e preparada para qualquer desafio." },
  { icon: "◈", title: "Confiança como Base",       desc: "Para que agilidade se converta em liderança, a confiança precisa ser a fundação de cada decisão." },
  { icon: "◇", title: "Crescimento Escalável",     desc: "Da startup promissora à líder de mercado. Construímos a ponte para o próximo nível." },
]

export function VocacaoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=240%",
        pin: pinRef.current,
        scrub: 1.8,
        anticipatePin: 1,
      },
    })

    tl.fromTo(".vocacao-block",
      { opacity: 0.06, y: 20, filter: "blur(3px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.22, ease: "none" }
    )
    tl.fromTo(".pillar-card",
      { y: 50, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.2, ease: "back.out(1.4)" },
      0.15
    )
    tl.fromTo(".vocacao-progress-line",
      { scaleY: 0 },
      { scaleY: 1, ease: "none" },
      0
    )
    tl.fromTo(".vocacao-svg-path",
      { strokeDashoffset: "100%" },
      { strokeDashoffset: "0%", stagger: 0.25, ease: "none" },
      0
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="vocacao"
      className="relative grain"
      style={{ height: "340vh", background: "var(--bg-deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "52px 52px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(75,0,130,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div ref={pinRef} className="h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">

          <div className="relative space-y-8">
            <div
              className="vocacao-progress-line absolute -left-4 top-0 bottom-0 w-px origin-top"
              style={{ background: "linear-gradient(180deg, var(--v4), var(--amber-br))" }}
              aria-hidden="true"
            />
            <p className="t-eyebrow text-[var(--v5)] pl-4">Nossa Vocação</p>
            <h2 className="t-display text-[var(--t0)] pl-4">
              No universo das fintechs,{" "}
              <span className="text-grad-violet">agilidade é tudo.</span>
              <br />E confiança é a{" "}
              <span className="text-grad-gold">base de tudo.</span>
            </h2>
            <div className="space-y-5 pl-4">
              {[
                "Sabemos que a velocidade da inovação não pode ser freada por burocracias complexas.",
                "Por isso, a Inspire4U reinventou a Governança Corporativa — não como regras, mas como arquitetura inteligente.",
                "Uma arquitetura que permite crescer de forma sustentável, segura e preparada para qualquer desafio.",
                "Da startup promissora à líder de mercado, nós construímos a ponte para o seu próximo nível.",
              ].map((text, i) => (
                <p key={i} className="vocacao-block t-lead text-[var(--t2)]" style={{ maxWidth: "54ch" }}>
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <svg width="80" height="400" viewBox="0 0 80 400" fill="none" aria-hidden="true">
              <path
                className="vocacao-svg-path"
                d="M 40 0 C 40 100, 10 150, 40 200 C 70 250, 40 300, 40 400"
                stroke="url(#grad-connect)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="400"
                style={{ strokeDashoffset: "400" }}
              />
              <defs>
                <linearGradient id="grad-connect" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="var(--v4)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--amber-br)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--v4)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="pillar-card group p-5 rounded-xl flex items-start gap-4 cursor-default"
                style={{
                  background: "var(--bg-glass-xs)",
                  border: "1px solid var(--b1)",
                  transition: "all 0.35s var(--ease-expo)",
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    background: "var(--bg-glass-md)",
                    borderColor: "var(--bv)",
                    transform: "translateX(-4px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(168,85,247,0.15)",
                  })
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, {
                    background: "var(--bg-glass-xs)",
                    borderColor: "var(--b1)",
                    transform: "translateX(0)",
                    boxShadow: "none",
                  })
                }}
              >
                <span className="text-2xl leading-none mt-0.5 flex-shrink-0" style={{ color: "var(--v5)" }}>
                  {p.icon}
                </span>
                <div>
                  <h3 className="t-heading text-[var(--t1)] mb-1 text-base">{p.title}</h3>
                  <p className="t-body text-[var(--t3)] text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
