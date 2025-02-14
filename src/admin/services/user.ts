import api from './api'
import type { User } from '../types'
import { generateMockUsers, mockUserStats, generateMockLogs } from '../mock/users'

export const userService = {
  // 获取用户列表
  getUsers(params: { 
    page: number
    pageSize: number
    status?: string
    search?: string
    sortBy?: string
    sortOrder?: 'ascend' | 'descend' | false
  }) {
    // 生成模拟数据
    const allUsers = generateMockUsers(100)
    
    // 应用筛选
    let filteredUsers = allUsers
    if (params.status) {
      filteredUsers = filteredUsers.filter(user => user.status === params.status)
    }
    if (params.search) {
      filteredUsers = filteredUsers.filter(user => 
        user.address.toLowerCase().includes(params.search.toLowerCase())
      )
    }

    // 应用排序
    if (params.sortBy && params.sortOrder) {
      filteredUsers.sort((a, b) => {
        const factor = params.sortOrder === 'ascend' ? 1 : -1
        return (a[params.sortBy] > b[params.sortBy] ? 1 : -1) * factor
      })
    }

    // 应用分页
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const pageUsers = filteredUsers.slice(start, end)

    return Promise.resolve({
      list: pageUsers,
      total: filteredUsers.length
    })
  },

  // 获取用户统计数据
  getUserStats() {
    return Promise.resolve(mockUserStats)
  },

  // 获取用户日志
  getUserLogs(userId: number) {
    return Promise.resolve(generateMockLogs(userId))
  },

  // 更新用户状态
  updateUserStatus(id: number, status: string) {
    return Promise.resolve({ success: true })
  },

  // 获取用户详情
  getUserDetails(id: number) {
    return api.get<User>(`/users/${id}`)
  },

  // 批量更新用户状态
  batchUpdateStatus(params: { ids: number[]; status: string; remark: string }) {
    return Promise.resolve({ success: true })
  }
} 