import { useEffect, useState } from 'react'

interface Props {
  interests: string[]
  onNext: () => void
}

export default function MatchingScreen({ interests, onNext }: Props) {
  const [phase, setPhase] = useState<'searching' | 'found'>('searching')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('found'), 3500)
    const t2 = setTimeout(() => onNext(), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onNext])

  useEffect(() => {
    if (phase === 'found') return
    const iv = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3 + 1)), 300)
    return () => clearInterval(iv)
  }, [phase])

  return (
    <div
      className="phone-frame flex flex-col items-center justify-center relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 60%, #0f1525 100%)' }}
    >
      {/* Ripple circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: '120px',
              height: '120px',
              borderColor: 'rgba(232,192,96,0.15)',
              animationName: 'ripple',
              animationDuration: '2.5s',
              animationDelay: `${i * 0.8}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-out',
            }}
          />
        ))}
      </div>

      {/* Center icon */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full mb-8 transition-all duration-700"
        style={{
          width: '100px',
          height: '100px',
          background: phase === 'found'
            ? 'radial-gradient(circle, rgba(212,168,50,0.3), rgba(212,168,50,0.1))'
            : 'radial-gradient(circle, rgba(30,42,71,0.8), rgba(15,21,37,0.8))',
          border: `2px solid ${phase === 'found' ? 'rgba(232,192,96,0.5)' : 'rgba(232,192,96,0.2)'}`,
          boxShadow: phase === 'found' ? '0 0 40px rgba(212,168,50,0.3)' : 'none',
        }}
      >
        <span className="text-4xl">{phase === 'found' ? '✉️' : '🔍'}</span>
      </div>

      {/* Status text */}
      <div className="relative z-10 text-center px-8 mb-8">
        {phase === 'searching' ? (
          <>
            <h2 className="font-serif text-xl mb-2" style={{ color: '#f4d98e' }}>
              편지 친구를 찾고 있어요
            </h2>
            <p className="text-sm" style={{ color: '#6677aa' }}>
              비슷한 관심사를 가진 분을 탐색 중...
            </p>
            <div className="mt-4 text-xs font-mono" style={{ color: '#445588' }}>
              {count.toLocaleString()}명 검색 중
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-xl mb-2" style={{ color: '#f4d98e' }}>
              좋은 분을 찾았어요!
            </h2>
            <p className="text-sm" style={{ color: '#8899bb' }}>
              오늘의 질문으로 첫 편지를 시작해볼게요
            </p>
          </>
        )}
      </div>

      {/* Selected interests */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 px-10">
        {interests.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs"
            style={{
              background: 'rgba(212,168,50,0.1)',
              border: '1px solid rgba(232,192,96,0.25)',
              color: '#d4a832',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Animated dots */}
      {phase === 'searching' && (
        <div className="relative z-10 mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#d4a832',
                animationName: 'pulse',
                animationDuration: '1.2s',
                animationDelay: `${i * 0.2}s`,
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
