export function HeroMockup() {
  return (
    <div
      className="hero-mockup relative rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--b1)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.10), 0 0 80px rgba(75,0,130,0.15)",
      }}
    >
      {/* Browser titlebar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "var(--bg-deep)", borderColor: "var(--b1)" }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div
          className="flex-1 flex items-center justify-center mx-8 px-3 py-1 rounded-md"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--b1)" }}
        >
          <img
            src="/images/logo-athena7.png"
            alt="Athena7 Platform"
            style={{ height: "18px", width: "auto", objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none"
              const next = e.currentTarget.nextElementSibling as HTMLElement
              if (next) next.style.display = "block"
            }}
          />
          <span className="hidden t-label text-[var(--v5)] text-[0.65rem]" aria-hidden="true">
            athena7.platform
          </span>
        </div>
      </div>

      {/* Mockup content */}
      <div className="grid grid-cols-3 gap-0 min-h-[200px] sm:min-h-[260px]">
        <div
          className="col-span-1 p-4 border-r flex flex-col gap-3"
          style={{ background: "var(--bg-deep)", borderColor: "var(--b1)" }}
        >
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--bg-glass-sm)", border: "1px solid var(--bv)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="t-label text-[0.55rem] text-emerald-400">Seguro · Ativo</span>
          </div>
          {["Denúncia #001", "Denúncia #002", "Denúncia #003"].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{
                background: i === 0 ? "var(--bg-glass-md)" : "transparent",
                border: `1px solid ${i === 0 ? "var(--bv)" : "transparent"}`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? "var(--v5)" : "var(--t5)" }} />
              <span className="t-label text-[0.55rem]" style={{ color: i === 0 ? "var(--t2)" : "var(--t4)" }}>{item}</span>
            </div>
          ))}
        </div>

        <div className="col-span-2 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="t-heading text-sm text-[var(--t1)]">Análise em andamento</span>
            <span
              className="px-2 py-0.5 rounded-full text-[0.55rem] font-medium"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              Anônima · Protegida
            </span>
          </div>
          <div className="relative">
            <div className="w-full h-1.5 rounded-full" style={{ background: "var(--b1)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: "68%",
                  background: "linear-gradient(90deg, var(--v3), var(--v5))",
                  boxShadow: "0 0 8px var(--glow-v4)",
                }}
              />
            </div>
          </div>
          <p className="t-body text-xs text-[var(--t3)]">Criptografia ativa · Identidade protegida em todas as etapas</p>
          <div className="grid grid-cols-3 gap-2 mt-auto">
            {["Anonimato Total", "Voz Segura", "Auditável"].map((f) => (
              <div key={f} className="p-2 rounded-lg text-center" style={{ background: "var(--bg-glass-xs)", border: "1px solid var(--b1)" }}>
                <span className="t-label text-[0.5rem] text-[var(--t3)] block">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(75,0,130,0.25) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
    </div>
  )
}
