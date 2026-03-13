"use client"
import { useRef, useEffect } from "react"

const NODE_COUNT   = 75
const CONNECT_DIST = 130

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let W = canvas.offsetWidth || 800
    let H = canvas.offsetHeight || 450

    const setSize = () => {
      W = canvas.offsetWidth || 800
      H = canvas.offsetHeight || 450
      canvas.width  = W
      canvas.height = H
    }
    setSize()

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(75,0,130,${((1 - dist / CONNECT_DIST) * 0.3).toFixed(3)})`
            ctx.lineWidth   = 1
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(168,85,247,0.65)"
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => { setSize() }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", background: "transparent", display: "block" }}
    />
  )
}
