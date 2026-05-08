import { ChevronLeft, MoreVertical, Heart } from 'lucide-react'
import type { Letter } from '../types'

interface Props {
  letter: Letter
  onBack: () => void
  onReport: () => void
  onReply: () => void
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function ReadScreen({ letter, onBack, onReport, onReply }: Props) {
  return (
    <div
      className="phone-frame flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 relative z-10">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft size={20} color="#8899bb" />
        </button>
        <div className="flex-1">
          <div className="text-sm font-serif" style={{ color: '#f4d98e' }}>{letter.from}</div>
          <div className="text-xs mt-0.5" style={{ color: '#445588' }}>
            {formatDate(letter.deliveredAt)}
          </div>
        </div>
        <button onClick={onReport} className="w-8 h-8 flex items-center justify-center">
          <MoreVertical size={18} color="#445588" />
        </button>
      </div>

      {/* Question chip */}
      {letter.questionPrompt && (
        <div
          className="mx-5 mb-4 px-4 py-2.5 rounded-xl relative z-10"
          style={{ background: 'rgba(212,168,50,0.06)', border: '1px solid rgba(232,192,96,0.1)' }}
        >
          <div className="text-xs mb-1" style={{ color: '#445588' }}>오늘의 질문</div>
          <p className="text-xs font-serif" style={{ color: '#8899bb' }}>
            💭 {letter.questionPrompt}
          </p>
        </div>
      )}

      {/* Letter paper */}
      <div
        className="relative z-10 mx-5 rounded-2xl overflow-hidden flex-1"
        style={{
          background: '#fdf6e3',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 31px,
              rgba(44,36,22,0.08) 31px,
              rgba(44,36,22,0.08) 32px
            )
          `,
        }}
      >
        {/* Top margin line */}
        <div className="absolute top-0 left-12 bottom-0 w-px" style={{ background: 'rgba(200,100,100,0.15)' }} />

        <div
          className="pt-8 px-8 pb-6 text-sm leading-8 font-serif h-full overflow-y-auto"
          style={{ color: '#2c2416', fontFamily: '"Noto Serif KR", serif' }}
        >
          {letter.content.split('\n').map((line, i) => (
            <p key={i} className={line === '' ? 'h-8' : 'mb-0'}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 pb-10 pt-4 flex gap-3">
        <button
          className="flex-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm"
          style={{
            background: 'rgba(15,21,37,0.8)',
            border: '1px solid rgba(232,192,96,0.1)',
            color: '#6677aa',
          }}
        >
          <Heart size={16} />
          좋아요
        </button>
        <button
          className="flex-2 py-3.5 px-6 rounded-2xl text-sm font-serif"
          style={{
            background: 'linear-gradient(135deg, #e8c060, #d4a832)',
            color: '#1a1200',
            fontWeight: 600,
            flex: 2,
          }}
          onClick={onReply}
        >
          답장 쓰기 ✍️
        </button>
      </div>
    </div>
  )
}
