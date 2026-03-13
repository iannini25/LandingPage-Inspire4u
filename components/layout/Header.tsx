"use client"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { cn } from "@/lib/cn"

const navLinks = [
  { href: "/#vocacao",     label: "Vocação" },
  { href: "/athena7",      label: "Athena7" },
  { href: "/conexoes",     label: "Conexões" },
  { href: "/investidores", label: "Investidores" },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={cn("fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none opacity-0")}
    >
      <nav
        className={cn(
          "pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-500 border",
          scrolled
            ? "bg-[rgba(4,1,12,0.92)] border-[var(--bv)] shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "bg-[rgba(4,1,12,0.55)] border-[var(--b1)] backdrop-blur-xl"
        )}
        aria-label="Navegação principal"
      >
        <Link href="/" className="flex items-center shrink-0 mr-4" aria-label="Inspire4U — Página inicial">
          <Image
            src="/images/logo-inspire4u-white.png"
            alt="Inspire4U"
            width={120}
            height={28}
            priority
            className="h-7 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = "flex"
            }}
          />
          <span
            className="hidden items-center gap-2 font-[var(--font-display)] font-bold text-white text-lg tracking-tight"
            aria-hidden="true"
          >
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: "linear-gradient(135deg, var(--v4), var(--v2))" }}>
              I4
            </span>
            Inspire4U
          </span>
        </Link>

        <div className="w-px h-5 bg-[var(--b1)] mx-1 hidden md:block" aria-hidden="true" />

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "text-[var(--t3)] hover:text-[var(--t1)] hover:bg-[var(--bg-glass-sm)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="w-px h-5 bg-[var(--b1)] mx-1 hidden md:block" aria-hidden="true" />

        <MagneticButton strength={0.25}>
          <Link
            href="/contato"
            className={cn(
              "px-5 py-2 rounded-full text-sm font-semibold text-white",
              "bg-gradient-to-r from-[var(--v3)] to-[var(--v2)]",
              "border border-[var(--bv)]",
              "shadow-[0_0_16px_var(--glow-v3)]",
              "hover:shadow-[0_0_30px_var(--glow-v5),0_0_60px_var(--glow-v4)]",
              "transition-shadow duration-300"
            )}
          >
            Fale Conosco
          </Link>
        </MagneticButton>
      </nav>
    </header>
  )
}
