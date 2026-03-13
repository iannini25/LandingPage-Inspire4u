export function HeroBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="hero-blob hero-blob-1 absolute"
        style={{
          width: "65vw", height: "65vw",
          maxWidth: "800px", maxHeight: "800px",
          top: "-15%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle at 40% 40%, rgba(107,16,184,0.75) 0%, rgba(75,0,130,0.45) 40%, transparent 70%)",
          filter: "blur(60px)",
          borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
          animation: "morph-blob 12s ease-in-out infinite, glow-pulse 4s ease-in-out infinite",
          willChange: "transform, border-radius",
        }}
      />
      <div
        className="hero-blob hero-blob-2 absolute"
        style={{
          width: "45vw", height: "45vw",
          maxWidth: "550px", maxHeight: "550px",
          top: "10%", left: "-8%",
          background: "radial-gradient(circle at 60% 50%, rgba(139,53,212,0.50) 0%, rgba(75,0,130,0.25) 50%, transparent 70%)",
          filter: "blur(55px)",
          borderRadius: "30% 70% 40% 60% / 60% 30% 70% 40%",
          animation: "morph-blob 16s ease-in-out infinite reverse, glow-pulse 5s ease-in-out infinite 1s",
          willChange: "transform, border-radius",
        }}
      />
      <div
        className="hero-blob hero-blob-3 absolute"
        style={{
          width: "40vw", height: "40vw",
          maxWidth: "480px", maxHeight: "480px",
          top: "5%", right: "-5%",
          background: "radial-gradient(circle at 35% 55%, rgba(168,85,247,0.45) 0%, rgba(107,16,184,0.20) 50%, transparent 70%)",
          filter: "blur(50px)",
          borderRadius: "70% 30% 50% 50% / 30% 70% 50% 50%",
          animation: "morph-blob 14s ease-in-out infinite 3s, glow-pulse 6s ease-in-out infinite 2s",
          willChange: "transform, border-radius",
        }}
      />
      <div
        className="hero-blob absolute"
        style={{
          width: "25vw", height: "25vw",
          maxWidth: "280px", maxHeight: "280px",
          bottom: "20%", right: "-3%",
          background: "radial-gradient(circle, rgba(212,144,10,0.20) 0%, transparent 70%)",
          filter: "blur(45px)",
          animation: "float-b 8s ease-in-out infinite",
        }}
      />
    </div>
  )
}
