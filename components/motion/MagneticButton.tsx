"use client"
import { useRef, useCallback } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/cn"

export function MagneticButton({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width  / 2
    const y = e.clientY - rect.top  - rect.height / 2
    gsap.to(el,              { x: x * strength,        y: y * strength,       duration: 0.45, ease: "power3.out" })
    gsap.to(contentRef.current, { x: x * strength * 0.35, y: y * strength * 0.35, duration: 0.45, ease: "power3.out" })
  }, [strength])

  const onLeave = useCallback(() => {
    gsap.to([wrapRef.current, contentRef.current], {
      x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.38)"
    })
  }, [])

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
