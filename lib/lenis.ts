import Lenis from "lenis"

export function createLenis() {
  return new Lenis({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.6,
    infinite: false,
  })
}
