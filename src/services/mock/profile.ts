// 生成模拟数据
export const mockProfileData = {
  // 账户数据
  getAccountData: () => ({
    totalEarnings: '1234.567890',
    pendingRewards: '56.789012',
    creditScore: 90,
    currentLevel: 2,
    levelProgress: 75,
    currentLevelMin: '1000',
    nextLevelMin: '5000'
  }),

  // 邀请数据
  getInviteData: () => ({
    invitedCount: 3,
    remainingInvites: 7,
    totalRewards: '45.678901',
    link: `https://example.com/invite/${Math.random().toString(36).substring(7)}`,
    history: [
      {
        id: 1,
        time: '2024-01-18 09:45',
        invitee: '0x1234...5678',
        reward: '15.678901'
      },
      {
        id: 2,
        time: '2024-01-15 16:20',
        invitee: '0x8765...4321',
        reward: '12.345678'
      }
    ]
  }),

  // 收益历史
  getEarningsHistory: () => ([
    {
      id: 1,
      time: '2024-01-20 14:30',
      amount: '12.345678',
      status: 'success',
      statusText: '已发放'
    },
    {
      id: 2,
      time: '2024-01-19 10:15',
      amount: '8.901234',
      status: 'success',
      statusText: '已发放'
    }
  ]),

  // 通知数据
  getNotifications: () => ([
    {
      id: 1,
      message: '您有一笔新的验证收益待领取',
      time: '10分钟前',
      read: false
    },
    {
      id: 2,
      message: '您的信用分已提升到90分',
      time: '1小时前',
      read: false
    }
  ])
} 