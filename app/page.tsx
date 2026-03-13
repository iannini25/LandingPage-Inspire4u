"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

/* ─── HOOKS ─────────────────────────────────────────────────────────── */
function useCountUp(end: number, duration = 1800) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const prog = Math.min((ts - start) / duration, 1)
        setVal(Math.floor(prog * end))
        if (prog < 1) requestAnimationFrame(step)
        else setVal(end)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])
  return { val, ref }
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]")
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const delay = el.dataset.delay ?? "0"
          el.style.transitionDelay = `${delay}ms`
          el.classList.add("is-visible")
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.10 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useGSAPReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-visible"))
      return
    }

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)

      // Reveal geral — exclui ledger-row (animados separadamente)
      document.querySelectorAll("[data-reveal]:not([data-ledger-row])").forEach(el => {
        const delay = parseFloat((el as HTMLElement).dataset.delay || "0") / 1000
        gsap.fromTo(
          el,
          { opacity: 0, y: 28, filter: "blur(4px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.85,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        )
      })

      // Word reveal
      document.querySelectorAll("[data-word-reveal]").forEach(el => {
        const spans = el.querySelectorAll("span[data-word]")
        gsap.fromTo(
          spans,
          { opacity: 0, y: 40, rotateX: -20 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        )
      })

      // LedgerRows: stagger sequencial
      document.querySelectorAll("[data-ledger-list]").forEach(list => {
        const rows = list.querySelectorAll("[data-ledger-row]")
        gsap.fromTo(
          rows,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: list, start: "top 80%" },
          }
        )
      })

      // Marquee pausa no hover
      const marqueeEl = document.querySelector("[data-marquee]") as HTMLElement
      if (marqueeEl) {
        marqueeEl.addEventListener("mouseenter", () => { marqueeEl.style.animationPlayState = "paused" })
        marqueeEl.addEventListener("mouseleave", () => { marqueeEl.style.animationPlayState = "running" })
      }

      // Parallax nos blobs do hero
      gsap.to("[data-blob-parallax]", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#main",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      // White glow nos stat numbers
      document.querySelectorAll("[data-stat]").forEach(stat => {
        gsap.to(stat, {
          textShadow: "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(168,85,247,0.50)",
          duration: 0.8,
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      })

    })
  }, [])
}

/* ─── STYLE TOKENS ───────────────────────────────────────────────────── */
const S = {
  eyebrow: {
    fontFamily: "var(--font-body)",
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--v5)",
  },
  eyebrowAmber: {
    fontFamily: "var(--font-body)",
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--amber2)",
  },
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.6rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
  },
  gradViolet: {
    background: "linear-gradient(135deg, var(--v5) 0%, var(--v7) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  gradGold: {
    background: "linear-gradient(135deg, var(--amber2) 0%, var(--amber3) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  gradAurora: {
    background: "linear-gradient(135deg, var(--v5) 0%, var(--v6) 45%, var(--amber3) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
}

/* ─── FLOOD CTA — LIQUID GLASS ───────────────────────────────────────── */
function FloodCTA({
  href,
  children,
  variant = "violet",
  size = "md",
}: {
  href: string
  children: React.ReactNode
  variant?: "violet" | "amber" | "ghost"
  size?: "sm" | "md" | "lg"
}) {
  const [hovered, setHovered] = useState(false)

  const configs = {
    violet: {
      idle: {
        background: "rgba(75,0,130,0.12)",
        border: "1px solid rgba(168,85,247,0.30)",
        borderTop: "1px solid rgba(168,85,247,0.50)",
        color: "var(--v6)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(168,85,247,0.10)",
      },
      hover: {
        boxShadow: "0 0 30px rgba(107,16,184,0.50), 0 0 80px rgba(75,0,130,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
        color: "#fff",
      },
      fill: "linear-gradient(135deg,rgba(107,16,184,0.95),rgba(75,0,130,0.98))",
    },
    amber: {
      idle: {
        background: "rgba(212,144,10,0.08)",
        border: "1px solid rgba(245,158,11,0.28)",
        borderTop: "1px solid rgba(245,158,11,0.45)",
        color: "var(--amber2)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,158,11,0.08)",
      },
      hover: {
        boxShadow: "0 0 30px rgba(212,144,10,0.45), 0 0 60px rgba(245,158,11,0.20), inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#0A0510",
      },
      fill: "linear-gradient(135deg,rgba(245,158,11,0.95),rgba(212,144,10,0.98))",
    },
    ghost: {
      idle: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderTop: "1px solid rgba(255,255,255,0.18)",
        color: "rgba(255,255,255,0.55)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      hover: {
        boxShadow: "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#fff",
      },
      fill: "rgba(255,255,255,0.08)",
    },
  }

  const sizes = {
    sm: { padding: "8px 16px", fontSize: "0.8rem" },
    md: { padding: "13px 26px", fontSize: "0.9rem" },
    lg: { padding: "16px 28px", fontSize: "0.95rem" },
  }

  const c = configs[variant]
  const sz = sizes[size]

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: sz.padding,
        borderRadius: "14px",
        fontWeight: 600,
        fontSize: sz.fontSize,
        fontFamily: "var(--font-body)",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        color: hovered ? c.hover.color : c.idle.color,
        background: c.idle.background,
        border: c.idle.border,
        borderTop: c.idle.borderTop,
        boxShadow: hovered ? c.hover.boxShadow : c.idle.boxShadow,
        transition: "color 0.35s, box-shadow 0.35s, transform 0.35s, border-color 0.35s",
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: c.fill,
        clipPath: hovered ? "inset(0 0% 0 0 round 14px)" : "inset(0 100% 0 0 round 14px)",
        transition: "clip-path 0.48s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 0,
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span aria-hidden="true" style={{
        position: "relative", zIndex: 1, fontSize: "0.85rem",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}>→</span>
    </a>
  )
}

