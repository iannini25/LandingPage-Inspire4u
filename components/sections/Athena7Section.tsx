"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { cn } from "@/lib/cn"

const features = [
  { icon: "🛡️", title: "Anonimato Total",      desc: "Identidade protegida em todas as etapas do processo de denúncia." },
  { icon: "🔒", title: "Voz Segura",            desc: "Canal exclusivamente criado por e para mulheres, com segurança psicológica real." },
  { icon: "✅", title: "Integridade Garantida", desc: "Processos auditáveis com rastreabilidade completa e imutável." },
]

export function Athena7Section() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    gsap.to(".athena7-ring-1", { rotation: 360,  duration: 22, ease: "none", repeat: -1 })
    gsap.to(".athena7-ring-2", { rotation: -360, duration: 32, ease: "none", repeat: -1 })
    gsap.to(".athena7-ring-3", { rotation: 360,  duration: 42, ease: "none", repeat: -1 })

    gsap.timeline({ repeat: -1 })
      .to(".athena7-halo", { scale: 1.10, opacity: 0.85, duration: 2.5, ease: "sine.inOut" })
      .to(".athena7-halo", { scale: 0.95, opacity: 0.55, duration: 2.5, ease: "sine.inOut" })
      .to(".athena7-halo", { scale: 1.15, opacity: 0.90, duration: 1.8, ease: "sine.inOut" })
      .to(".athena7-halo", { scale: 1.00, opacity: 0.65, duration: 2.5, ease: "sine.inOut" })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 65%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.fromTo(".athena7-logo", { scale: 0.7, opacity: 0, filter: "blur(20px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2 })
          .fromTo(".athena7-word", { y: "110%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.09, duration: 0.75 }, "-=0.9")
          .fromTo(".athena7-body", { y: 22, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "-=0.5")
          .fromTo(".athena7-feat", { y: 45, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.15, ease: "back.out(1.4)", duration: 0.8 }, "-=0.4")
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="athena7"
      className="relative overflow-hidden py-28 grain"
      style={{ background: "var(--v0)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 22px, rgba(107,16,184,0.07) 22px, rgba(107,16,184,0.07) 23px)",
          maskImage: "radial-gradient(ellipse 70% 90% at 50% 20%, black 25%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 65% at 50% -5%, rgba(139,53,212,0.60) 0%, rgba(107,16,184,0.25) 40%, transparent 70%)" }}
        aria-hidden="true"
      />

      {[
        { size: 320, color: "rgba(168,85,247,0.22)", cls: "athena7-ring-1" },
        { size: 480, color: "rgba(139,53,212,0.16)", cls: "athena7-ring-2" },
        { size: 640, color: "rgba(107,16,184,0.10)", cls: "athena7-ring-3" },
      ].map((ring) => (
        <div
          key={ring.size}
          className={cn("absolute rounded-full border pointer-events-none", ring.cls)}
          style={{
            width: ring.size, height: ring.size,
            borderColor: ring.color,
            top: "0%", left: "50%",
            transform: "translate(-50%, -40%)",
          }}
          aria-hidden="true"
        />
      ))}

      <div
        className="athena7-halo absolute pointer-events-none"
        style={{
          width: "500px", height: "500px",
          top: "-12%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(107,16,184,0.40) 0%, rgba(75,0,130,0.15) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8">
            <p className="t-eyebrow text-[var(--v5)]">Nosso Orgulho, Nossa Luta</p>

            <div className="athena7-logo">
              <Image
                src="/images/logo-athena7-white.png"
                alt="Athena7 — Plataforma de Canal de Denúncias"
                width={180}
                height={44}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  ;(e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "block"
                }}
              />
              <div className="hidden" aria-hidden="true">
                <span
                  className="font-bold text-3xl tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, var(--v6), var(--v5))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  athena<span style={{ fontSize: "1.3em" }}>7</span>
                </span>
              </div>
            </div>

            <h2 className="t-display text-[var(--t0)]">
              {["Coragem", "para", "falar."].map((w) => (
                <span key={w} className="athena7-word inline-block overflow-hidden mr-[0.2em]">{w}</span>
              ))}
              <br />
              {["Segurança", "para", "escutar."].map((w) => (
                <span key={w} className="athena7-word inline-block overflow-hidden mr-[0.2em]">{w}</span>
              ))}
            </h2>

            <div className="athena7-body space-y-4">
              <p className="t-lead text-[var(--t2)]" style={{ maxWidth: "52ch" }}>
                Com orgulho, apresentamos a Athena7: a primeira plataforma global de Canal de
                Denúncias criada por e para mulheres.
              </p>
              <p className="t-body text-[var(--t3)]" style={{ maxWidth: "52ch" }}>
                Em um ambiente onde a segurança psicológica é inegociável, a Athena7 oferece
                uma voz segura e anônima, garantindo que a integridade e o respeito sejam a
                base da cultura da sua empresa.
              </p>
              <p className="t-body text-sm italic" style={{ color: "var(--v6)", maxWidth: "52ch" }}>
                "Porque um ambiente de trabalho justo não é um diferencial — é o único caminho."
              </p>
            </div>

            <MagneticButton strength={0.3}>
              <Link
                href="/athena7"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-[0.9375rem]",
                  "bg-gradient-to-b from-[var(--v3)] to-[var(--v2)]",
                  "border border-[var(--bv)]",
                  "shadow-[0_0_30px_var(--glow-v4),inset_0_1px_0_rgba(255,255,255,0.12)]",
                  "hover:shadow-[0_0_60px_var(--glow-v5),0_0_120px_var(--glow-v4)]",
                  "transition-all duration-300"
                )}
              >
                Conheça a plataforma Athena7 →
              </Link>
            </MagneticButton>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="athena7-feat group p-6 rounded-2xl flex items-start gap-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(168,85,247,0.20)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.35s var(--ease-expo)",
                }}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, {
                  background: "rgba(255,255,255,0.07)",
                  borderColor: "var(--bvs)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(75,0,130,0.20)",
                })}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(168,85,247,0.20)",
                  transform: "translateY(0)",
                  boxShadow: "none",
                })}
              >
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="t-heading text-[var(--t1)] text-base mb-2">{f.title}</h3>
                  <p className="t-body text-[var(--t3)] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}

            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ background: "rgba(245,158,11,0.06)", border: "1px solid var(--ba)" }}
            >
              <span className="text-xl flex-shrink-0">🌍</span>
              <p className="t-body text-sm text-[var(--t2)]">
                <strong className="text-[var(--t1)]">Primeira no mundo.</strong>{" "}
                Canal de denúncias desenvolvido exclusivamente por e para mulheres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
