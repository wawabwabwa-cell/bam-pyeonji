import { useEffect, useState } from 'react'
import { Clock, Star, Bell } from 'lucide-react'
import type { Letter } from '../types'
import { supabase } from '../lib/supabase'
import { getClientId } from '../lib/clientId'

type MailTab = 'inbox' | 'sent' | 'drafts'

interface Props {
  onRead: (letter: Letter) => void
  onWrite: () => void
}

const MOCK_LETTERS: Letter[] = [
  {
    id: '1',
    from: '밤의 산책자',
    preview: '그 질문을 읽고 바로 예전에 자주 가던 작은 서점이 떠올랐어요...',
    content: `안녕하세요.

그 질문을 읽고 바로 예전에 자주 가던 작은 서점이 떠올랐어요. 지금은 없어진 곳인데, 좁은 계단을 올라가면 나오는 2층 공간이었거든요.

비 오는 날 그곳에서 책 향기를 맡으며 앉아있던 기억이 선명하게 납니다. 아무도 말을 걸지 않아도 되는, 그런 공간이었어요.

당신은 어떤 장소가 떠오르셨나요?`,
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    isDelivered: true,
    questionPrompt: '요즘 가장 자주 생각나는 장소가 있나요?',
  },
  {
    id: '2',
    from: '고요한 독자',
    preview: '오늘 창밖을 보다가 문득 이 질문이 생각났어요. 저는 도서관을...',
    content: `안녕하세요.

오늘 창밖을 보다가 문득 이 질문이 생각났어요.

저는 도서관을 자주 생각해요. 특히 오래된 책들이 있는 서가 사이에 서 있을 때의 그 정적이요. 시간이 멈춘 것 같은 느낌이 좋아요.`,
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    isRead: true,
    isDelivered: true,
    questionPrompt: '좋아하는 계절이 있나요?',
  },
  {
    id: '3',
    from: '새벽의 글쓴이',
    preview: '편지가 도착하려면 조금 더 기다려주세요...',
    content: '',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    deliveredAt: new Date(Date.now() + 1000 * 60 * 60 * 4),
    isRead: false,
    isDelivered: false,
    questionPrompt: '',
  },
]

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const mins = Math.floor(diff / (1000 * 60))
  if (hours >= 24) return `${Math.floor(hours / 24)}일 전`
  if (hours >= 1) return `${hours}시간 전`
  return `${mins}분 전`
}

function timeUntil(date: Date): string {
  const diff = date.getTime() - Date.now()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const mins = Math.floor(diff / (1000 * 60))
  if (hours >= 1) return `약 ${hours}시간 후`
  return `약 ${mins}분 후`
}

