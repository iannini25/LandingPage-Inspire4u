const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 98.6) % 100,
  size: i % 3 === 0 ? 2.5 : i % 5 === 0 ? 1.5 : 1,
  opacity: 0.15 + (i % 7) * 0.08,
  delay: (i % 10) * 0.3,
  duration: 2 + (i % 5) * 0.6,
}))

export function HeroStarfield() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {STARS.map((star) => (
        <div
          key={star.id}
          className="hero-star absolute rounded-full bg-[var(--v6)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `float-slow ${star.duration + 2}s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
