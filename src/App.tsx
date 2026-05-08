import { useState } from 'react'
import type { Screen, Letter } from './types'
import OnboardingScreen from './screens/OnboardingScreen'
import InterestsScreen from './screens/InterestsScreen'
import MatchingScreen from './screens/MatchingScreen'
import QuestionScreen from './screens/QuestionScreen'
import WriteScreen from './screens/WriteScreen'
import InboxScreen from './screens/InboxScreen'
import ReadScreen from './screens/ReadScreen'
import ReportScreen from './screens/ReportScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [interests, setInterests] = useState<string[]>([])
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null)

  const navigate = (s: Screen) => setScreen(s)

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#02030a' }}
    >
      {/* Phone container with subtle shadow */}
      <div style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)', borderRadius: '40px' }}>
        {screen === 'onboarding' && (
          <OnboardingScreen onNext={() => navigate('interests')} />
        )}
        {screen === 'interests' && (
          <InterestsScreen
            onNext={(sel) => {
              setInterests(sel)
              navigate('matching')
            }}
          />
        )}
        {screen === 'matching' && (
          <MatchingScreen
            interests={interests}
            onNext={() => navigate('question')}
          />
        )}
        {screen === 'question' && (
          <QuestionScreen onWrite={() => navigate('write')} />
        )}
        {screen === 'write' && (
          <WriteScreen
            onSend={() => navigate('inbox')}
            onBack={() => navigate('question')}
          />
        )}
        {screen === 'inbox' && (
          <InboxScreen
            onRead={(letter) => {
              setSelectedLetter(letter)
              navigate('read')
            }}
            onWrite={() => navigate('write')}
          />
        )}
        {screen === 'read' && selectedLetter && (
          <ReadScreen
            letter={selectedLetter}
            onBack={() => navigate('inbox')}
            onReport={() => navigate('report')}
            onReply={() => navigate('write')}
          />
        )}
        {screen === 'report' && (
          <ReportScreen
            onClose={() => navigate('read')}
            onConfirm={() => navigate('inbox')}
          />
        )}
      </div>

      {/* Screen nav hint */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full"
        style={{
          background: 'rgba(15,21,37,0.8)',
          color: '#445588',
          border: '1px solid rgba(232,192,96,0.08)',
          backdropFilter: 'blur(10px)',
        }}
      >
        밤 편지 · 프로토타입 v0.1
      </div>
    </div>
  )
}
