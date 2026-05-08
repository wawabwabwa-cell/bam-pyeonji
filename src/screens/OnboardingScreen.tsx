import { useState, useEffect } from 'react'
import StarField from '../components/StarField'

interface Props {
  onNext: () => void
}

export default function OnboardingScreen({ onNext }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="phone-frame flex flex-col items-center justify-between relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 50%, #0f1525 100%)' }}>
      <StarField />

      {/* Top stamp decoration */}
      <div className="relative z-10 pt-16 flex flex-col items-center">
        <div
          className="text-xs tracking-[0.3em] uppercase mb-3 animate-fade-in"
          style={{ color: '#6677aa', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}
        >
          야간 우편 서비스
        </div>
      </div>

      {/* Moon + envelope center piece */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Crescent moon */}
        <div className="relative mb-8 animate-float" style={{ animationDelay: '0s' }}>
          <div
            className="rounded-full"
            style={{
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle at 35% 35%, #e8c060, #b88a1a)',
              boxShadow: '0 0 40px rgba(232,192,96,0.4), 0 0 80px rgba(232,192,96,0.15)',
              clipPath: 'path("M 40,0 A 40,40,0,1,1,40,80 A 28,28,0,1,0,40,0 Z")',
            }}
          />
          {/* Stars near moon */}
          <div className="absolute -top-3 -right-3 w-1.5 h-1.5 rounded-full bg-gold-300 animate-twinkle" />
          <div className="absolute top-2 right-6 w-1 h-1 rounded-full bg-gold-400 animate-twinkle" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-2 right-0 w-1 h-1 rounded-full bg-gold-300 animate-twinkle" style={{ animationDelay: '2s' }} />
        </div>

        {/* App name */}
        <h1
          className="font-serif text-5xl font-light mb-3 tracking-wider"
          style={{ color: '#f4d98e', textShadow: '0 0 30px rgba(232,192,96,0.3)' }}
        >
          밤 편지
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(232,192,96,0.4))' }} />
          <div className="w-1 h-1 rounded-full bg-gold-500" />
          <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(232,192,96,0.4))' }} />
        </div>

        <p className="font-serif text-sm tracking-widest" style={{ color: '#6677aa' }}>
          느리게,  진하게
        </p>
      </div>

      {/* Feature pills */}
      <div className={`relative z-10 flex flex-wrap justify-center gap-2 px-8 transition-all duration-1000 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {['익명으로 만나요', '편지로 대화해요', '관심사로 연결돼요'].map((text) => (
          <span
            key={text}
            className="px-3 py-1.5 rounded-full text-xs font-sans"
            style={{
              background: 'rgba(30,42,71,0.6)',
              border: '1px solid rgba(232,192,96,0.15)',
              color: '#8899bb',
            }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={`relative z-10 w-full px-8 pb-14 flex flex-col gap-3 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button className="btn-primary" onClick={onNext}>
          처음 시작하기
        </button>
        <button className="btn-secondary">
          이미 계정이 있어요
        </button>
        <p className="text-center text-xs mt-1" style={{ color: '#445588' }}>
          시작하면 이용약관 및 개인정보처리방침에 동의합니다
        </p>
      </div>
    </div>
  )
}
