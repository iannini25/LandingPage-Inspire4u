"use client"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const year = new Date().getFullYear()

  const cols = {
    "Empresa": [
      { href: "/#vocacao", label: "Nossa Vocação" },
      { href: "/athena7", label: "Athena7" },
      { href: "/conexoes", label: "Conexões" },
    ],
    "Investidores": [
      { href: "/investidores", label: "Relação com Investidores" },
    ],
    "Legal": [
      { href: "#", label: "Política de Privacidade" },
      { href: "#", label: "Termos de Uso" },
      { href: "#", label: "LGPD" },
    ],
  }

  return (
    <footer className="relative bg-[var(--bg-void)] overflow-hidden">
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,53,212,0.6) 30%, rgba(139,53,212,0.6) 70%, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(75,0,130,0.15) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-inspire4u.png"
                alt="Inspire4U"
                width={130}
                height={32}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const next = e.currentTarget.nextElementSibling as HTMLElement
                  if (next) next.style.display = "block"
                }}
              />
              <span className="hidden font-bold text-white text-xl tracking-tight" aria-hidden="true">
                Inspire4U
              </span>
            </Link>
            <p className="t-body text-[var(--t4)] text-sm leading-relaxed max-w-[24ch]">
              Governança que inspira.<br />Inovação que transforma.
            </p>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="t-label text-[var(--t4)] text-[0.6rem]">Dublin · São Paulo</span>
            </div>
          </div>

          {Object.entries(cols).map(([cat, links]) => (
            <div key={cat}>
              <p className="t-eyebrow text-[var(--t4)] mb-4">{cat}</p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="t-body text-sm text-[var(--t4)] hover:text-[var(--t2)] transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[var(--b0)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="t-label text-[var(--t5)] text-[0.625rem]">
            © {year} Inspire4U. Todos os direitos reservados.
          </p>
          <p className="t-label text-[var(--t5)] text-[0.625rem]">
            Feito com propósito ◈
          </p>
        </div>
      </div>
    </footer>
  )
}
