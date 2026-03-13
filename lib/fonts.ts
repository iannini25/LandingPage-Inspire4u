import { Syne, DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"

export const fontDisplay = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  preload: true,
})

export const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
})

export { GeistMono }
