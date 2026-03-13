import type { Metadata } from "next"
import { Cormorant_Garamond, Bodoni_Moda, DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300","400","500"],
  style: ["normal","italic"],
  variable: "--font-display",
  display: "swap",
})

const fontAccent = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  style: ["normal","italic"],
  variable: "--font-accent",
  display: "swap",
})

const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Inspire4U — Governança que Inspira",
  description:
    "Consultoria premium de Governança Corporativa para fintechs. Criadores da Athena7.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontAccent.variable} ${fontBody.variable} ${GeistMono.variable}`}>
      <body>
{children}
      </body>
    </html>
  )
}
