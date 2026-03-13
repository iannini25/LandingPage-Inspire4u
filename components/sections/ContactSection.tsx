"use client"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"
import { ContactForm } from "@/components/forms/ContactForm"

export function ContactSection() {
  return (
    <section
      id="contato"
      className="relative py-28 overflow-hidden grain"
      style={{ background: "var(--bg-void)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(168,85,247,0.09) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(75,0,130,0.18) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <RevealOnScroll>
          <p className="t-eyebrow text-[var(--v5)] mb-4">O Convite</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="t-display text-[var(--t0)] mb-4">
            Vamos inspirar o futuro,{" "}
            <span className="text-grad-violet">juntos?</span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="t-lead text-[var(--t2)] mb-12">
            Seja para estruturar sua governança, implementar a Athena7 ou explorar conexões
            internacionais, nossa equipe está pronta para entender seu desafio.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3} direction="scale">
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "var(--bg-glass-sm)",
              border: "1px solid var(--b1)",
              backdropFilter: "blur(16px)",
            }}
          >
            <ContactForm />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
