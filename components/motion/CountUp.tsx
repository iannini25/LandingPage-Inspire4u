"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className,
}: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) { el.textContent = `${prefix}${end}${suffix}`; return }

    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
          },
        })
      },
    })
  }, [end, suffix, prefix, duration])

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>
}
