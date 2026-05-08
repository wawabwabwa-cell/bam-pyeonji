import { X, AlertTriangle, Ban, Flag } from 'lucide-react'

interface Props {
  onClose: () => void
  onConfirm: (reason: string) => void
}

const OPTIONS = [
  { icon: <Flag size={18} />, label: '불쾌한 내용이에요', desc: '욕설, 혐오, 음란 내용 포함' },
  { icon: <AlertTriangle size={18} />, label: '스팸 또는 광고예요', desc: '반복 메시지, 홍보성 내용' },
  { icon: <Ban size={18} />, label: '이 상대를 차단할게요', desc: '더 이상 편지를 주고받지 않음', destructive: true },
]

export default function ReportScreen({ onClose, onConfirm }: Props) {
  return (
    <div
      className="phone-frame flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0e1a 100%)' }}
    >
      {/* Dimmed overlay area */}
      <div
        className="flex-1 flex items-end"
        style={{ background: 'rgba(5,8,16,0.7)' }}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className="relative z-10 rounded-t-3xl px-6 pt-6 pb-10"
        style={{
          background: 'linear-gradient(180deg, #161e35 0%, #0f1525 100%)',
          border: '1px solid rgba(232,192,96,0.1)',
          borderBottom: 'none',
        }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'rgba(232,192,96,0.2)' }} />

        {/* Close */}
        <button className="absolute top-5 right-5" onClick={onClose}>
          <X size={20} color="#6677aa" />
        </button>

        <h3 className="font-serif text-lg mb-1" style={{ color: '#f4d98e' }}>
          이 편지를 신고하거나 차단할까요?
        </h3>
        <p className="text-xs mb-5" style={{ color: '#445588' }}>
          이유를 선택해주세요. 상대방에게 알림은 가지 않아요.
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-98"
              style={{
                background: 'rgba(10,14,26,0.6)',
                border: `1px solid ${opt.destructive ? 'rgba(255,80,80,0.15)' : 'rgba(232,192,96,0.08)'}`,
              }}
              onClick={() => onConfirm(opt.label)}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: opt.destructive ? 'rgba(255,80,80,0.1)' : 'rgba(30,42,71,0.6)',
                  color: opt.destructive ? '#ff5050' : '#8899bb',
                }}
              >
                {opt.icon}
              </div>
              <div>
                <div className="text-sm font-sans" style={{ color: opt.destructive ? '#ff8888' : '#e8d8c0' }}>
                  {opt.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#445588' }}>
                  {opt.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          className="w-full py-3 text-sm rounded-xl"
          style={{ color: '#6677aa', background: 'transparent' }}
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  )
}
