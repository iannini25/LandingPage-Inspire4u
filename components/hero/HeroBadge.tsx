export function HeroBadge() {
  return (
    <div
      className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
      style={{
        background: "rgba(212,144,10,0.08)",
        border: "1px solid rgba(245,158,11,0.30)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span
        className="text-[0.5rem] text-[var(--amber-br)]"
        style={{ animation: "spin-cw 8s linear infinite", display: "inline-block" }}
        aria-hidden="true"
      >
        ✦
      </span>
      <span className="t-label text-[var(--amber-lt)] text-[0.6875rem]">
        Governança que inspira. Inovação que transforma.
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
    </div>
  )
}