export default function InboxScreen({ onRead, onWrite }: Props) {
  const [letters, setLetters] = useState<Letter[]>(MOCK_LETTERS)
  const [activeTab, setActiveTab] = useState<MailTab>('inbox')
  const clientId = getClientId()

  useEffect(() => {
    async function loadLetters() {
      const { data, error } = await supabase
        .from('letters_public')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('편지 불러오기 실패:', error.message)
        return
      }

      const rows = data ?? []

      const filteredRows =
        activeTab === 'sent'
          ? rows.filter((item) => item.sender_client_id === clientId)
          : activeTab === 'drafts'
            ? []
            : rows.filter((item) => item.sender_client_id !== clientId)

      const mappedLetters: Letter[] = filteredRows.map((item) => {
        const deliveredAt = new Date(item.delivered_at)

        return {
          id: item.id,
          from: item.nickname || '익명의 밤손님',
          preview:
            item.content.length > 42
              ? `${item.content.slice(0, 42)}...`
              : item.content,
          content: item.content,
          sentAt: new Date(item.created_at),
          deliveredAt,
          isRead: item.is_read ?? false,
          isDelivered: deliveredAt.getTime() <= Date.now(),
          questionPrompt: item.question_prompt || '',
        }
      })

      setLetters(mappedLetters)
    }

    loadLetters()
  }, [activeTab])

  async function handleRead(letter: Letter) {
    if (!letter.isDelivered) return

    if (!letter.isRead) {
      const { error } = await supabase
        .from('letters_public')
        .update({ is_read: true })
        .eq('id', letter.id)

      if (error) {
        console.error('읽음 처리 실패:', error.message)
        return
      }

      setLetters((prev) =>
        prev.map((l) =>
          l.id === letter.id ? { ...l, isRead: true } : l
        )
      )
    }

    onRead({ ...letter, isRead: true })
  }

  const unread = letters.filter((l) => !l.isRead && l.isDelivered).length

  return (
    <div
      className="phone-frame flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-5 relative z-10">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="font-serif text-2xl font-light" style={{ color: '#f4d98e' }}>
              편지함
            </h1>
            {unread > 0 && (
              <p className="text-xs mt-0.5" style={{ color: '#d4a832' }}>
                새 편지 {unread}통이 도착했어요
              </p>
            )}
          </div>
          <div className="flex gap-2 mt-1">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(30,42,71,0.6)', border: '1px solid rgba(232,192,96,0.1)' }}
            >
              <Bell size={15} color="#6677aa" />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(30,42,71,0.6)', border: '1px solid rgba(232,192,96,0.1)' }}
            >
              <Star size={15} color="#6677aa" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-4 rounded-xl overflow-hidden"
          style={{ background: 'rgba(15,21,37,0.6)', border: '1px solid rgba(232,192,96,0.08)' }}>
          {[
              { label: '받은 편지', value: 'inbox' as MailTab },
              { label: '보낸 편지', value: 'sent' as MailTab },
              { label: '임시저장', value: 'drafts' as MailTab },
            ].map((tab, i) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="flex-1 py-2.5 text-xs font-sans transition-all"
                style={{
                  background: activeTab === tab.value ? 'rgba(212,168,50,0.15)' : 'transparent',
                  color: activeTab === tab.value ? '#e8c060' : '#445588',
                  borderRight: i < 2 ? '1px solid rgba(232,192,96,0.08)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      {/* Letter list */}
      <div className="relative z-10 px-5 flex-1 overflow-y-auto pb-24 flex flex-col gap-3">
        {letters.map((letter) => (
          <button
            key={letter.id}
            className="w-full text-left rounded-2xl p-4 transition-all active:scale-98"
            style={{
              background: letter.isDelivered
                ? letter.isRead
                  ? 'rgba(15,21,37,0.5)'
                  : 'rgba(22,30,53,0.8)'
                : 'rgba(10,14,26,0.4)',
              border: letter.isDelivered && !letter.isRead
                ? '1px solid rgba(232,192,96,0.2)'
                : '1px solid rgba(232,192,96,0.06)',
            }}
            onClick={() => handleRead(letter)}
            disabled={!letter.isDelivered}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {!letter.isRead && letter.isDelivered && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#d4a832' }} />
                )}
                <span
                  className="text-sm font-serif"
                  style={{ color: letter.isDelivered ? '#e8d8c0' : '#445588' }}
                >
                  {letter.from}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {!letter.isDelivered && (
                  <Clock size={11} color="#445588" />
                )}
                <span className="text-xs" style={{ color: '#445588' }}>
                  {letter.isDelivered ? timeAgo(letter.deliveredAt) : timeUntil(letter.deliveredAt)}
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed line-clamp-2"
              style={{ color: letter.isDelivered ? '#6677aa' : '#2a3550' }}
            >
              {letter.isDelivered ? letter.preview : '편지가 배달 중이에요...'}
            </p>

            {!letter.isDelivered && (
              <div
                className="mt-2 flex items-center gap-1.5 text-xs"
                style={{ color: '#3a4a70' }}
              >
                <Clock size={10} />
                {timeUntil(letter.deliveredAt)} 도착 예정
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Write FAB */}
      <div className="absolute bottom-8 right-6 z-20">
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #e8c060, #d4a832)',
            boxShadow: '0 4px 20px rgba(212,168,50,0.4)',
          }}
          onClick={onWrite}
        >
          ✍️
        </button>
      </div>
    </div>
  )
}
