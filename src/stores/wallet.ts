import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  const address = ref('')
  const isConnected = ref(false)

  // 连接钱包
  const connectWallet = async () => {
    try {
      // 检查是否支持 Trust Wallet
      if (typeof window.ethereum !== 'undefined') {
        try {
          // 请求连接钱包
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          })
          
          if (accounts.length > 0) {
            address.value = accounts[0]
            isConnected.value = true
            
            // 监听账户变化
            window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
              if (newAccounts.length === 0) {
                disconnectWallet()
              } else {
                address.value = newAccounts[0]
              }
            })
            
            return true
          }
        } catch (error: any) {
          if (error.code === 4001) {
            // 用户拒绝了连接请求
            console.log('Please connect to Trust Wallet.')
          } else {
            console.error(error)
          }
          return false
        }
      } else {
        // 如果没有检测到 Trust Wallet，跳转到下载页面
        window.open('https://trustwallet.com/download', '_blank')
        return false
      }
    } catch (error) {
      console.error('Failed to connect Trust Wallet:', error)
      return false
    }
  }

  // 断开钱包连接
  const disconnectWallet = () => {
    address.value = ''
    isConnected.value = false
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', () => {})
    }
  }

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet
  }
}) 