/* ─── CORNER BRACKETS ────────────────────────────────────────────────── */
function CornerBrackets({ color = "rgba(168,85,247,0.4)" }: { color?: string }) {
  const s: React.CSSProperties = { position: "absolute", width: "14px", height: "14px", pointerEvents: "none" }
  const b = `2px solid ${color}`
  return (
    <>
      <div aria-hidden="true" style={{ ...s, top: 0, left: 0, borderTop: b, borderLeft: b }} />
      <div aria-hidden="true" style={{ ...s, top: 0, right: 0, borderTop: b, borderRight: b }} />
      <div aria-hidden="true" style={{ ...s, bottom: 0, left: 0, borderBottom: b, borderLeft: b }} />
      <div aria-hidden="true" style={{ ...s, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  )
}

/* ─── GLASS CARD ─────────────────────────────────────────────────────── */
function GlassCard({
  icon,
  tag,
  tagColor = "violet",
  title,
  desc,
  delay = "0",
  wide = false,
}: {
  icon: string
  tag: string
  tagColor?: "violet" | "amber"
  title: string
  desc: string
  delay?: string
  wide?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-reveal
      data-delay={delay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: wide ? "28px 32px" : "24px",
        borderRadius: "20px",
        gridColumn: wide ? "1 / -1" : "auto",
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: hovered
          ? `1px solid ${tagColor === "amber" ? "rgba(245,158,11,0.40)" : "rgba(168,85,247,0.40)"}`
          : "1px solid rgba(255,255,255,0.10)",
        borderTop: hovered
          ? `1px solid ${tagColor === "amber" ? "rgba(245,158,11,0.60)" : "rgba(168,85,247,0.60)"}`
          : "1px solid rgba(255,255,255,0.18)",
        boxShadow: hovered
          ? tagColor === "amber"
            ? "0 0 0 1px rgba(245,158,11,0.12), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,144,10,0.20), inset 0 1px 0 rgba(245,158,11,0.12)"
            : "0 0 0 1px rgba(168,85,247,0.10), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(107,16,184,0.25), inset 0 1px 0 rgba(168,85,247,0.15)"
          : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        display: "flex",
        flexDirection: wide ? "row" : "column",
        alignItems: wide ? "center" : "flex-start",
        gap: wide ? "24px" : "16px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered && (
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, borderRadius: "20px",
          background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%)",
          backgroundSize: "300% 100%",
          animation: "holo-shimmer 1.5s linear infinite",
          pointerEvents: "none",
        }} />
      )}

      <div style={{
        width: wide ? "56px" : "46px",
        height: wide ? "56px" : "46px",
        borderRadius: "14px",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: wide ? "1.6rem" : "1.3rem",
        background: tagColor === "amber" ? "rgba(212,144,10,0.12)" : "rgba(107,16,184,0.18)",
        border: tagColor === "amber" ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(168,85,247,0.30)",
        boxShadow: tagColor === "amber" ? "0 0 14px rgba(212,144,10,0.18)" : "0 0 14px rgba(107,16,184,0.25)",
        transition: "all 0.3s",
      }}>
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <span style={{
          display: "inline-block",
          marginBottom: "8px",
          padding: "2px 9px",
          borderRadius: "20px",
          fontSize: "0.55rem",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          background: tagColor === "amber" ? "rgba(245,158,11,0.10)" : "rgba(168,85,247,0.12)",
          color: tagColor === "amber" ? "var(--amber3)" : "var(--v6)",
          border: tagColor === "amber" ? "1px solid rgba(245,158,11,0.22)" : "1px solid rgba(168,85,247,0.22)",
        }}>
          {tag}
        </span>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: wide ? "1.05rem" : "0.9375rem",
          color: "#fff",
          marginBottom: "6px",
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: "0.8125rem",
          color: hovered ? "rgba(196,181,214,0.9)" : "var(--t3)",
          lineHeight: 1.68,
          transition: "color 0.3s",
          maxWidth: wide ? "65ch" : "38ch",
        }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

/* ─── LEDGER ROW ─────────────────────────────────────────────────────── */
function LedgerRow({
  number,
  icon,
  title,
  desc,
  delay = "0",
}: {
  number: string
  icon?: string
  title: string
  desc: string
  delay?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-reveal
      data-delay={delay}
      data-ledger-row=""
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "40px 1fr auto",
        gap: "24px",
        alignItems: "center",
        padding: "22px 0",
        borderTop: `1px solid ${hovered ? "var(--bv)" : "var(--b1)"}`,
        cursor: "default",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(75,0,130,0.18), rgba(107,16,184,0.10))",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 0.5s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.625rem",
          fontWeight: 700,
          color: hovered ? "var(--v5)" : "var(--t4)",
          letterSpacing: "0.12em",
          transition: "color 0.3s",
          zIndex: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {number}
      </span>
      <div style={{ zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          {icon && <span style={{ fontSize: "1rem" }}>{icon}</span>}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: hovered ? "var(--t0)" : "var(--t1)",
              letterSpacing: "-0.01em",
              transition: "color 0.3s",
            }}
          >
            {title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: hovered ? "var(--t2)" : "var(--t3)",
            lineHeight: 1.65,
            transition: "color 0.3s",
            maxWidth: "60ch",
          }}
        >
          {desc}
        </p>
      </div>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "0.875rem",
          color: "var(--v5)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        →
      </span>
    </div>
  )
}

/* ─── STAIRCASE HEADLINE ─────────────────────────────────────────────── */
function StaircaseHeadline({
  lines,
  accentLine,
  accentStyle,
}: {
  lines: string[]
  accentLine?: number
  accentStyle?: "violet" | "gold" | "aurora"
}) {
  const accents = {
    violet: {
      background: "linear-gradient(135deg,var(--v6),var(--v5))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    gold: {
      background: "linear-gradient(135deg,var(--v6) 0%,var(--amber2) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    aurora: {
      background: "linear-gradient(135deg,var(--v5) 0%,var(--v6) 45%,var(--amber3) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  }

  const indents = ["0%", "8%", "4%", "12%"]

  return (
    <h2
      data-reveal
      className="staircase-headline"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        letterSpacing: "-0.035em",
        lineHeight: 0.97,
        marginBottom: "32px",
      }}
    >
      {lines.map((line, i) => {
        const isAccent = i === accentLine && accentStyle
        return (
          <span
            key={i}
            style={{
              display: "block",
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              paddingLeft: indents[i] ?? "0%",
              paddingBottom: isAccent ? "0.18em" : undefined,
              color: "var(--t0)",
              ...(isAccent ? accents[accentStyle!] : {}),
            }}
          >
            {line}
          </span>
        )
      })}
    </h2>
  )
}

/* ─── STAT TICKER ────────────────────────────────────────────────────── */
function StatTicker({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const { val, ref } = useCountUp(end)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        padding: "0 28px",
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: "2px" }}>
        <span
          ref={ref}
          data-stat=""
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: "var(--t0)",
          }}
        >
          {val}{suffix}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: "2px",
            height: "60%",
            background: "var(--v5)",
            animation: "blink 1.2s ease-in-out infinite",
            borderRadius: "1px",
            flexShrink: 0,
            alignSelf: "center",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg,transparent,var(--v4),transparent)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.5625rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--t4)",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── FLOAT FIELD — LIQUID GLASS ─────────────────────────────────────── */
function FloatField({ label, type = "text", required = false, textarea = false }: {
  label: string; type?: string; required?: boolean; textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [filled, setFilled] = useState(false)
  const raised = focused || filled

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: "14px",
    background: focused ? "rgba(107,16,184,0.10)" : "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: focused ? "1px solid rgba(168,85,247,0.50)" : "1px solid rgba(255,255,255,0.09)",
    borderTop: focused ? "1px solid rgba(168,85,247,0.70)" : "1px solid rgba(255,255,255,0.16)",
    boxShadow: focused
      ? "0 0 0 3px rgba(107,16,184,0.15), 0 0 25px rgba(107,16,184,0.20), inset 0 1px 0 rgba(168,85,247,0.12)"
      : "0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "1.25rem 1rem 0.5rem",
    background: "transparent",
    border: "none",
    borderRadius: "14px",
    color: "var(--t1)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    resize: "none" as const,
  }

  return (
    <div style={wrapStyle}>
      <label
        style={{
          position: "absolute",
          left: "1rem",
          top: raised ? "0.45rem" : "1rem",
          fontSize: raised ? "0.65rem" : "0.9rem",
          color: raised ? "var(--v5)" : "var(--t3)",
          pointerEvents: "none",
          transition: "all 0.2s",
          fontFamily: "var(--font-body)",
        }}
      >
        {label}{required && " *"}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          required={required}
          style={fieldStyle}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0) }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          required={required}
          style={fieldStyle}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0) }}
          onChange={e => setFilled(e.target.value.length > 0)}
        />
      )}
    </div>
  )
}

