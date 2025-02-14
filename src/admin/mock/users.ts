// 生成随机地址
const generateAddress = () => {
  return '0x' + Array(40).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

// 生成随机时间
const generateDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// 生成模拟用户数据
export const generateMockUsers = (count: number) => {
  const statuses = ['active', 'inactive', 'blocked']
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  return Array(count).fill(0).map((_, index) => ({
    id: index + 1,
    address: generateAddress(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    balance: (Math.random() * 10000).toFixed(2),
    stakedAmount: (Math.random() * 5000).toFixed(2),
    rewardAmount: (Math.random() * 1000).toFixed(2),
    createdAt: generateDate(startDate, now).toISOString(),
    lastLoginAt: generateDate(startDate, now).toISOString(),
    isVirtual: Math.random() > 0.8,
    isSilent: Math.random() > 0.9,
    transactions: Math.floor(Math.random() * 100),
    validations: Math.floor(Math.random() * 50)
  }))
}

// 模拟用户统计数据
export const mockUserStats = {
  total: 1234,
  active: 890,
  inactive: 234,
  blocked: 110
}

// 模拟用户日志
export const generateMockLogs = (userId: number, count: number = 10) => {
  const actions = ['login', 'stake', 'unstake', 'reward', 'withdraw', 'validate']
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  return Array(count).fill(0).map((_, index) => ({
    id: index + 1,
    userId,
    action: actions[Math.floor(Math.random() * actions.length)],
    details: `操作详情 ${index + 1}`,
    createdAt: generateDate(startDate, now).toISOString(),
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  }))
} 