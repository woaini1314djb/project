<template>
  <div>
    <button @click="connectWallet" 
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 hover:from-purple-700 hover:via-blue-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
      <template v-if="!isConnected">
        Connect Wallet
      </template>
      <template v-else>
        {{ shortAddress }}
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isConnected = ref(false)
const account = ref('')

const shortAddress = computed(() => {
  if (!account.value) return ''
  return `${account.value.slice(0, 6)}...${account.value.slice(-4)}`
})

// 账户变化处理函数
const handleAccountsChanged = (accounts: string[]) => {
  if (accounts.length === 0) {
    isConnected.value = false
    account.value = ''
  } else {
    account.value = accounts[0]
    isConnected.value = true
  }
}

// 检查是否已连接
const checkConnection = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      handleAccountsChanged(accounts)
    } catch (error) {
      console.error('Error checking connection:', error)
    }
  }
}

// 连接钱包
const connectWallet = async () => {
  if (typeof window.ethereum === 'undefined') {
    window.open('https://metamask.io/download/', '_blank')
    return
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    handleAccountsChanged(accounts)
  } catch (error) {
    console.error('Error connecting wallet:', error)
    alert('Failed to connect wallet')
  }
}

onMounted(() => {
  checkConnection()
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleAccountsChanged)
  }
})

onUnmounted(() => {
  if (window.ethereum) {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
  }
})
</script>

<style scoped>
button {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style> 