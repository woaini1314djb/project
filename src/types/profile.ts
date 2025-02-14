export interface AccountData {
  totalEarnings: string
  pendingRewards: string
  creditScore: number
  currentLevel: number
  levelProgress: number
  currentLevelMin: string
  nextLevelMin: string
}

export interface InviteRecord {
  id: number
  time: string
  invitee: string
  reward: string
}

export interface InviteData {
  invitedCount: number
  remainingInvites: number
  totalRewards: string
  link: string
  history: InviteRecord[]
}

export interface EarningRecord {
  id: number
  time: string
  amount: string
  status: 'success' | 'pending' | 'failed'
  statusText: string
}

export interface Notification {
  id: number
  message: string
  time: string
  read: boolean
} 