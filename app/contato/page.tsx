import type { Metadata } from "next"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { ContactForm } from "@/components/forms/ContactForm"

export const metadata: Metadata = {
  title: "Contato — Inspire4U",
  description: "Fale com a Inspire4U. Estamos prontos para entender seu desafio.",
}

const locations = [
  { city: "Dublin", country: "Irlanda", flag: "🇮🇪", detail: "Sede Europeia" },
  { city: "São Paulo", country: "Brasil", flag: "🇧🇷", detail: "Sede Latina" },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)" }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden grain">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 45% at 50% -5%, rgba(107,16,184,0.35) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(168,85,247,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <RevealOnScroll>
                <p className="t-eyebrow text-[var(--v5)] mb-4">Entre em contato</p>
                <h1 className="t-display text-[var(--t0)] mb-6">
                  Vamos construir<br />
                  <span className="text-grad-violet">algo juntos.</span>
                </h1>
                <p className="t-lead text-[var(--t2)] mb-10" style={{ maxWidth: "48ch" }}>
                  Seja para estruturar sua governança, conhecer a Athena7 ou explorar parcerias
                  internacionais, nossa equipe está pronta.
                </p>
              </RevealOnScroll>

              <div className="space-y-4">
                {locations.map((loc, i) => (
                  <RevealOnScroll key={loc.city} delay={i * 0.1} direction="left">
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ background: "var(--bg-glass-xs)", border: "1px solid var(--b1)" }}
                    >
                      <span className="text-3xl">{loc.flag}</span>
                      <div>
                        <p className="t-heading text-[var(--t1)] text-base">{loc.city}, {loc.country}</p>
                        <p className="t-label text-[var(--t4)]">{loc.detail}</p>
                      </div>
                      <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <RevealOnScroll delay={0.2} direction="scale">
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: "var(--bg-glass-sm)",
                  border: "1px solid var(--b1)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <h2 className="t-title text-[var(--t0)] text-xl mb-6">Envie uma mensagem</h2>
                <ContactForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  )
}
