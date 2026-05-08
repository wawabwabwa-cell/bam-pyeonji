import { useMemo } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.15 + Math.random() * 0.5,
            animationName: 'twinkle',
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
      {/* Nebula glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: '300px',
          height: '300px',
          top: '-80px',
          right: '-60px',
          background: 'radial-gradient(circle, rgba(100,80,200,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          bottom: '100px',
          left: '-40px',
          background: 'radial-gradient(circle, rgba(212,168,50,0.06) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
    </div>
  )
}
