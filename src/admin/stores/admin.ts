import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    userInfo: null as any,
    permissions: [] as string[]
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission)
  },
  
  actions: {
    async login(credentials: { username: string; password: string }) {
      // 实现登录逻辑
    },
    
    async logout() {
      this.token = ''
      this.userInfo = null
      this.permissions = []
      localStorage.removeItem('admin_token')
    },
    
    async getUserInfo() {
      // 获取用户信息和权限
    }
  }
}) 