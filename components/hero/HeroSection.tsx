"use client"
import { useRef } from "react"
import dynamic from "next/dynamic"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { HeroBlobs }       from "./HeroBlobs"
import { HeroStarfield }   from "./HeroStarfield"
import { HeroParticleArc } from "./HeroParticleArc"
import { HeroBadge }       from "./HeroBadge"
import { HeroHeadline }    from "./HeroHeadline"
import { HeroCTAs }        from "./HeroCTAs"
import { HeroStats }       from "./HeroStats"
import { HeroMockup }      from "./HeroMockup"

const NetworkCanvas = dynamic(() => import("@/components/three/NetworkCanvas"), {
  ssr: false,
  loading: () => null,
})

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      gsap.set("[data-hero]", { opacity: 1, y: 0, scale: 1, filter: "none" })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(".hero-blob",
      { scale: 0.3, opacity: 0, filter: "blur(80px)" },
      { scale: 1, opacity: 1, filter: "blur(60px)", duration: 2, stagger: 0.3, ease: "power2.out" },
      0
    )
    tl.fromTo(".hero-star",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, stagger: { amount: 1, from: "random" } },
      0.2
    )
    tl.fromTo(".hero-arc-particle",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, stagger: { each: 0.04, from: "center" }, ease: "back.out(1.5)" },
      0.5
    )
    tl.fromTo(".hero-badge",
      { y: -30, opacity: 0, scale: 0.8, filter: "blur(8px)" },
      { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" },
      1.0
    )
    tl.fromTo(".hero-line-1",
      { clipPath: "inset(0 100% 0 0)", x: -20 },
      { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.9, ease: "power3.inOut" },
      1.3
    )
    tl.fromTo(".hero-line-2",
      { clipPath: "inset(0 100% 0 0)", x: -20 },
      { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.9, ease: "power3.inOut" },
      1.5
    )
    tl.fromTo(".hero-accent-word",
      { opacity: 0, filter: "blur(16px)", scale: 0.95 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8 },
      1.65
    )
    tl.fromTo(".hero-subtitle",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.8
    )
    tl.fromTo(".hero-cta",
      { y: 20, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
      2.0
    )
    tl.fromTo(".hero-stat",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      2.25
    )
    tl.fromTo(".hero-mockup",
      { y: 60, opacity: 0, scale: 0.94, filter: "blur(12px)" },
      { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      2.4
    )

    gsap.to(".hero-blob-1", { y: -25, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1 })
    gsap.to(".hero-blob-2", { y: 20, x: -15, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 })
    gsap.to(".hero-blob-3", { y: 15, x: 12, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 })

    gsap.to(".hero-content-layer", {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    })
    gsap.to(".hero-blobs-layer", {
      y: 140,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain"
      style={{
        background: [
          "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(107,16,184,0.45) 0%, transparent 65%)",
          "radial-gradient(ellipse 40% 35% at 15% 80%, rgba(75,0,130,0.12) 0%, transparent 55%)",
          "radial-gradient(ellipse 35% 40% at 85% 75%, rgba(139,53,212,0.10) 0%, transparent 55%)",
          "var(--bg-void)",
        ].join(", "),
      }}
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <NetworkCanvas />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <HeroStarfield />
      </div>

      <div className="hero-blobs-layer absolute inset-0 z-[2] pointer-events-none">
        <HeroBlobs />
      </div>

      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center">
        <HeroParticleArc />
      </div>

      <div className="hero-content-layer relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl mx-auto pt-28 pb-8">
        <HeroBadge />
        <HeroHeadline />
        <p className="hero-subtitle t-lead text-[var(--t2)] max-w-[52ch] mt-6 mb-10">
          Para as fintechs que estão construindo o futuro, nós trazemos a estrutura.
          Governança Corporativa que não limita, mas impulsiona o crescimento com
          integridade e visão global.
        </p>
        <HeroCTAs />
        <HeroStats />
      </div>

      <div className="hero-mockup relative z-10 w-full max-w-4xl mx-auto px-6 -mt-4 pb-16">
        <HeroMockup />
      </div>
    </section>
  )
}
