"use client"
import { CountUp } from "@/components/motion/CountUp"

const stats = [
  { value: 120, suffix: "+", label: "Fintechs atendidas" },
  { value: 2,   suffix: "",  label: "Países conectados" },
  { value: 1,   suffix: "",  label: "Plataforma única no mundo" },
]

export function HeroStats() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-10">
          {i > 0 && (
            <div className="hidden sm:block w-px h-10 bg-[var(--b1)]" aria-hidden="true" />
          )}
          <div className="hero-stat flex flex-col items-center gap-1 text-center">
            <span className="t-number text-[var(--t0)]">
              <CountUp end={s.value} suffix={s.suffix} />
            </span>
            <span className="t-eyebrow text-[var(--t3)]">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
