"use client"
import { useEffect, useRef } from "react"
import { createLenis } from "@/lib/lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<ReturnType<typeof createLenis> | null>(null)

  useEffect(() => {
    const lenis = createLenis()
    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const rafCb = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCb)
    }
  }, [])

  return <>{children}</>
}
