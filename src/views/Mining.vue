<template>
  <div class="container mx-auto px-4 py-4 sm:py-8">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        验证者面板
      </h1>
    </div>

    <!-- 验证状态卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6">
      <!-- 卡片头部：代币图标和状态 -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <!-- 第一行：代币图标和控制按钮 -->
        <div class="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <!-- 左侧代币图标 -->
          <div class="flex items-center">
            <img 
              :src="selectedToken.icon" 
              :alt="selectedToken.name" 
              class="h-6 w-6 sm:h-8 sm:w-8 mr-2"
            />
            <span class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {{ selectedToken.name }}
            </span>
          </div>

          <!-- 右侧控制按钮组 -->
          <div class="flex items-center space-x-2 sm:hidden">
            <!-- 代币切换 -->
            <div class="relative" ref="mobileTokenMenuRef">
              <button 
                @click.stop="showTokenMenu = !showTokenMenu"
                class="p-1.5 rounded-md hover:bg-gray-100"
              >
                <img 
                  :src="selectedToken.icon" 
                  :alt="selectedToken.name" 
                  class="h-5 w-5"
                />
              </button>

              <!-- 代币选择下拉菜单 -->
              <div 
                v-if="showTokenMenu" 
                class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl shadow-lg border-t border-gray-200"
                @click.stop
              >
                <!-- 移动端标题 -->
                <div class="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 class="text-base font-medium text-gray-900">选择代币</h3>
                  <button @click="showTokenMenu = false" class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <!-- 代币列表 -->
                <div class="max-h-[50vh] overflow-y-auto py-2">
                  <button
                    v-for="token in tokens"
                    :key="token.name"
                    @click="handleTokenChange(token)"
                    class="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <img :src="token.icon" :alt="token.name" class="h-6 w-6 mr-3" />
                    <span class="text-base text-gray-700">{{ token.name }}</span>
                    <span v-if="token.name === selectedToken.name" class="ml-auto text-purple-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 网络切换 -->
            <div class="relative" ref="mobileNetworkMenuRef">
              <button 
                @click.stop="showNetworkMenu = !showNetworkMenu"
                class="p-1.5 rounded-md hover:bg-gray-100"
              >
                <img 
                  :src="currentNetworkIcon" 
                  :alt="networkName" 
                  class="h-5 w-5"
                />
              </button>

              <!-- 网络选择下拉菜单 -->
              <div 
                v-if="showNetworkMenu" 
                class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl shadow-lg border-t border-gray-200"
                @click.stop
              >
                <!-- 移动端标题 -->
                <div class="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 class="text-base font-medium text-gray-900">选择网络</h3>
                  <button @click="showNetworkMenu = false" class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <!-- 网络列表 -->
                <div class="max-h-[50vh] overflow-y-auto py-2">
                  <button
                    v-for="network in networks"
                    :key="network.chainId"
                    @click="switchToNetwork(network.chainId)"
                    class="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <img :src="network.icon" :alt="network.name" class="h-6 w-6 mr-3" />
                    <span class="text-base text-gray-700">{{ network.name }}</span>
                    <span v-if="parseInt(network.chainId, 16) === networkId" class="ml-auto text-purple-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 授权状态 -->
            <div class="flex items-center">
              <div class="h-2 w-2 rounded-full mr-1" :class="authStatusColor"></div>
              <span class="text-xs text-gray-500">{{ authStatus }}</span>
            </div>
          </div>
        </div>

        <!-- 桌面端控制按钮组 -->
        <div class="hidden sm:flex items-center space-x-4">
          <!-- 代币和网络选择 -->
          <div class="flex space-x-2 sm:space-x-4">
            <!-- 代币切换 -->
            <div class="relative" ref="tokenMenuRef">
              <button 
                @click.stop="showTokenMenu = !showTokenMenu"
                class="flex items-center space-x-1 hover:opacity-80 p-1.5 rounded-md"
              >
                <img 
                  :src="selectedToken.icon" 
                  :alt="selectedToken.name" 
                  class="h-5 w-5"
                />
                <span class="hidden sm:inline text-sm text-gray-600">{{ selectedToken.name }}</span>
                <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- 代币选择下拉菜单 -->
              <div 
                v-if="showTokenMenu" 
                class="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:top-full sm:right-0 sm:left-auto z-50 sm:mt-1 bg-white rounded-t-xl sm:rounded-md shadow-lg border-t sm:border border-gray-200 sm:w-48"
                @click.stop
              >
                <!-- 移动端标题 -->
                <div class="flex items-center justify-between p-4 sm:hidden border-b border-gray-100">
                  <h3 class="text-base font-medium text-gray-900">选择代币</h3>
                  <button @click="showTokenMenu = false" class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <!-- 代币列表 -->
                <div class="max-h-[50vh] sm:max-h-64 overflow-y-auto py-2">
                  <button
                    v-for="token in tokens"
                    :key="token.name"
                    @click="handleTokenChange(token)"
                    class="flex items-center w-full px-4 py-3 sm:py-2 text-left hover:bg-gray-50"
                  >
                    <img :src="token.icon" :alt="token.name" class="h-6 w-6 sm:h-5 sm:w-5 mr-3" />
                    <span class="text-base sm:text-sm text-gray-700">{{ token.name }}</span>
                    <span v-if="token.name === selectedToken.name" class="ml-auto text-purple-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 网络切换 -->
            <div class="relative" ref="networkMenuRef">
              <button 
                @click.stop="showNetworkMenu = !showNetworkMenu"
                class="flex items-center space-x-1 hover:opacity-80 p-1.5 rounded-md"
              >
                <img 
                  :src="currentNetworkIcon" 
                  :alt="networkName" 
                  class="h-5 w-5"
                />
                <span class="hidden sm:inline text-sm text-gray-600">{{ networkName }}</span>
                <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- 网络选择下拉菜单 -->
              <div 
                v-if="showNetworkMenu" 
                class="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:top-full sm:right-0 sm:left-auto z-50 sm:mt-1 bg-white rounded-t-xl sm:rounded-md shadow-lg border-t sm:border border-gray-200 sm:w-48"
                @click.stop
              >
                <!-- 移动端标题 -->
                <div class="flex items-center justify-between p-4 sm:hidden border-b border-gray-100">
                  <h3 class="text-base font-medium text-gray-900">选择网络</h3>
                  <button @click="showNetworkMenu = false" class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <!-- 网络列表 -->
                <div class="max-h-[50vh] sm:max-h-64 overflow-y-auto py-2">
                  <button
                    v-for="network in networks"
                    :key="network.chainId"
                    @click="switchToNetwork(network.chainId)"
                    class="flex items-center w-full px-4 py-3 sm:py-2 text-left hover:bg-gray-50"
                  >
                    <img :src="network.icon" :alt="network.name" class="h-6 w-6 sm:h-5 sm:w-5 mr-3" />
                    <span class="text-base sm:text-sm text-gray-700">{{ network.name }}</span>
                    <span v-if="parseInt(network.chainId, 16) === networkId" class="ml-auto text-purple-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 桌面端授权状态 -->
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full mr-2" :class="authStatusColor"></div>
            <span class="text-sm text-gray-500">{{ authStatus }}</span>
          </div>
        </div>
      </div>

      <!-- 验证信息 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <!-- 钱包余额 -->
        <div class="bg-white/50 rounded-lg p-4 text-center">
          <h3 class="text-sm font-medium text-gray-600 mb-2">钱包余额</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            <template v-if="isLoadingBalance">
              <span class="text-gray-400">加载中...</span>
            </template>
            <template v-else>
              {{ formatNumber(tokenBalance, 6) }} {{ selectedToken.name }}
            </template>
          </p>
        </div>

        <!-- 验证时长 -->
        <div class="bg-white/50 rounded-lg p-4 text-center">
          <h3 class="text-sm font-medium text-gray-600 mb-2">验证时长</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ validationCountdown }}
          </p>
        </div>

        <!-- 本次收益 -->
        <div class="bg-white/50 rounded-lg p-4 text-center">
          <h3 class="text-sm font-medium text-gray-600 mb-2">本次收益</h3>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ formatNumber(currentEarnings, 6) }} {{ selectedToken.name }}
          </p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="mt-6 flex justify-center">
        <button
          @click="toggleValidation"
          class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-md text-white font-medium text-sm sm:text-base"
          :class="[
            isValidating ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700',
            !isCorrectNetwork || !isAuthorized ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="!isCorrectNetwork || !isAuthorized"
        >
          {{ isValidating ? '停止验证' : '开始验证' }}
        </button>
      </div>
    </div>

    <!-- 账户信息卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- 质押金额卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <div class="text-center">
          <div class="flex items-center justify-center mb-2 sm:mb-4">
            <h3 class="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">质押金额</h3>
            <!-- 帮助问号图标 -->
            <button 
              @click="showStakeHelp = true"
              class="ml-2 text-purple-600 hover:text-purple-700 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" 
                />
              </svg>
            </button>
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {{ formatNumber(stakedAmount, 6) }} {{ selectedToken.name }}
          </p>
        </div>
      </div>

      <!-- 帮助提示弹窗 -->
      <div 
        v-if="showStakeHelp"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click="showStakeHelp = false"
      >
        <div 
          class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6"
          @click.stop
        >
          <!-- 弹窗标题和关闭按钮 -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              质押说明
            </h3>
            <button 
              @click="showStakeHelp = false"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- 弹窗内容 -->
          <p class="text-gray-600 dark:text-gray-300">
            如要申请质押资格请联系您的客户经理。
          </p>
        </div>
      </div>

      <!-- 当前利率卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <div class="text-center">
          <div class="flex items-center justify-center mb-2 sm:mb-4">
            <h3 class="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">当前利率</h3>
            <!-- 帮助问号图标 -->
            <button 
              @click="showRateHelp = true"
              class="ml-2 text-purple-600 hover:text-purple-700 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" 
                />
              </svg>
            </button>
          </div>
          <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            <span>{{ currentRate }}</span>
            <span class="text-base sm:text-lg">%</span>
            <span class="text-xs sm:text-sm text-gray-500">/8h</span>
          </div>
        </div>
      </div>

      <!-- 自动领取次数卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <div class="text-center">
          <div class="flex items-center justify-center mb-2 sm:mb-4">
            <h3 class="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">剩余自动领取次数</h3>
            <!-- 帮助问号图标 -->
            <button 
              @click="showClaimsHelp = true"
              class="ml-2 text-purple-600 hover:text-purple-700 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" 
                />
              </svg>
            </button>
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {{ remainingAutoClaims }}
          </p>
        </div>
      </div>
    </div>

    <!-- 利率帮助弹窗 -->
    <div 
      v-if="showRateHelp"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="showRateHelp = false"
    >
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            利率说明
          </h3>
          <button 
            @click="showRateHelp = false"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          正在开发中...
        </p>
      </div>
    </div>

    <!-- 自动领取帮助弹窗 -->
    <div 
      v-if="showClaimsHelp"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="showClaimsHelp = false"
    >
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            自动领取说明
          </h3>
          <button 
            @click="showClaimsHelp = false"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          正在开发中...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useWalletStore } from '../stores/wallet'
