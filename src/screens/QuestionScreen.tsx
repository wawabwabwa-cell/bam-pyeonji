import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props {
  onWrite: () => void
}

const TODAY_QUESTION = {
  date: '2025년 1월 15일',
  question: '요즘 가장 자주 생각나는 장소가 있나요?',
  hint: '특별한 이유가 없어도 괜찮아요. 그냥 떠오르는 곳이 있다면요.',
}

const PAST_QUESTIONS = [
  { date: '1월 14일', question: '좋아하는 계절이 있나요? 그 이유가 뭔가요?' },
  { date: '1월 13일', question: '최근 읽은 책이나 본 영화에서 기억에 남는 문장이 있나요?' },
  { date: '1월 12일', question: '어릴 때 자주 하던 놀이나 취미가 있었나요?' },
]

export default function QuestionScreen({ onWrite }: Props) {
  const [showPast, setShowPast] = useState(false)

  return (
    <div
      className="phone-frame flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between relative z-10">
        <div>
          <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#445588' }}>
            오늘의 질문
          </div>
          <div className="text-xs" style={{ color: '#6677aa' }}>
            {TODAY_QUESTION.date}
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(232,192,96,0.2)' }}
        >
          📅
        </div>
      </div>

      {/* Main question card */}
      <div className="relative z-10 mx-5 flex-1 flex flex-col">
        <div
          className="rounded-3xl p-7 mb-4 flex-1 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(145deg, rgba(22,30,53,0.9), rgba(15,21,37,0.95))',
            border: '1px solid rgba(232,192,96,0.15)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,192,96,0.08)',
            minHeight: '300px',
          }}
        >
          {/* Quote decoration */}
          <div className="text-5xl font-serif leading-none mb-4" style={{ color: 'rgba(212,168,50,0.2)' }}>
            "
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3
              className="font-serif text-xl leading-loose mb-4"
              style={{ color: '#f4d98e', lineHeight: '2' }}
            >
              {TODAY_QUESTION.question}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6677aa' }}>
              {TODAY_QUESTION.hint}
            </p>
          </div>

          {/* Bottom of card */}
          <div className="flex items-center justify-between mt-6 pt-4"
            style={{ borderTop: '1px solid rgba(232,192,96,0.1)' }}>
            <div className="flex gap-1">
              {[0,1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? '#d4a832' : 'rgba(232,192,96,0.2)' }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: '#445588' }}>Day 1</span>
          </div>
        </div>

        {/* Action button */}
        <button
          className="btn-primary mb-3"
          onClick={onWrite}
        >
          이 질문으로 편지 쓰기 ✍️
        </button>

        {/* Past questions accordion */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: 'rgba(15,21,37,0.6)',
            border: '1px solid rgba(232,192,96,0.08)',
          }}
        >
          <button
            className="w-full px-5 py-4 flex items-center justify-between"
            onClick={() => setShowPast(!showPast)}
          >
            <span className="text-sm font-sans" style={{ color: '#8899bb' }}>
              지난 질문 보기
            </span>
            <ChevronDown
              size={16}
              color="#445588"
              style={{
                transform: showPast ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </button>

          {showPast && (
            <div className="px-5 pb-4 flex flex-col gap-3">
              {PAST_QUESTIONS.map((q) => (
                <div
                  key={q.date}
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(10,14,26,0.6)',
                    border: '1px solid rgba(232,192,96,0.06)',
                  }}
                >
                  <div className="text-xs mb-1.5" style={{ color: '#445588' }}>{q.date}</div>
                  <p className="text-sm font-serif" style={{ color: '#8899bb' }}>{q.question}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
