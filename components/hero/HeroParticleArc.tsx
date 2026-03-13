const r = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 19) * Math.PI
  const radius = 260
  const x = r(Math.cos(angle) * radius)
  const y = r(-Math.sin(angle) * radius)
  const centerProximity = r(1 - Math.abs(i - 9.5) / 9.5)
  const size = r(6 + centerProximity * 12)
  const hue = centerProximity > 0.6 ? "violet" : centerProximity > 0.3 ? "mid" : "amber"
  const colors = {
    violet: { bg: "rgba(192,132,252,0.95)", shadow: "rgba(168,85,247,0.7)" },
    mid:    { bg: "rgba(139,53,212,0.85)",  shadow: "rgba(107,16,184,0.6)" },
    amber:  { bg: "rgba(245,158,11,0.70)",  shadow: "rgba(212,144,10,0.5)" },
  }
  return {
    id: i, x, y, size,
    color: colors[hue],
    delay: r(i * 0.06),
    centerProximity,
    shadow1: r(size * 1.5),
    shadow2: r(size * 3),
    duration: r(2 + centerProximity),
  }
})

export function HeroParticleArc() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top: "38%", left: "50%", transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="hero-arc-particle absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            transform: "translate(-50%, -50%)",
            background: p.color.bg,
            boxShadow: `0 0 ${p.shadow1}px ${p.color.shadow}, 0 0 ${p.shadow2}px ${p.color.shadow}40`,
            animation: `float-slow ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
      <svg
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        width="540" height="280"
        viewBox="-270 -280 540 280"
        fill="none"
      >
        <path
          d="M -260 0 A 260 260 0 0 1 260 0"
          stroke="rgba(168,85,247,0.12)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  )
}
