"use client"
import Link from "next/link"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { cn } from "@/lib/cn"

export function HeroCTAs() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
      <MagneticButton>
        <Link
          href="/#vocacao"
          className={cn(
            "hero-cta group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl",
            "font-semibold text-white text-[0.9375rem] overflow-hidden",
            "bg-gradient-to-b from-[var(--v3)] to-[var(--v2)]",
            "border border-[var(--bv)]",
            "shadow-[0_0_24px_var(--glow-v3),inset_0_1px_0_rgba(255,255,255,0.12)]",
            "hover:shadow-[0_0_48px_var(--glow-v5),0_0_96px_var(--glow-v4)]",
            "hover:from-[var(--v4)] hover:to-[var(--v3)]",
            "transition-all duration-300"
          )}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            aria-hidden="true"
          />
          <span className="relative">Descubra como</span>
          <span className="relative group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </MagneticButton>

      <MagneticButton>
        <Link
          href="/athena7"
          className={cn(
            "hero-cta inline-flex items-center gap-2 px-8 py-4 rounded-xl",
            "font-semibold text-[var(--v6)] text-[0.9375rem]",
            "border border-[var(--bv)]",
            "hover:bg-[rgba(75,0,130,0.15)] hover:border-[var(--bvs)] hover:text-white",
            "hover:shadow-[0_0_24px_var(--glow-v3)]",
            "transition-all duration-300"
          )}
        >
          Conheça a Athena7
        </Link>
      </MagneticButton>
    </div>
  )
}
