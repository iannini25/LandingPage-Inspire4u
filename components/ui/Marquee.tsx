const ITEMS = [
  "Governança Corporativa", "✦",
  "Canal de Denúncias", "✦",
  "Fintechs", "✦",
  "Brasil · Irlanda", "✦",
  "Athena7", "✦",
  "Inovação com Propósito", "✦",
  "Compliance Inteligente", "✦",
  "Segurança Psicológica", "✦",
  "Crescimento Sustentável", "✦",
]

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div
      className="overflow-hidden py-5"
      style={{
        borderTop: "1px solid var(--b0)",
        borderBottom: "1px solid var(--b0)",
        background: "var(--bg-base)",
      }}
      aria-hidden="true"
    >
      <div
        className="flex gap-8 w-max"
        style={{ animation: "marquee 30s linear infinite", willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === "✦"
                ? "text-[0.5rem] text-[var(--v5)] flex-shrink-0"
                : "t-label text-[var(--t5)] whitespace-nowrap flex-shrink-0"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