import { useRouter } from 'vue-router'
import { ethers } from 'ethers'
import { useMessage } from 'naive-ui'

// 导入网络图标
import ethereumIcon from '@/assets/images/networks/ethereum.png'
import bscIcon from '@/assets/images/networks/bsc.png'
import polygonIcon from '@/assets/images/networks/polygon.png'

// 导入代币图标
import usdtIcon from '@/assets/images/tokens/usdt.png'
import usdcIcon from '@/assets/images/tokens/usdc.png'
import busdIcon from '@/assets/images/tokens/busd.png'
import tusdIcon from '@/assets/images/tokens/tusd.png'

const wallet = useWalletStore()
const router = useRouter()
const message = useMessage()

// 如果未连接钱包，重定向到首页
if (!wallet.isConnected) {
  router.push('/')
}

const isValidating = ref(false)
const currentEarnings = ref('0.00')
const validationDuration = ref('00:00:00')
const tokenBalance = ref('0.00')

// 网络状态
const networkId = ref(0)
const isCorrectNetwork = computed(() => networkId.value === 137) // Polygon 主网的 chainId

const networkName = computed(() => {
  switch (networkId.value) {
    case 1: return 'Ethereum Mainnet'
    case 56: return 'BSC Mainnet'
    case 137: return 'Polygon Mainnet'
    case 80001: return 'Polygon Mumbai'
    default: return '未知网络'
  }
})