/* ─── SECTION BG NUMBER ──────────────────────────────────────────────── */
function SectionNumber({ n }: { n: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(12rem, 22vw, 22rem)",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-0.06em",
        color: "transparent",
        WebkitTextStroke: "1px rgba(168,85,247,0.07)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {n}
    </div>
  )
}

/* ─── VERTICAL LABEL ─────────────────────────────────────────────────── */
function VerticalLabel({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="vertical-label"
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        transformOrigin: "center center",
        fontFamily: "var(--font-display)",
        fontSize: "0.5rem",
        fontWeight: 600,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "var(--t4)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  )
}

/* ─── HEADER — FULL WIDTH ─────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("#")) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const nav = [
    { href: "#hero",         label: "Home",          active: true  },
    { href: "#vocacao",      label: "Nossa Vocação",  active: false },
    { href: "#athena7",      label: "Athena7",        active: false },
    { href: "#conexoes",     label: "Conexões",       active: false },
    { href: "#investidores", label: "Investidores",   active: false },
  ]

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 40px 0",
      background: scrolled ? "rgba(4,1,12,0.35)" : "transparent",
      backdropFilter: scrolled ? "blur(12px) saturate(120%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px) saturate(120%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
      transition: "all 0.5s ease",
    }} role="banner">

      {/* Espaço reservado para manter o layout justificado */}
      <div style={{ flexShrink: 0, width: "36px" }} />

      {/* NAV — centro absoluto */}
      <nav className="hdr-pill-nav" style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }} aria-label="Navegação principal">
        {nav.map(item => (
          <div key={item.href} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link
              href={item.href}
              onClick={smoothScroll}
              style={{
                display: "block",
                padding: "8px 14px",
                fontSize: "0.875rem",
                fontWeight: item.active ? 500 : 400,
                color: item.active ? "#fff" : "rgba(255,255,255,0.50)",
                textDecoration: "none",
                transition: "color 0.2s",
                borderRadius: "8px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff" }}
              onMouseLeave={e => { e.currentTarget.style.color = item.active ? "#fff" : "rgba(255,255,255,0.50)" }}
            >
              {item.label}
            </Link>
            {item.active && (
              <span aria-hidden="true" style={{
                position: "absolute",
                bottom: "-4px",
                fontSize: "0.45rem",
                color: "#A855F7",
                lineHeight: 1,
              }}>✦</span>
            )}
          </div>
        ))}
      </nav>

      {/* CTA — direita */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginRight: "20px" }}>
        <Link
          href="#contato"
          onClick={smoothScroll}
          className="hdr-pill-sep"
          style={{
            flexShrink: 0,
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 22px",
            borderRadius: "50px",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            background: "rgba(15,6,32,0.90)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(75,0,130,0.60)"
            e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)"
            e.currentTarget.style.boxShadow = "0 0 20px rgba(107,16,184,0.40)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(15,6,32,0.90)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
            e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.10)"
          }}
        >
          Fale Conosco
        </Link>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="hdr-burger"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--t1)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: "20px",
          background: "rgba(4,1,12,0.97)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: "16px", padding: "8px",
          minWidth: "200px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          {nav.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block", padding: "10px 16px",
                fontFamily: "var(--font-body)", fontSize: "0.9rem",
                color: "var(--t2)", textDecoration: "none",
                borderRadius: "10px", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(168,85,247,0.1)"
                e.currentTarget.style.color = "#fff"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "var(--t2)"
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "8px 0" }} />
          <Link
            href="#contato"
            onClick={() => setOpen(false)}
            style={{
              display: "block", padding: "10px 16px",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem",
              color: "var(--v6)", textDecoration: "none",
              borderRadius: "10px",
            }}
          >
            Fale Conosco →
          </Link>
        </div>
      )}
    </header>
  )
}

