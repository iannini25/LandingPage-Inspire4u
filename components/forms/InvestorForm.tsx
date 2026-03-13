"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { submitInvestor } from "@/actions/investors"
import { FloatingField } from "./FloatingField"
import { cn } from "@/lib/cn"

const INTEREST_TYPES = [
  "Investimento Estratégico",
  "Parceria de Negócios",
  "Fusão ou Aquisição (M&A)",
  "Outro",
] as const

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full py-4 rounded-xl font-semibold relative overflow-hidden",
        "text-[var(--bg-void)] bg-gradient-to-r from-[var(--amber-br)] to-[var(--amber)]",
        "border border-[var(--ba)]",
        "shadow-[0_0_20px_var(--amber-glow)]",
        "hover:shadow-[0_0_40px_var(--amber-glow),0_0_80px_rgba(212,144,10,0.15)]",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "transition-all duration-300 font-bold"
      )}
    >
      {pending ? "Enviando..." : "Enviar Interesse →"}
    </button>
  )
}

const INITIAL = { success: false, errors: {} as Record<string, string[]> }

export function InvestorForm() {
  const [state, action] = useActionState(submitInvestor, INITIAL)

  return (
    <form action={action} className="space-y-4">
      <FloatingField name="name"    label="Nome Completo"                    error={state.errors?.name?.[0]} />
      <FloatingField name="company" label="Empresa / Fundo de Investimento"  error={state.errors?.company?.[0]} />
      <FloatingField name="email"   label="E-mail Corporativo" type="email"  error={state.errors?.email?.[0]} />

      <fieldset>
        <legend className="t-label text-[var(--t4)] mb-3 block">Tipo de Interesse</legend>
        <div className="flex flex-wrap gap-2">
          {INTEREST_TYPES.map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="interestType" value={type} className="sr-only peer" />
              <span
                className={cn(
                  "inline-block px-4 py-2 rounded-full text-xs font-medium",
                  "border transition-all duration-200 cursor-pointer",
                  "border-[var(--b1)] text-[var(--t3)]",
                  "peer-checked:bg-[var(--v2)] peer-checked:border-[var(--bvs)] peer-checked:text-white",
                  "peer-checked:shadow-[0_0_14px_var(--glow-v3)]",
                  "hover:border-[var(--b2)] hover:text-[var(--t2)]"
                )}
              >
                {type}
              </span>
            </label>
          ))}
        </div>
        {state.errors?.interestType && (
          <p className="mt-1.5 text-xs" style={{ color: "var(--amber-br)" }}>
            {state.errors.interestType[0]}
          </p>
        )}
      </fieldset>

      <FloatingField name="message" label="Mensagem (Opcional)" type="textarea" />

      {state.success && (
        <div
          className="p-4 rounded-xl text-sm"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid var(--ba)", color: "var(--amber-lt)" }}
        >
          ✓ Interesse recebido! Nossa equipe entrará em contato em breve.
        </div>
      )}

      <SubmitBtn />
    </form>
  )
}
