export type Screen =
  | 'onboarding'
  | 'interests'
  | 'matching'
  | 'question'
  | 'write'
  | 'inbox'
  | 'read'
  | 'report'

export interface Letter {
  id: string
  from: string
  preview: string
  content: string
  sentAt: Date
  deliveredAt: Date
  isRead: boolean
  isDelivered: boolean
  questionPrompt?: string
}

export interface UserProfile {
  nickname: string
  interests: string[]
}
