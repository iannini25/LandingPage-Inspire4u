"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)
  gsap.defaults({ ease: "power3.out", duration: 0.9 })

  ScrollTrigger.defaults({
    toggleActions: "play none none none",
    once: true,
  })
}

export { gsap, ScrollTrigger, MotionPathPlugin, TextPlugin }
