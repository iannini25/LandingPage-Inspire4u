"use client"
import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { gsap } from "@/lib/gsap"
import { submitContact } from "@/actions/contact"
import { FloatingField } from "./FloatingField"
import { cn } from "@/lib/cn"

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden",
        "bg-gradient-to-b from-[var(--v3)] to-[var(--v2)]",
        "border border-[var(--bv)]",
        "shadow-[0_0_20px_var(--glow-v3)]",
        "hover:shadow-[0_0_40px_var(--glow-v5),0_0_80px_var(--glow-v4)]",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "transition-all duration-300"
      )}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Enviando...
        </span>
      ) : "Enviar mensagem →"}
    </button>
  )
}

const INITIAL = { success: false, errors: {} as Record<string, string[]> }

export function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      gsap.fromTo(".contact-success",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
      )
    }
  }, [state.success])

  return (
    <form ref={formRef} action={action} className="space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <FloatingField name="name"    label="Nome"    type="text"  error={state.errors?.name?.[0]} />
        <FloatingField name="company" label="Empresa" type="text"  error={state.errors?.company?.[0]} />
      </div>
      <FloatingField name="email"   label="E-mail"   type="email"    error={state.errors?.email?.[0]} />
      <FloatingField name="message" label="Mensagem" type="textarea" error={state.errors?.message?.[0]} />

      {state.success && (
        <div
          className="contact-success p-4 rounded-xl text-sm"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#10B981",
          }}
        >
          ✓ Mensagem enviada com sucesso! Retornaremos em breve.
        </div>
      )}

      <SubmitBtn />
    </form>
  )
}