const networkStatusColor = computed(() => {
  return isCorrectNetwork.value
    ? 'bg-green-500'
    : 'bg-red-500'
})

// 授权状态
const isAuthorized = ref(false)
const authStatus = computed(() => isAuthorized.value ? '已授权' : '未授权')
const authStatusColor = computed(() => {
  return isAuthorized.value
    ? 'bg-green-500'
    : 'bg-red-500'
})

// 网络配置
const networks = [
  { name: 'Ethereum', chainId: '0x1', icon: ethereumIcon },
  { name: 'BSC', chainId: '0x38', icon: bscIcon },
  { name: 'Polygon', chainId: '0x89', icon: polygonIcon }
]

const networkMenuRef = ref<HTMLElement | null>(null)
const tokenMenuRef = ref<HTMLElement | null>(null)
const showNetworkMenu = ref(false)
const showTokenMenu = ref(false)

// 获取当前网络图标
const currentNetworkIcon = computed(() => {
  const network = networks.find(n => parseInt(n.chainId, 16) === networkId.value)
  return network?.icon || networks[0].icon
})

// 切换网络
const switchToNetwork = async (chainId: string) => {
  try {
    message.loading('正在切换网络...')
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
    showNetworkMenu.value = false
    await checkNetwork()
    message.success('网络切换成功')
  } catch (error: any) {
    if (error.code === 4902) {
      message.error('请先在钱包中添加该网络')
    } else {
      message.error('网络切换失败')
    }
    console.error('Failed to switch network:', error)
  }
}