/* ─── BLACK HOLE SECTION ─────────────────────────────────────────────── */
function BlackHoleSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let frame = 0
    let raf: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, W(), H())

      const cx = W() * 0.5
      const cy = H() * 1.15
      const R = Math.min(W(), H()) * 0.85

      const diskColors = [
        { offset: 0.0, color: "rgba(255,255,255,0)" },
        { offset: 0.08, color: "rgba(255,255,255,0.03)" },
        { offset: 0.22, color: "rgba(212,160,255,0.35)" },
        { offset: 0.38, color: "rgba(168,85,247,0.75)" },
        { offset: 0.50, color: "rgba(255,255,255,0.90)" },
        { offset: 0.62, color: "rgba(245,158,11,0.70)" },
        { offset: 0.78, color: "rgba(168,85,247,0.40)" },
        { offset: 0.92, color: "rgba(212,160,255,0.10)" },
        { offset: 1.0, color: "rgba(255,255,255,0)" },
      ]

      const pulse = 0.88 + Math.sin(frame * 0.018) * 0.12

      ctx.save()
      ctx.globalAlpha = pulse
      ctx.lineWidth = 3.5
      const diskGrad = ctx.createLinearGradient(0, 0, W(), 0)
      diskColors.forEach(c => diskGrad.addColorStop(c.offset, c.color))
      ctx.strokeStyle = diskGrad
      ctx.shadowColor = "rgba(200,130,255,0.9)"
      ctx.shadowBlur = 28
      ctx.beginPath()
      ctx.ellipse(cx, cy, R * 0.98, R * 0.12, 0, Math.PI * 1.18, Math.PI * 1.82)
      ctx.stroke()
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = pulse * 0.55
      ctx.lineWidth = 1.2
      ctx.strokeStyle = "rgba(255,255,255,0.85)"
      ctx.shadowColor = "rgba(255,255,255,0.95)"
      ctx.shadowBlur = 18
      ctx.beginPath()
      ctx.ellipse(cx, cy, R * 0.98, R * 0.12, 0, Math.PI * 1.32, Math.PI * 1.68)
      ctx.stroke()
      ctx.restore()

      for (let i = 1; i <= 3; i++) {
        const alpha = (0.18 - i * 0.045) * (0.8 + Math.sin(frame * 0.015 + i) * 0.2)
        const rOff = R * (0.98 + i * 0.045)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(168,85,247,${0.5 - i * 0.12})`
        ctx.shadowColor = "rgba(168,85,247,0.6)"
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.ellipse(cx, cy, rOff, rOff * 0.122, 0, Math.PI * 1.15, Math.PI * 1.85)
        ctx.stroke()
        ctx.restore()
      }

      const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.3)
      haloGrad.addColorStop(0, "rgba(75,0,130,0.0)")
      haloGrad.addColorStop(0.4, "rgba(75,0,130,0.18)")
      haloGrad.addColorStop(0.7, "rgba(107,16,184,0.10)")
      haloGrad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.save()
      ctx.globalAlpha = 0.7
      ctx.fillStyle = haloGrad
      ctx.fillRect(0, 0, W(), H())
      ctx.restore()

      const particleCount = 18
      for (let p = 0; p < particleCount; p++) {
        const angle = (p / particleCount) * Math.PI + frame * (0.003 + p * 0.0001)
        const scatter = Math.sin(p * 2.4) * R * 0.08
        const px = cx + Math.cos(angle) * (R + scatter)
        const py = cy + Math.sin(angle) * (R * 0.12 + scatter * 0.08)
        const pAlpha = Math.max(0, Math.sin(angle) * 0.8)
        const pSize = 1 + Math.sin(p * 1.7 + frame * 0.02) * 0.8

        if (py < H()) {
          ctx.save()
          ctx.globalAlpha = pAlpha * pulse
          ctx.fillStyle = p % 3 === 0 ? "rgba(245,158,11,0.9)" : "rgba(220,180,255,0.9)"
          ctx.shadowColor = p % 3 === 0 ? "rgba(245,158,11,1)" : "rgba(200,150,255,1)"
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(px, py, pSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        )
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      style={{
        position: "relative",
        height: "55vh",
        minHeight: "380px",
        maxHeight: "600px",
        overflow: "hidden",
        background: "radial-gradient(ellipse 100% 200% at 50% 120%, rgba(45,0,104,0.5) 0%, rgba(7,3,15,0) 55%), var(--bg0)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div style={{
        position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", zIndex: 10, pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
          fontWeight: 600,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(168,85,247,0.7)",
          marginBottom: "10px",
        }}>
          Governança como força gravitacional
        </p>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.82)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          textShadow: "0 0 40px rgba(168,85,247,0.4)",
        }}>
          Estrutura que atrai.<br />
          <span style={{
            background: "linear-gradient(90deg,var(--v5),var(--amber3))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Integridade que sustenta.
          </span>
        </p>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(to bottom, transparent, var(--bg0))",
        zIndex: 5,
      }} />
    </div>
  )
}

/* ─── HERO PILL ─────────────────────────────────────────────────────── */
function HeroPill({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const [hov, setHov] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "13px 30px",
        borderRadius: "50px",
        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
        fontWeight: 500,
        fontSize: "0.925rem",
        letterSpacing: "0.01em",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        cursor: "pointer",
        background: primary
          ? hov ? "rgba(45,10,90,0.98)" : "rgba(28,5,65,0.96)"
          : hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.92)",
        border: "none",
        boxShadow: primary
          ? hov
            ? [
                "0 0 0 1px rgba(150,80,255,0.70)",
                "0 0 12px rgba(130,60,240,0.55)",
                "0 0 28px rgba(100,30,200,0.30)",
                "inset 0 1px 0 rgba(200,160,255,0.20)",
              ].join(", ")
            : [
                "0 0 0 1px rgba(130,60,240,0.45)",
                "0 0 8px rgba(100,30,200,0.20)",
                "inset 0 1px 0 rgba(180,130,255,0.12)",
              ].join(", ")
          : hov
            ? [
                "0 0 0 1px rgba(255,255,255,0.35)",
                "0 0 10px rgba(180,130,255,0.20)",
                "inset 0 1px 0 rgba(255,255,255,0.15)",
              ].join(", ")
            : [
                "0 0 0 1px rgba(255,255,255,0.18)",
                "inset 0 1px 0 rgba(255,255,255,0.08)",
              ].join(", "),
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {children}
    </a>
  )
}

/* ─── LENS FLARE ─────────────────────────────────────────────────────── */
function LensFlare() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "-0.6em",
        right: "-0.45em",
        display: "inline-block",
        width: "36px",
        height: "36px",
        pointerEvents: "none",
        animation: "lensflare-pulse 3.5s ease-in-out infinite",
        zIndex: 10,
      }}
    >
      <svg
        viewBox="-8 -8 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="rayV" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="white" stopOpacity={0} />
            <stop offset="38%" stopColor="white" stopOpacity={0.75} />
            <stop offset="50%" stopColor="white" stopOpacity={1} />
            <stop offset="62%" stopColor="white" stopOpacity={0.75} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="rayH" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="white" stopOpacity={0} />
            <stop offset="38%" stopColor="white" stopOpacity={0.75} />
            <stop offset="50%" stopColor="white" stopOpacity={1} />
            <stop offset="62%" stopColor="white" stopOpacity={0.75} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </linearGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="30%" stopColor="#DCC8FF" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#B48CFF" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x="15.2" y="-14" width="1.6" height="60" fill="url(#rayV)" />
        <rect x="-14" y="15.2" width="60" height="1.6" fill="url(#rayH)" />
        <line x1="7" y1="7" x2="25" y2="25" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        <line x1="25" y1="7" x2="7" y2="25" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        <circle cx="16" cy="16" r="9" fill="url(#coreGlow)" opacity={0.35} />
        <circle cx="16" cy="16" r="2.5" fill="white" />
        <circle cx="16" cy="16" r="1.4" fill="white" />
      </svg>
    </span>
  )
}

/* ─── HERO ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const logoRef   = useRef<HTMLDivElement>(null)
  const headRef   = useRef<HTMLDivElement>(null)
  const subRef    = useRef<HTMLParagraphElement>(null)
  const ctasRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Starfield canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener("resize", setSize, { passive: true })

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() < 0.06 ? 1.3 : Math.random() < 0.2 ? 0.8 : 0.45,
      base: 0.10 + Math.random() * 0.50,
      speed: 0.006 + Math.random() * 0.010,
      phase: Math.random() * Math.PI * 2,
    }))

    let frame = 0, raf: number
    const tick = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width, H = canvas.height
      stars.forEach(s => {
        const twinkle = s.base + s.base * 0.55 * Math.sin(frame * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${twinkle})`
        ctx.fill()
        if (s.r > 1.1) {
          ctx.save()
          ctx.globalAlpha = twinkle * 0.5
          ctx.strokeStyle = "#fff"
          ctx.lineWidth = 0.5
          const sx = s.x * W, sy = s.y * H
          ctx.beginPath()
          ctx.moveTo(sx - 3.5, sy); ctx.lineTo(sx + 3.5, sy)
          ctx.moveTo(sx, sy - 3.5); ctx.lineTo(sx, sy + 3.5)
          ctx.stroke()
          ctx.restore()
        }
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setSize) }
  }, [])

  /* ── GSAP intro ── */
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(logoRef.current,
        { scale: 0.55, opacity: 0, filter: "blur(14px)" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.5, ease: "back.out(1.1)" }, 0)
      tl.fromTo(headRef.current,
        { y: 32, opacity: 0 },
        { y: 0,  opacity: 1, duration: 1.0 }, 0.55)
      tl.fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.85 }, 0.75)
      tl.fromTo(ctasRef.current,
        { y: 18, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8 }, 0.90)
      tl.call(() => {
        gsap.to(logoRef.current, {
          y: -14, duration: 3.8,
          ease: "power1.inOut", yoyo: true, repeat: -1,
        })
      })
    })
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000009",
        paddingTop: "80px",
        paddingBottom: "48px",
        gap: "0",
      }}
      aria-labelledby="hero-title"
    >
      {/* Starfield */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* Feixe único: suave, difuso, sem bordas visíveis */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "1100px",
        height: "140vh",
        background: [
          "radial-gradient(ellipse 42% 85% at 50% 0%,",
          "  rgba(95,28,210,0.65) 0%,",
          "  rgba(75,18,175,0.42) 12%,",
          "  rgba(55,10,145,0.25) 28%,",
          "  rgba(40,8,120,0.14) 42%,",
          "  rgba(30,5,95,0.08) 56%,",
          "  rgba(20,3,80,0.04) 70%,",
          "  rgba(8,1,40,0.01) 84%,",
          "  transparent 96%)",
        ].join(""),
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* LOGO CONTAINER */}
      <div
        ref={logoRef}
        style={{
          position: "relative",
          zIndex: 10,
          marginBottom: "44px",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Trilho esquerdo */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "50%",
          right: "calc(50% + 210px)",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
          pointerEvents: "none",
        }}>
          <div style={{ width: "1px", height: "20px", background: "rgba(140,70,200,0.50)", marginBottom: "-1px" }} />
          <div style={{ width: "min(12vw, 110px)", height: "1px", background: "linear-gradient(to left, rgba(140,70,200,0.55), rgba(140,70,200,0.05) 85%, transparent)" }} />
        </div>

        {/* Trilho direito */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "50%",
          left: "calc(50% + 210px)",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}>
          <div style={{ width: "min(12vw, 110px)", height: "1px", background: "linear-gradient(to right, rgba(140,70,200,0.55), rgba(140,70,200,0.05) 85%, transparent)" }} />
          <div style={{ width: "1px", height: "20px", background: "rgba(140,70,200,0.50)", marginBottom: "-1px" }} />
        </div>

        {/* Glow difuso de fundo */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "680px",
          height: "680px",
          borderRadius: "50%",
          background: [
            "radial-gradient(circle at 50% 48%,",
            "  rgba(110,35,230,0.70) 0%,",
            "  rgba(85,20,200,0.40) 18%,",
            "  rgba(60,12,160,0.22) 35%,",
            "  rgba(40,6,110,0.10) 52%,",
            "  rgba(20,3,70,0.04) 68%,",
            "  transparent 80%)",
          ].join(""),
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-i4u-3d.png"
          alt="Inspire4U"
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(60vw, 320px)",
            height: "min(60vw, 320px)",
            objectFit: "contain",
            display: "block",
            filter: [
              "drop-shadow(0 0 16px rgba(200,160,255,1))",
              "drop-shadow(0 0 38px rgba(130,55,240,0.85))",
              "drop-shadow(0 0 80px rgba(90,20,190,0.60))",
              "drop-shadow(0 0 120px rgba(75,0,130,0.35))",
              "drop-shadow(0 20px 40px rgba(0,0,0,0.70))",
            ].join(" "),
            animation: "logo-breathe 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* HEADLINE + DECORADORES NA MESMA LINHA */}
      <div
        ref={headRef}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1100px",
          padding: "0 40px",
          marginBottom: "18px",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Decorador esquerdo */}
        <div aria-hidden="true" style={{
          display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
        }}>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.60)", lineHeight: 1 }}>✦</span>
          <div style={{
            width: "min(7vw, 72px)", height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0.50), transparent)",
          }} />
        </div>

        <h1
          id="hero-title"
          style={{
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            fontSize: "clamp(2rem, 4.5vw, 4.8rem)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            fontStyle: "normal",
            color: "rgba(255,255,255,0.92)",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          <span style={{ position: "relative", display: "inline" }}>
            <span style={{
              color: "transparent",
              background: [
                "linear-gradient(",
                "  90deg,",
                "  rgba(180,130,255,0.85) 0%,",
                "  rgba(180,130,255,0.85) 40%,",
                "  rgba(240,230,255,1.00) 50%,",
                "  rgba(180,130,255,0.85) 60%,",
                "  rgba(180,130,255,0.85) 100%",
                ")",
              ].join(""),
              backgroundSize: "250% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "text-sheen 6s ease-in-out infinite",
              fontFamily: "var(--font-accent, 'Bodoni Moda', serif)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}>
              Inspiramos
            </span>
            <LensFlare />
          </span>{" "}
          <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.88)" }}>a nova geração de líderes.</span>
        </h1>

        {/* Decorador direito */}
        <div aria-hidden="true" style={{
          display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
        }}>
          <div style={{
            width: "min(7vw, 72px)", height: "1px",
            background: "linear-gradient(to left, rgba(255,255,255,0.50), transparent)",
          }} />
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.60)", lineHeight: 1 }}>✦</span>
        </div>
      </div>

      {/* Subtítulo */}
      <p
        ref={subRef}
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily: "var(--font-body,'DM Sans',sans-serif)",
          fontSize: "clamp(0.85rem, 1.3vw, 0.975rem)",
          fontWeight: 400,
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.50)",
          maxWidth: "420px",
          textAlign: "center",
          margin: "0 auto 36px",
          padding: "0 24px",
          opacity: 0,
        }}
      >
        Para as fintechs que estão construindo o futuro, nós trazemos a estrutura. Governança Corporativa que não limita, mas impulsiona o crescimento com integridade e visão global.
      </p>

      {/* CTAs */}
      <div
        ref={ctasRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          justifyContent: "center",
          padding: "0 24px",
          opacity: 0,
        }}
      >
        <HeroPill href="#vocacao" primary>
          Descubra como →
        </HeroPill>
      </div>

      {/* Ambient light flares */}
      {([
        ["12%", "22%", "3px", "rgba(200,160,255,0.55)", "6px"],
        ["28%", "78%", "2px", "rgba(255,255,255,0.45)", "4px"],
        ["68%", "15%", "2px", "rgba(180,120,255,0.40)", "5px"],
        ["72%", "82%", "3px", "rgba(255,255,255,0.35)", "4px"],
        ["45%", "92%", "2px", "rgba(200,160,255,0.38)", "5px"],
        ["15%", "62%", "2px", "rgba(255,255,255,0.30)", "3px"],
        ["82%", "48%", "2px", "rgba(180,130,255,0.35)", "5px"],
      ] as [string, string, string, string, string][]).map(([top, left, size, color, blur], i) => (
        <div
          key={`flare-${i}`}
          aria-hidden="true"
          style={{
            position: "absolute",
            top, left,
            width: size, height: size,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 ${blur} ${color}`,
            animation: `blink ${3.5 + i * 0.6}s ease-in-out infinite ${i * 0.4}s`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      ))}
    </section>
  )
}

/* ─── MARQUEE ────────────────────────────────────────────────────────── */
function MarqueeSection() {
  const items = ["Governança Corporativa", "Compliance Fintech", "Athena7", "Gestão de Riscos", "ESG", "Cultura Organizacional", "Regulatório", "Due Diligence", "Conselho de Administração", "LGPD"]
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--b1)", borderBottom: "1px solid var(--b1)", padding: "1rem 0", background: "var(--b0)" }}>
      <div
        data-marquee=""
        style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", whiteSpace: "nowrap" }}>
            <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "var(--v5)", flexShrink: 0 }} />
            <span style={{ ...S.label, color: "var(--t3)" }}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── VOCAÇÃO ────────────────────────────────────────────────────────── */
function VocacaoSection() {
  const rows = [
    { number: "01", icon: "⚖️", title: "Governança Estratégica", desc: "Estruturamos conselhos e comitês alinhados às melhores práticas internacionais, adaptadas à realidade da fintech brasileira." },
    { number: "02", icon: "🛡️", title: "Compliance & Regulatório", desc: "Navegamos o ecossistema regulatório do Banco Central, CVM e BACEN com expertise e eficiência." },
    { number: "03", icon: "🌱", title: "Cultura Organizacional", desc: "Transformamos governança em cultura — onde cada colaborador é agente ativo da conformidade e ética." },
    { number: "04", icon: "📊", title: "Gestão de Riscos", desc: "Framework proprietário Athena7 para identificação, mensuração e mitigação de riscos corporativos." },
    { number: "05", icon: "🌐", title: "Expansão Internacional", desc: "Suporte especializado para fintechs com operações ou planos de expansão para o mercado europeu." },
    { number: "06", icon: "🤝", title: "Advisory Board", desc: "Construção e curadoria de conselhos consultivos com perfis complementares e rede de conexões estratégicas." },
  ]
  return (
    <section id="vocacao" style={{ position: "relative", padding: "7rem 1.5rem 7rem 3rem", overflow: "hidden" }}>
      <SectionNumber n="01" />
      <VerticalLabel text="Nossa Vocação" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal style={{ marginBottom: "1rem" }}>
          <span style={S.eyebrow}>Nossa Vocação</span>
        </div>
        <StaircaseHeadline
          lines={["No universo das fintechs,", "agilidade é tudo.", "E confiança é a base de tudo."]}
          accentLine={1}
          accentStyle="violet"
        />
        <p data-reveal style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--t2)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "3rem" }}>
          Sabemos que a velocidade da inovação não pode ser freada por burocracias complexas. Por isso, a Inspire4U reinventou a Governança Corporativa. Não a vemos como um conjunto de regras, mas como a arquitetura inteligente que permite que sua empresa cresça de forma sustentável, segura e preparada para qualquer desafio. Da startup promissora à líder de mercado, nós construímos a ponte para o seu próximo nível.
        </p>
        <div data-ledger-list="">
          {rows.map((r, i) => (
            <LedgerRow key={i} {...r} delay={String(i * 60)} />
          ))}
          <div style={{ borderTop: "1px solid var(--b1)" }} />
        </div>
        <div data-reveal style={{ marginTop: "3rem" }}>
          <FloodCTA href="/#contato" variant="violet">Agendar Conversa</FloodCTA>
        </div>
      </div>
    </section>
  )
}

/* ─── ATHENA7 ────────────────────────────────────────────────────────── */
function Athena7Section() {
  const cells: { icon: string; tag: string; tagColor: "violet" | "amber"; title: string; desc: string; wide?: boolean }[] = [
    { icon: "🏛️", tag: "Fundação", tagColor: "violet", title: "Propósito & Valores", desc: "Fundação ética e propósito claro que guiam todas as decisões organizacionais. A espinha dorsal da governança duradoura.", wide: true },
    { icon: "⚙️", tag: "Estrutura", tagColor: "violet", title: "Estrutura & Papéis", desc: "Definição cristalina de responsabilidades, autoridade e fluxos de decisão." },
    { icon: "🔐", tag: "Controles", tagColor: "amber", title: "Processos & Controles", desc: "Sistemas robustos que garantem conformidade sem engessar a inovação." },
    { icon: "📊", tag: "Dados", tagColor: "amber", title: "Transparência & Dados", desc: "Relatórios e dashboards que transformam governança em inteligência de negócio. Visibilidade total para decisões certeiras.", wide: true },
    { icon: "🌱", tag: "Cultura", tagColor: "violet", title: "Cultura & Engajamento", desc: "Programas que tornam compliance parte do DNA organizacional." },
    { icon: "⚠️", tag: "Riscos", tagColor: "amber", title: "Risco & Resiliência", desc: "Identificação proativa e gestão dinâmica de riscos estratégicos e operacionais." },
    { icon: "🚀", tag: "Evolução", tagColor: "violet", title: "Inovação & Evolução", desc: "Governança adaptativa que cresce com a organização e antecipa mudanças regulatórias. O futuro já tem estrutura.", wide: true },
  ]

  return (
    <section id="athena7" style={{ position: "relative", padding: "7rem 1.5rem 7rem 3rem", background: "linear-gradient(180deg, transparent 0%, var(--bg2) 30%, var(--bg2) 70%, transparent 100%)", overflow: "hidden" }}>
      <SectionNumber n="02" />
      <VerticalLabel text="Athena7" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal style={{ marginBottom: "1rem" }}>
          <span style={S.eyebrowAmber}>Framework Proprietário</span>
        </div>
        <StaircaseHeadline
          lines={["Coragem para falar.", "Segurança para escutar."]}
          accentLine={1}
          accentStyle="aurora"
        />
        <p data-reveal style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--t2)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "3rem" }}>
          Com orgulho, apresentamos a Athena7: a primeira plataforma global de Canal de Denúncias criada por e para mulheres. Em um ambiente onde a segurança psicológica é inegociável, a Athena7 oferece uma voz segura e anônima, garantindo que a integridade e o respeito sejam a base da cultura da sua empresa. Porque um ambiente de trabalho justo não é um diferencial, é o único caminho.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "3rem",
          }}
        >
          {cells.map((c, i) => (
            <GlassCard
              key={i}
              icon={c.icon}
              tag={c.tag}
              tagColor={c.tagColor}
              title={c.title}
              desc={c.desc}
              delay={String(i * 80)}
              wide={c.wide}
            />
          ))}
        </div>

        <div data-reveal>
          <FloodCTA href="/athena7" variant="amber">Conheça a plataforma Athena7</FloodCTA>
        </div>
      </div>
    </section>
  )
}

/* ─── BRIDGE (GLOBE) ─────────────────────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    if (!ctx) return
    const W = 400, H = 400, R = 160
    canvas.width = W; canvas.height = H
    let rot = 0
    let raf: number
    function project(lat: number, lng: number, rotY: number) {
      const phi = (90 - lat) * Math.PI / 180
      const theta = (lng + rotY) * Math.PI / 180
      const x = R * Math.sin(phi) * Math.cos(theta)
      const y = R * Math.cos(phi)
      const z = R * Math.sin(phi) * Math.sin(theta)
      return { x: W / 2 + x, y: H / 2 - y, z }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.beginPath()
      ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(139,53,212,0.3)"
      ctx.lineWidth = 1
      ctx.stroke()
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let first = true
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = project(lat, lng, rot)
          if (p.z < 0) { first = true; continue }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          first = false
        }
        ctx.strokeStyle = "rgba(168,85,247,0.18)"
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath()
        let first = true
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = project(lat, lng, rot)
          if (p.z < 0) { first = true; continue }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
          first = false
        }
        ctx.strokeStyle = "rgba(168,85,247,0.18)"
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
      const sp = project(-23.5, -46.6, rot)
      if (sp.z > 0) {
        ctx.beginPath(); ctx.arc(sp.x, sp.y, 5, 0, Math.PI * 2); ctx.fillStyle = "#A855F7"; ctx.fill()
        ctx.beginPath(); ctx.arc(sp.x, sp.y, 9, 0, Math.PI * 2); ctx.strokeStyle = "rgba(168,85,247,0.4)"; ctx.lineWidth = 1; ctx.stroke()
      }
      const db = project(53.3, -6.3, rot)
      if (db.z > 0) {
        ctx.beginPath(); ctx.arc(db.x, db.y, 5, 0, Math.PI * 2); ctx.fillStyle = "#22D3EE"; ctx.fill()
        ctx.beginPath(); ctx.arc(db.x, db.y, 9, 0, Math.PI * 2); ctx.strokeStyle = "rgba(34,211,238,0.4)"; ctx.lineWidth = 1; ctx.stroke()
      }
      if (sp.z > 0 && db.z > 0) {
        const mx = (sp.x + db.x) / 2, my = (sp.y + db.y) / 2 - 80
        ctx.beginPath(); ctx.moveTo(sp.x, sp.y); ctx.quadraticCurveTo(mx, my, db.x, db.y)
        ctx.strokeStyle = "rgba(168,85,247,0.5)"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([])
        const t = (Date.now() % 3000) / 3000
        const bx = (1-t)*(1-t)*sp.x + 2*(1-t)*t*mx + t*t*db.x
        const by = (1-t)*(1-t)*sp.y + 2*(1-t)*t*my + t*t*db.y
        ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fillStyle = "#DDB6FF"; ctx.fill()
      }
      rot += 0.12
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <CornerBrackets color="rgba(168,85,247,0.3)" />
      <canvas ref={canvasRef} style={{
        width: "100%", maxWidth: "400px", height: "auto",
        filter: "drop-shadow(0 0 40px rgba(139,53,212,0.4))",
        boxShadow: "0 0 0 1px rgba(168,85,247,0.15), 0 0 60px rgba(107,16,184,0.20), 0 0 120px rgba(75,0,130,0.10)",
      }} />
    </div>
  )
}

function BridgeSection() {
  return (
    <section id="conexoes" style={{ position: "relative", padding: "7rem 1.5rem 7rem 3rem", overflow: "hidden" }}>
      <SectionNumber n="03" />
      <VerticalLabel text="Presença Global" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal style={{ marginBottom: "1rem" }}>
          <span style={S.eyebrow}>Presença Global</span>
        </div>
        <StaircaseHeadline
          lines={["Conectamos mentes,", "criamos oportunidades."]}
          accentLine={1}
          accentStyle="gold"
        />
        <p data-reveal style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--t2)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "3rem" }}>
          O futuro das finanças é colaborativo e sem fronteiras. A Inspire4U é o elo estratégico entre o ecossistema de fintechs do Brasil e da Irlanda, dois polos de inovação pulsantes. Fomentamos parcerias, promovemos pesquisas e abrimos portas para negócios que nascem da troca de conhecimento e da visão compartilhada de um mercado financeiro mais conectado e eficiente.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "center" }}>
            <GlobeCanvas />
          </div>

          <div data-reveal data-delay="150">
            {[
              { flag: "🇧🇷", city: "São Paulo", country: "Brasil", desc: "Hub para o mercado brasileiro e América Latina. Centro de inovação e regulatório BACEN.", color: "var(--v5)" },
              { flag: "🇮🇪", city: "Dublin", country: "Irlanda", desc: "Gateway para o ecossistema europeu e regulatório EU. Acesso direto ao mercado do Atlântico Norte.", color: "var(--cyan)" },
            ].map(card => (
              <div
                key={card.city}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "1.25rem",
                  padding: "1.5rem 0",
                  borderTop: "1px solid var(--b1)",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem" }}>{card.flag}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--t0)" }}>{card.city}</h3>
                    <span style={{ ...S.label, color: card.color }}>{card.country}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.825rem", color: "var(--t3)", lineHeight: 1.55 }}>{card.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--b1)" }} />

            <div style={{ marginTop: "2rem" }}>
              <FloodCTA href="/conexoes" variant="ghost">Explore as conexões</FloodCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ────────────────────────────────────────────────────────── */
function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contato" style={{ padding: "7rem 1.5rem", background: "linear-gradient(180deg, transparent 0%, var(--bg3) 30%, var(--bg3) 70%, transparent 100%)" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div data-reveal style={{ marginBottom: "3rem" }}>
          <span style={{ ...S.eyebrow, display: "block", marginBottom: "1rem" }}>Fale Conosco</span>
          <StaircaseHeadline
            lines={["Vamos inspirar", "o futuro, juntos?"]}
            accentLine={1}
            accentStyle="violet"
          />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--t2)", lineHeight: 1.7 }}>
            Seja para estruturar sua governança, implementar a Athena7 ou explorar conexões internacionais, nossa equipe está pronta para entender seu desafio.
          </p>
        </div>

        <div
          data-reveal
          data-delay="100"
          style={{
            padding: "2.5rem",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--t0)", marginBottom: "0.75rem" }}>Mensagem Enviada!</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--t2)", lineHeight: 1.6 }}>Entraremos em contato em até 24 horas úteis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <FloatField label="Nome" required />
                <FloatField label="Empresa" required />
              </div>
              <FloatField label="E-mail" type="email" required />
              <FloatField label="Mensagem" textarea required />

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 28px",
                  borderRadius: "14px",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-body)",
                  color: hovered && !loading ? "#fff" : "var(--v6)",
                  border: "1px solid rgba(168,85,247,0.30)",
                  borderTop: "1px solid rgba(168,85,247,0.50)",
                  background: "rgba(75,0,130,0.12)",
                  backdropFilter: "blur(16px)",
                  cursor: loading ? "not-allowed" : "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: hovered && !loading
                    ? "0 0 30px rgba(107,16,184,0.50), 0 0 80px rgba(75,0,130,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(168,85,247,0.10)",
                  transform: hovered && !loading ? "translateY(-2px)" : "translateY(0)",
                  transition: "color 0.35s, box-shadow 0.35s, transform 0.35s",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg,rgba(107,16,184,0.95),rgba(75,0,130,0.98))",
                    clipPath: hovered && !loading ? "inset(0 0% 0 0 round 14px)" : "inset(0 100% 0 0 round 14px)",
                    transition: "clip-path 0.45s cubic-bezier(0.16,1,0.3,1)",
                    zIndex: 0,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {loading ? "Enviando..." : "Agendar Conversa"}
                </span>
                {!loading && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      transform: hovered ? "translateX(3px)" : "translateX(0)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    →
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── INVESTORS ──────────────────────────────────────────────────────── */
function InvestorsSection() {
  const thesis = [
    { number: "01", title: "Base Sólida", desc: "Governança como fundação para crescimento escalável e captação de capital com credibilidade institucional." },
    { number: "02", title: "Athena7 como Ativo", desc: "Framework proprietário que se torna diferencial competitivo tangível no portfólio das fintechs assessoradas." },
    { number: "03", title: "Brasil · Irlanda", desc: "Posicionamento único nos dois mercados de fintech de maior crescimento: Brasil e ecossistema europeu via Dublin." },
  ]
  return (
    <section id="investidores" style={{ position: "relative", padding: "7rem 1.5rem 7rem 3rem", overflow: "hidden" }}>
      <SectionNumber n="04" />
      <VerticalLabel text="Investidores" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal style={{ marginBottom: "1rem" }}>
          <span style={S.eyebrowAmber}>Relação com Investidores</span>
        </div>
        <StaircaseHeadline
          lines={["Seja parte da vanguarda.", "Invista na inspiração."]}
          accentLine={1}
          accentStyle="gold"
        />
        <p data-reveal style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--t2)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "3rem" }}>
          A Inspire4U não está apenas prestando consultoria; estamos construindo um ecossistema. Um ecossistema baseado em governança sólida, inovação sem fronteiras e ambientes de trabalho mais justos. Buscamos investidores e empresas parceiras que não apenas procurem um retorno financeiro, mas que queiram liderar a transformação no mercado de fintechs. Se você acredita em crescimento com propósito, seu lugar é aqui.
        </p>

        <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderTop: "1px solid var(--b1)", borderBottom: "1px solid var(--b1)", marginBottom: "3rem", padding: "2rem 0" }}>
          {[
            { value: "R$ 280M+", label: "Pipeline de Projetos" },
            { value: "47", label: "Fintechs em Portfólio" },
            { value: "4", label: "Países de Operação" },
            { value: "94", label: "NPS Médio" },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 1.5rem", borderRight: i < 3 ? "1px solid var(--b1)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", ...S.gradGold, marginBottom: "0.5rem" }}>
                {m.value}
              </div>
              <div style={{ ...S.label, color: "var(--t4)" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div data-ledger-list="">
          {thesis.map((t, i) => (
            <LedgerRow key={i} number={t.number} title={t.title} desc={t.desc} delay={String(i * 80)} />
          ))}
          <div style={{ borderTop: "1px solid var(--b1)" }} />
        </div>

        <div data-reveal data-delay="100" style={{ marginTop: "4rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--t0)", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Junte-se a nós
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--t2)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "52ch" }}>
            Preencha o formulário abaixo e nossa equipe de desenvolvimento de negócios entrará em contato para explorar sinergias.
          </p>
          <InvestorForm />
        </div>
      </div>
    </section>
  )
}

/* ─── INVESTOR FORM ─────────────────────────────────────────────────── */
function InvestorForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [interesse, setInteresse] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--t0)", marginBottom: "0.75rem" }}>Interesse Enviado!</h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--t2)", lineHeight: 1.6 }}>Nossa equipe entrará em contato em breve.</p>
      </div>
    )
  }

  return (
    <div style={{
      padding: "2.5rem",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderTop: "1px solid rgba(255,255,255,0.18)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <FloatField label="Nome Completo" required />
        <FloatField label="Empresa / Fundo de Investimento" required />
        <FloatField label="E-mail Corporativo" type="email" required />

        {/* Tipo de Interesse */}
        <div style={{
          position: "relative",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderTop: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <label style={{
            position: "absolute",
            left: "1rem",
            top: interesse ? "0.45rem" : "1rem",
            fontSize: interesse ? "0.65rem" : "0.9rem",
            color: interesse ? "var(--v5)" : "var(--t3)",
            pointerEvents: "none",
            transition: "all 0.2s",
            fontFamily: "var(--font-body)",
          }}>
            Tipo de Interesse *
          </label>
          <select
            required
            value={interesse}
            onChange={e => setInteresse(e.target.value)}
            style={{
              width: "100%",
              padding: "1.25rem 1rem 0.5rem",
              background: "transparent",
              border: "none",
              borderRadius: "14px",
              color: interesse ? "var(--t1)" : "transparent",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="" disabled></option>
            <option value="investimento" style={{ background: "var(--bg2)", color: "var(--t1)" }}>Investimento Estratégico</option>
            <option value="parceria" style={{ background: "var(--bg2)", color: "var(--t1)" }}>Parceria de Negócios</option>
            <option value="ma" style={{ background: "var(--bg2)", color: "var(--t1)" }}>{"Fusão ou Aquisição (M&A)"}</option>
            <option value="outro" style={{ background: "var(--bg2)", color: "var(--t1)" }}>Outro</option>
          </select>
          <div aria-hidden="true" style={{
            position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
            pointerEvents: "none", color: "var(--t3)", fontSize: "0.7rem",
          }}>▼</div>
        </div>

        <FloatField label="Mensagem (Opcional)" textarea />

        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px 28px",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: "0.9375rem",
            fontFamily: "var(--font-body)",
            color: hovered && !loading ? "#0A0510" : "var(--amber2)",
            border: "1px solid rgba(245,158,11,0.28)",
            borderTop: "1px solid rgba(245,158,11,0.45)",
            background: "rgba(212,144,10,0.08)",
            backdropFilter: "blur(16px)",
            cursor: loading ? "not-allowed" : "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow: hovered && !loading
              ? "0 0 30px rgba(212,144,10,0.45), 0 0 60px rgba(245,158,11,0.20), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,158,11,0.08)",
            transform: hovered && !loading ? "translateY(-2px)" : "translateY(0)",
            transition: "color 0.35s, box-shadow 0.35s, transform 0.35s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg,rgba(245,158,11,0.95),rgba(212,144,10,0.98))",
              clipPath: hovered && !loading ? "inset(0 0% 0 0 round 14px)" : "inset(0 100% 0 0 round 14px)",
              transition: "clip-path 0.45s cubic-bezier(0.16,1,0.3,1)",
              zIndex: 0,
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>
            {loading ? "Enviando..." : "Enviar Interesse"}
          </span>
          {!loading && (
            <span
              aria-hidden="true"
              style={{
                position: "relative",
                zIndex: 1,
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              →
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear()

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("#") || href?.startsWith("/#")) {
      e.preventDefault()
      const id = href.replace("/", "")
      const el = document.querySelector(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const cols = {
    "Empresa": [
      { href: "#vocacao", label: "Nossa Vocação" },
      { href: "#athena7", label: "Athena7" },
      { href: "#conexoes", label: "Conexões" },
    ],
    "Investidores": [
      { href: "#investidores", label: "Relação com Investidores" },
    ],
  }
  return (
    <footer style={{ position: "relative", background: "var(--bg0)", overflow: "hidden" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,53,212,0.6) 30%, rgba(139,53,212,0.6) 70%, transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse at 50% 100%, rgba(75,0,130,0.15) 0%, transparent 70%)", pointerEvents: "none" }} aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "80rem", margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1rem", textDecoration: "none" }}>
              <Image
                src="/images/logo-inspire4u.png"
                alt="Inspire4U"
                width={130}
                height={32}
                style={{ height: "2rem", width: "auto", objectFit: "contain" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const next = e.currentTarget.nextElementSibling as HTMLElement
                  if (next) next.style.display = "block"
                }}
              />
              <span style={{ display: "none", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1.25rem" }}>Inspire4U</span>
            </Link>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--t4)", lineHeight: 1.6, maxWidth: "24ch" }}>
              Governança que inspira.<br />Inovação que transforma.
            </p>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", background: "#34d399", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ ...S.label, color: "var(--t4)" }}>Dublin · São Paulo</span>
            </div>
          </div>
          {Object.entries(cols).map(([cat, links]) => (
            <div key={cat}>
              <p style={{ ...S.label, color: "var(--t4)", marginBottom: "1rem" }}>{cat}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={smoothScroll}
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--t4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--t2)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--t4)"}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--b0)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <p style={{ ...S.label, color: "var(--t4)", fontSize: "0.625rem" }}>© {year} Inspire4U. Todos os direitos reservados.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "rgba(90,72,120,0.5)", letterSpacing: "0.04em" }}>
            Made by <span itemProp="creator">Bernardo Iannini</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── REVEAL + LAYOUT CSS ────────────────────────────────────────────── */
const pageCss = `
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
[data-ledger-row] {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  [data-ledger-row] { opacity: 1 !important; }
}
.hdr-pill-nav { display: flex; }
.hdr-pill-sep { display: inline-flex; }
.hdr-burger { display: none; }
.vertical-label { display: block; }
@media (max-width: 860px) {
  .hdr-pill-nav { display: none !important; }
  .hdr-pill-sep { display: none !important; }
  .hdr-burger { display: flex !important; }
}
@media (max-width: 1199px) {
  .vertical-label { display: none !important; }
}
`

/* ─── PAGE ───────────────────────────────────────────────────────────── */
export default function Page() {
  useReveal()
  useGSAPReveal()

  useEffect(() => {
    if (document.getElementById("page-css")) return
    const style = document.createElement("style")
    style.id = "page-css"
    style.textContent = pageCss
    document.head.appendChild(style)
  }, [])

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <VocacaoSection />
        <BlackHoleSection />
        <Athena7Section />
        <BridgeSection />
        <ContactSection />
        <InvestorsSection />
      </main>
      <Footer />
    </>
  )
}
