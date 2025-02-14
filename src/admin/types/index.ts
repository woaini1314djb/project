// 用户相关类型
export interface User {
  id: number
  address: string
  status: 'active' | 'inactive' | 'blocked'
  createdAt: string
  balance: string
}

// 交易相关类型
export interface Transaction {
  id: number
  txHash: string
  from: string
  to: string
  amount: string
  status: 'pending' | 'success' | 'failed'
  createdAt: string
}

// 系统设置相关类型
export interface SystemSettings {
  siteName: string
  description: string
  baseRate: number
  maxRate: number
} 