// 授权
const authorize = async () => {
  try {
    // 这里添加授权逻辑
    isAuthorized.value = true
  } catch (error) {
    console.error('Authorization failed:', error)
  }
}

// 检查网络
const checkNetwork = async () => {
  try {
    if (!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    networkId.value = network.chainId
  } catch (error) {
    console.error('Failed to get network:', error)
  }
}

// 初始化
checkNetwork()

// 验证功能
const toggleValidation = async () => {
  if (!isCorrectNetwork.value) {
    message.warning('请先切换到 Polygon 网络')
    return
  }
  
  if (!isAuthorized.value) {
    message.warning('请先授权')
    return
  }

  try {
    isValidating.value = !isValidating.value
    if (isValidating.value) {
      message.success('开始验证')
      // 这里添加实际的验证逻辑
    } else {
      message.success('停止验证')
      // 这里添加停止验证的逻辑
    }
  } catch (error) {
    console.error('Validation failed:', error)
    message.error('验证操作失败')
    isValidating.value = false
  }
}

// 代币配置
const tokens = [
  { name: 'USDT', icon: usdtIcon },
  { name: 'USDC', icon: usdcIcon },
  { name: 'BUSD', icon: busdIcon },
  { name: 'TUSD', icon: tusdIcon }
]

const selectedToken = ref(tokens[0])

// 代币合约 ABI
const tokenABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)'
]

// 代币合约地址映射
const tokenAddresses = {
  'Ethereum': {
    'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    'BUSD': '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    'TUSD': '0x0000000000085d4780B73119b644AE5ecd22b376'
  },
  'BSC': {
    'USDT': '0x55d398326f99059fF775485246999027B3197955',
    'USDC': '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    'BUSD': '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    'TUSD': '0x14016E85a25aeb13065688cAFB43044C2ef86784'
  },
  'Polygon': {
    'USDT': '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    'USDC': '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    'BUSD': '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
    'TUSD': '0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756'
  }
}

