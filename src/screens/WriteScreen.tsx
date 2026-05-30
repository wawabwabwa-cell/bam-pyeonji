import { useState } from 'react'
import { ChevronLeft, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { getClientId } from '../lib/clientId'

interface Props {
  onSend: () => void
  onBack: () => void
}

export default function WriteScreen({ onSend, onBack }: Props) {
  const [content, setContent] = useState('')
  const [showSent, setShowSent] = useState(false)

  const handleSend = async () => {
    if (content.trim().length < 20) return

    const { error } = await supabase.from('letters_public').insert({
      nickname: '익명의 밤손님',
      content: content.trim(),
      question_prompt: '요즘 가장 자주 생각나는 장소가 있나요?',
      sender_client_id: getClientId(),
      delivered_at: new Date().toISOString(),
    })

    if (error) {
      console.error('편지 저장 실패:', error.message)
      alert('편지 저장에 실패했어요. 잠시 후 다시 시도해주세요.')
      return
    }

    setShowSent(true)
    setTimeout(() => {
      setShowSent(false)
      setContent('')
      onSend()
    }, 2200)
  }

  if (showSent) {
    return (
      <div
        className="phone-frame flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
      >
        <div className="text-6xl mb-6 animate-float">✉️</div>
        <h2 className="font-serif text-2xl mb-3" style={{ color: '#f4d98e' }}>
          편지가 날아갔어요
        </h2>
        <p className="text-sm text-center px-10" style={{ color: '#6677aa' }}>
          상대방이 읽을 때까지<br />잠시 기다려주세요
        </p>
        <div
          className="mt-6 px-5 py-2.5 rounded-full text-xs flex items-center gap-2"
          style={{ background: 'rgba(212,168,50,0.1)', color: '#d4a832', border: '1px solid rgba(232,192,96,0.2)' }}
        >
          <Clock size={12} />
          약 6~24시간 후 도착
        </div>
      </div>
    )
  }

  return (
    <div
      className="phone-frame flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      {/* Header */}
      <div className="px-5 pt-14 pb-3 flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft size={20} color="#8899bb" />
        </button>
        <div className="flex-1">
          <div className="text-xs tracking-widest uppercase" style={{ color: '#445588' }}>
            편지 쓰기
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#6677aa' }}>
            닉네임 없는 상대에게
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
          style={{ background: 'rgba(212,168,50,0.1)', color: '#d4a832', border: '1px solid rgba(232,192,96,0.2)' }}
        >
          <Clock size={10} />
          지연 전달
        </div>
      </div>

      {/* Prompt */}
      <div
        className="mx-5 mb-3 px-4 py-3 rounded-xl relative z-10"
        style={{ background: 'rgba(212,168,50,0.06)', border: '1px solid rgba(232,192,96,0.1)' }}
      >
        <p className="text-xs font-serif" style={{ color: '#8899bb' }}>
          💭 요즘 가장 자주 생각나는 장소가 있나요?
        </p>
      </div>

      {/* Paper */}
      <div className="relative z-10 mx-5 flex-1 flex flex-col">
        <div
          className="flex-1 rounded-2xl overflow-hidden relative"
          style={{
            background: '#fdf6e3',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 2px 0 rgba(232,192,96,0.1)',
            minHeight: '320px',
          }}
        >
          {/* Paper top decoration */}
          <div
            className="absolute top-0 left-0 right-0 h-7 flex items-center px-5 gap-1"
            style={{ background: 'rgba(200,180,120,0.15)', borderBottom: '1px solid rgba(44,36,22,0.08)' }}
          >
            <div className="w-2 h-2 rounded-full bg-red-400 opacity-60" />
            <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-60" />
            <div className="w-2 h-2 rounded-full bg-green-400 opacity-60" />
          </div>

          <textarea
            className="letter-paper w-full h-full pt-10 px-6 pb-6 resize-none outline-none text-sm bg-transparent"
            placeholder="마음을 담아 편지를 써주세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            style={{
              minHeight: '320px',
              fontFamily: '"Noto Serif KR", serif',
              color: '#2c2416',
              caretColor: '#b88a1a',
            }}
          />

          {/* Character count */}
          <div
            className="absolute bottom-3 right-4 text-xs"
            style={{ color: 'rgba(44,36,22,0.3)' }}
          >
            {content.length} / 500
          </div>
        </div>
      </div>

      {/* Send button */}
      <div className="relative z-10 px-5 pb-10 pt-4">
        <button
          className="btn-primary"
          disabled={content.trim().length < 20}
          onClick={handleSend}
          style={content.trim().length < 20 ? { background: 'rgba(212,168,50,0.3)', boxShadow: 'none' } : {}}
        >
          편지 보내기 ✉️
        </button>
        {content.trim().length > 0 && content.trim().length < 20 && (
          <p className="text-center text-xs mt-2" style={{ color: '#445588' }}>
            {20 - content.trim().length}자 더 써주세요
          </p>
        )}
      </div>
    </div>
  )
}
