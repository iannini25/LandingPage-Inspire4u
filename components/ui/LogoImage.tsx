"use client"
import Image from "next/image"

interface LogoImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackText?: string
  style?: React.CSSProperties
}

export function LogoImage({ src, alt, width, height, className, fallbackText, style }: LogoImageProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onError={(e) => {
          e.currentTarget.style.display = "none"
          const next = e.currentTarget.nextElementSibling as HTMLElement
          if (next) next.style.display = "flex"
        }}
      />
      <span
        className="hidden items-center"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        aria-hidden="true"
      >
        {fallbackText ?? alt}
      </span>
    </span>
  )
}
