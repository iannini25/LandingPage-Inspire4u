"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/cn"

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur"

interface RevealOnScrollProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) { gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, filter: "none" }); return }

    const from: gsap.TweenVars = { opacity: 0 }
    if (direction === "up")    { from.y = 48 }
    if (direction === "down")  { from.y = -48 }
    if (direction === "left")  { from.x = -48 }
    if (direction === "right") { from.x = 48 }
    if (direction === "scale") { from.scale = 0.86 }
    if (direction === "blur")  { from.filter = "blur(16px)"; from.scale = 0.97 }

    gsap.fromTo(el, from, {
      opacity: 1, y: 0, x: 0, scale: 1, filter: "none",
      duration, delay,
      ease: direction === "scale" || direction === "blur" ? "back.out(1.3)" : "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    })
  }, [])

  return <div ref={ref} className={cn("opacity-0", className)}>{children}</div>
}
