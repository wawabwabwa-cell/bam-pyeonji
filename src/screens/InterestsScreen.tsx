import { useState } from 'react'
import StarField from '../components/StarField'

interface Props {
  onNext: (interests: string[]) => void
}

const INTEREST_GROUPS = [
  {
    label: '일상',
    items: ['산책', '요리', '독서', '글쓰기', '영화', '음악', '드라마', '게임'],
  },
  {
    label: '취미',
    items: ['사진', '그림', '여행', '식물 키우기', '뜨개질', '요가', '등산', '카페 탐방'],
  },
  {
    label: '주제',
    items: ['철학', '역사', '과학', '심리학', '시', '클래식', '재즈', '인문학'],
  },
  {
    label: '감성',
    items: ['감사', '고요', '추억', '위로', '성장', '느린 삶'],
  },
]

export default function InterestsScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <div
      className="phone-frame flex flex-col relative overflow-y-auto"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      <StarField />

      {/* Header */}
      <div className="relative z-10 px-6 pt-14 pb-4">
        <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#445588' }}>
          02 / 관심사
        </div>
        <h2 className="font-serif text-2xl font-light leading-relaxed" style={{ color: '#f4d98e' }}>
          어떤 이야기를<br />나누고 싶으세요?
        </h2>
        <p className="text-sm mt-2" style={{ color: '#6677aa' }}>
          3가지 이상 선택하면 잘 맞는 상대를 찾아드려요
        </p>

        {/* Progress indicator */}
        <div className="flex gap-1.5 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-all duration-500"
              style={{
                background: i === 0 ? '#d4a832' : 'rgba(232,192,96,0.15)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Interest groups */}
      <div className="relative z-10 px-6 flex-1 pb-4">
        {INTEREST_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="text-xs tracking-widest uppercase mb-2.5" style={{ color: '#445588' }}>
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className={`interest-tag ${selected.includes(item) ? 'selected' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="relative z-10 px-6 pb-10 pt-2 sticky bottom-0"
        style={{ background: 'linear-gradient(to top, #0a0e1a 70%, transparent)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm" style={{ color: '#6677aa' }}>
            {selected.length}개 선택됨
          </span>
          {selected.length < 3 && (
            <span className="text-xs" style={{ color: '#445588' }}>
              {3 - selected.length}개 더 선택해주세요
            </span>
          )}
        </div>
        <button
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={selected.length < 3}
          onClick={() => onNext(selected)}
          style={selected.length < 3 ? { background: 'rgba(212,168,50,0.3)', boxShadow: 'none' } : {}}
        >
          다음으로
        </button>
      </div>
    </div>
  )
}
