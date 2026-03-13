"use client"
import { useRef, useEffect } from "react"

// Orthographic projection of lat/lng onto a rotated globe
function project(lat: number, lng: number, rotY: number, R: number, cx: number, cy: number) {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180) + rotY
  const x = -R * Math.sin(phi) * Math.cos(theta)
  const y = -R * Math.cos(phi)
  const z =  R * Math.sin(phi) * Math.sin(theta)
  return { x: cx + x, y: cy + y, z }
}

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const SIZE = 480
    canvas.width  = SIZE
    canvas.height = SIZE
    const cx = SIZE / 2
    const cy = SIZE / 2
    const R  = 160

    let animId: number
    const t0 = performance.now()

    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000
      const rotY = elapsed * 0.06
      ctx.clearRect(0, 0, SIZE, SIZE)

      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R + 30)
      grd.addColorStop(0, "rgba(75,0,130,0.10)")
      grd.addColorStop(1, "rgba(75,0,130,0)")
      ctx.beginPath()
      ctx.arc(cx, cy, R + 30, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Globe dark fill
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(7,3,15,0.60)"
      ctx.fill()

      // Longitude lines (12 meridians)
      for (let i = 0; i < 12; i++) {
        const theta = (i / 12) * Math.PI + rotY
        const rx = Math.abs(Math.sin(theta)) * R
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx < 1 ? 1 : rx, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(75,0,130,0.14)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Latitude lines (5 parallels)
      const lats = [-60, -30, 0, 30, 60]
      for (const latDeg of lats) {
        const latRad = (latDeg * Math.PI) / 180
        const yCir   = cy - Math.sin(latRad) * R
        const rxCir  = Math.cos(latRad) * R
        ctx.beginPath()
        ctx.ellipse(cx, yCir, rxCir, rxCir * 0.13, 0, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(75,0,130,0.12)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Globe outline
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(139,53,212,0.30)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Brazil (-15, -47) and Ireland (53, -8)
      const bra = project(-15, -47, rotY, R, cx, cy)
      const ire = project( 53,   -8, rotY, R, cx, cy)

      // Quadratic bezier arc (lift control point outward)
      const mx   = (bra.x + ire.x) / 2
      const my   = (bra.y + ire.y) / 2
      const lift = R * 0.55
      const cpx  = mx
      const cpy  = my - lift

      ctx.beginPath()
      ctx.moveTo(bra.x, bra.y)
      ctx.quadraticCurveTo(cpx, cpy, ire.x, ire.y)
      ctx.strokeStyle = "rgba(139,53,212,0.55)"
      ctx.lineWidth   = 1.5
      ctx.stroke()

      // Animated particle along arc
      const tp = (elapsed * 0.2) % 1
      const px = (1 - tp) * (1 - tp) * bra.x + 2 * (1 - tp) * tp * cpx + tp * tp * ire.x
      const py = (1 - tp) * (1 - tp) * bra.y + 2 * (1 - tp) * tp * cpy + tp * tp * ire.y
      ctx.beginPath()
      ctx.arc(px, py, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = "#FCD34D"
      ctx.shadowBlur  = 10
      ctx.shadowColor = "#FCD34D"
      ctx.fill()
      ctx.shadowBlur = 0

      // Brazil dot
      const braAlpha = Math.max(0.15, Math.min(1, (bra.z / R) * 1.5 + 0.6))
      ctx.beginPath()
      ctx.arc(bra.x, bra.y, 5.5, 0, Math.PI * 2)
      ctx.fillStyle   = `rgba(168,85,247,${braAlpha.toFixed(2)})`
      ctx.shadowBlur  = 14
      ctx.shadowColor = "rgba(168,85,247,0.9)"
      ctx.fill()
      ctx.shadowBlur  = 0

      // Ireland dot
      const ireAlpha = Math.max(0.15, Math.min(1, (ire.z / R) * 1.5 + 0.6))
      ctx.beginPath()
      ctx.arc(ire.x, ire.y, 5.5, 0, Math.PI * 2)
      ctx.fillStyle   = `rgba(252,211,77,${ireAlpha.toFixed(2)})`
      ctx.shadowBlur  = 14
      ctx.shadowColor = "rgba(252,211,77,0.9)"
      ctx.fill()
      ctx.shadowBlur  = 0

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", maxWidth: 480, height: 480, background: "transparent", display: "block", margin: "0 auto" }}
    />
  )
}
