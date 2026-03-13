"use client"
import { useState, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/cn"

interface FloatingFieldProps {
  name: string
  label: string
  type?: "text" | "email" | "tel" | "textarea"
  error?: string
  className?: string
}

export function FloatingField({ name, label, type = "text", error, className }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false)
  const [filled, setFilled]   = useState(false)
  const fieldRef = useRef<HTMLDivElement>(null)
  const isFloat  = focused || filled

  const handleFocus = () => {
    setFocused(true)
    gsap.to(fieldRef.current, {
      borderColor: "rgba(168,85,247,0.55)",
      boxShadow: "0 0 0 3px rgba(168,85,247,0.12)",
      duration: 0.3,
    })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false)
    setFilled(e.target.value.length > 0)
    gsap.to(fieldRef.current, {
      borderColor: error ? "rgba(245,158,11,0.50)" : "var(--b1)",
      boxShadow: "none",
      duration: 0.3,
    })
  }

  const Tag = type === "textarea" ? "textarea" : "input"

  return (
    <div className={cn("relative", className)}>
      <div
        ref={fieldRef}
        className="relative rounded-xl transition-colors duration-200"
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${error ? "rgba(245,158,11,0.40)" : "var(--b1)"}`,
        }}
      >
        <label
          htmlFor={name}
          className={cn(
            "absolute left-4 pointer-events-none transition-all duration-200 origin-left",
            isFloat
              ? "top-2 text-[0.68rem] text-[var(--v5)]"
              : type === "textarea"
                ? "top-4 text-sm text-[var(--t4)]"
                : "top-1/2 -translate-y-1/2 text-sm text-[var(--t4)]"
          )}
        >
          {label}
        </label>
        <Tag
          id={name}
          name={name}
          type={type !== "textarea" ? type : undefined}
          rows={type === "textarea" ? 5 : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setFilled(e.target.value.length > 0)}
          className={cn(
            "w-full bg-transparent outline-none resize-none",
            "text-[var(--t1)] text-sm",
            "px-4 pb-3",
            type === "textarea" ? "pt-7" : "pt-6"
          )}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: "var(--amber-br)" }}>{error}</p>
      )}
    </div>
  )
}