// 查询代币余额的重试机制
const getTokenBalance = async (retries = 3) => {
  isLoadingBalance.value = true
  try {
    if (!wallet.address || !window.ethereum) {
      throw new Error('Wallet not connected')
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    const currentNetwork = networks.find(n => parseInt(n.chainId, 16) === network.chainId)?.name

    if (!currentNetwork || !tokenAddresses[currentNetwork]?.[selectedToken.value.name]) {
      throw new Error('Unsupported network or token')
    }

    const tokenAddress = tokenAddresses[currentNetwork][selectedToken.value.name]
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider)
    
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(wallet.address),
      contract.decimals()
    ])
    
    const formattedBalance = ethers.utils.formatUnits(balance, decimals)
    tokenBalance.value = (+formattedBalance).toFixed(2)
    currentRate.value = calculateRate(+formattedBalance)
    
  } catch (error) {
    console.error('Failed to get token balance:', error)
    if (retries > 0) {
      message.info('正在重试获取余额...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      return getTokenBalance(retries - 1)
    }
    message.error('获取余额失败')
    tokenBalance.value = '0.00'
    currentRate.value = 0
  } finally {
    isLoadingBalance.value = false
  }
}

// 添加错误处理和状态显示
const isLoadingBalance = ref(false)

// 修改 watch 函数
watch([networkId, selectedToken], async () => {
  isLoadingBalance.value = true
  try {
    await getTokenBalance()
  } finally {
    isLoadingBalance.value = false
  }
})

// 在组件挂载时获取余额
onMounted(async () => {
  await getTokenBalance()
})

// 修改代币切换处理函数
const handleTokenChange = async (token: typeof tokens[0]) => {
  selectedToken.value = token
  showTokenMenu.value = false
  await getTokenBalance()
}

// 处理点击外部关闭代币菜单
const handleTokenClickOutside = (event: MouseEvent) => {
  if (tokenMenuRef.value && !tokenMenuRef.value.contains(event.target as Node)) {
    showTokenMenu.value = false
  }
}

// 处理点击外部关闭网络菜单
const handleNetworkClickOutside = (event: MouseEvent) => {
  if (networkMenuRef.value && !networkMenuRef.value.contains(event.target as Node)) {
    showNetworkMenu.value = false
  }
}

// 监听区块更新和账户变化
onMounted(() => {
  if (window.ethereum) {
    window.ethereum.on('block', () => {
      if (!isLoadingBalance.value) {
        getTokenBalance()
      }
    })
    
    window.ethereum.on('accountsChanged', () => {
      getTokenBalance()
    })
    
    window.ethereum.on('chainChanged', () => {
      checkNetwork()
      getTokenBalance()
    })
  }
  
  // 添加点击外部关闭菜单的监听
  document.addEventListener('click', handleTokenClickOutside)
  document.addEventListener('click', handleNetworkClickOutside)
})

// 清理监听器
onUnmounted(() => {
  if (window.ethereum) {
    window.ethereum.removeListener('block', getTokenBalance)
    window.ethereum.removeListener('accountsChanged', getTokenBalance)
    window.ethereum.removeListener('chainChanged', checkNetwork)
  }
  
  document.removeEventListener('click', handleTokenClickOutside)
  document.removeEventListener('click', handleNetworkClickOutside)
})

// 在现有的 script setup 中添加以下代码
const stakedAmount = ref('0.00')
const currentRate = ref(0)
const remainingAutoClaims = ref(3)
const validationCountdown = ref('08:00:00')
const isInGracePeriod = ref(false)

// 计算当前利率
const calculateRate = (amount: number) => {
  if (amount >= 200000) return 1.3
  if (amount >= 150000) return 0.75
  if (amount >= 80000) return 0.58
  if (amount >= 30000) return 0.45
  if (amount >= 5000) return 0.38
  if (amount >= 50) return 0.32
  return 0
}

// 倒计时颜色
const getCountdownColor = computed(() => {
  if (isInGracePeriod.value) return 'text-red-600'
  return 'text-purple-600'
})

// 格式化数字
const formatNumber = (value: string | number, decimals: number) => {
  if (typeof value === 'string') {
    return (+value).toFixed(decimals)
  } else if (typeof value === 'number') {
    return value.toFixed(decimals)
  } else {
    throw new Error('Invalid format type')
  }
}

// 帮助提示
const showStakeHelp = ref(false)

// 利率帮助弹窗
const showRateHelp = ref(false)

// 自动领取帮助弹窗
const showClaimsHelp = ref(false)
</script> 