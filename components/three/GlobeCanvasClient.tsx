"use client"
import dynamic from "next/dynamic"

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-[480px] rounded-2xl flex items-center justify-center"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--b1)" }}
    >
      <div className="w-32 h-32 rounded-full border border-[var(--bv)] animate-pulse" />
    </div>
  ),
})

export function GlobeCanvasClient() {
  return <GlobeCanvas />
}
