<template>
  <div class="container mx-auto px-4 py-4 sm:py-8">
    <!-- 页面标题和通知 -->
    <div class="flex items-center justify-between mb-6">
      <!-- 标题和通知铃铛 -->
      <div class="flex items-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          个人中心
        </h1>
        <!-- 通知铃铛 -->
        <div class="relative ml-3">
          <button 
            @click="showNotifications = !showNotifications"
            class="p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <div class="relative">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              <!-- 未读通知标记 -->
              <span 
                v-if="unreadNotifications > 0"
                class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
              >
                {{ unreadNotifications }}
              </span>
            </div>
          </button>
          <!-- 通知下拉面板 - 移动端全屏显示 -->
          <div 
            v-if="showNotifications"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 md:bg-transparent md:absolute md:inset-auto md:right-0 md:mt-2"
          >
            <div 
              class="fixed inset-x-0 bottom-0 md:relative bg-white rounded-t-xl md:rounded-lg shadow-xl md:w-80"
              @click.stop
            >
              <div class="p-4 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium">通知</h3>
                  <button 
                    v-if="notifications.length > 0"
                    @click="clearAllNotifications"
                    class="text-sm text-purple-600 hover:text-purple-700"
                  >
                    全部已读
                  </button>
                </div>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <template v-if="notifications.length > 0">
                  <div 
                    v-for="notification in notifications" 
                    :key="notification.id"
                    class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <div class="flex items-start">
                      <div class="flex-1">
                        <p class="text-sm text-gray-900">{{ notification.message }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
                      </div>
                      <div 
                        v-if="!notification.read"
                        class="w-2 h-2 bg-purple-600 rounded-full"
                      ></div>
                    </div>
                  </div>
                </template>
                <div 
                  v-else 
                  class="p-4 text-center text-gray-500"
                >
                  暂无通知
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 客服按钮 -->
      <button 
        @click="handleCustomerService"
        class="flex items-center p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        <span class="ml-1 text-sm">客服</span>
      </button>
    </div>

    <!-- 账户数据卡片 -->
    <div class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
      <!-- 累计收益卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col h-32 sm:h-full">
          <!-- 标题和单位 -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300">
              累计收益
            </h3>
            <span class="text-xs sm:text-sm text-gray-500">USDT</span>
          </div>
          <!-- 数值 -->
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {{ formatNumber(accountData.totalEarnings, 6) }}
              </p>
            </div>
            <!-- 查看历史按钮 -->
            <button
              @click="scrollToHistory"
              class="w-full mt-2 px-2 py-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <span>查看历史</span>
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 待领取卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col h-32 sm:h-full">
          <!-- 标题和单位 -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300">
              待领取
            </h3>
            <span class="text-xs sm:text-sm text-gray-500">USDT</span>
          </div>
          <!-- 数值和按钮 -->
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {{ formatNumber(accountData.pendingRewards, 6) }}
              </p>
            </div>
            <button
              @click="handleClaim"
              :disabled="!canClaim"
              class="w-[40%] sm:w-[20%] mx-auto px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md text-white transition-colors duration-200"
              :class="[
                canClaim 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              ]"
            >
              提现
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户等级和信用分卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
      <!-- 卡片标题和信用分 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-0">
          当前等级
        </h3>
        <div class="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
          <span class="text-sm text-gray-600 dark:text-gray-300 mr-2">信用分</span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">{{ accountData.creditScore }}</span>
          <button 
            @click="dialogs.creditHelp = true"
            class="ml-2 text-purple-600 hover:text-purple-700 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" 
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 等级进度条 -->
      <div class="relative">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
              Level {{ accountData.currentLevel }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-purple-600">
              {{ accountData.levelProgress }}%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
          <div 
            :style="{ width: `${accountData.levelProgress}%` }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500">
          <span>{{ formatNumber(accountData.currentLevelMin, 0) }}</span>
          <span>{{ formatNumber(accountData.nextLevelMin, 0) }}</span>
        </div>
      </div>

      <!-- 等级特权说明 -->
      <div class="mt-4 bg-purple-50 dark:bg-gray-700 rounded-lg p-3">
        <h4 class="font-medium text-purple-900 dark:text-purple-100 mb-1.5 text-sm">等级特权</h4>
        <ul class="text-xs text-purple-700 dark:text-purple-200 space-y-1">
          <li>• 更高的收益率加成</li>
          <li>• 更多的自动领取次数</li>
          <li>• 更多的邀请名额</li>
        </ul>
      </div>
    </div>

    <!-- 验证者收益历史 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">验证者收益历史</h3>
      <!-- 移动端卡片式布局 -->
      <div class="block md:hidden space-y-3">
        <div 
          v-for="record in earningsHistory" 
          :key="record.id"
          class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-500">{{ record.time }}</span>
            <span 
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': record.status === 'success',
                'bg-yellow-100 text-yellow-800': record.status === 'pending',
                'bg-red-100 text-red-800': record.status === 'failed'
              }"
            >
              {{ record.statusText }}
            </span>
          </div>
          <div class="text-base font-medium text-gray-900 dark:text-white">
            {{ formatNumber(record.amount, 6) }} USDT
          </div>
        </div>
      </div>
      <!-- 桌面端表格布局 -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金额
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="record in earningsHistory" :key="record.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ record.time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatNumber(record.amount, 6) }} USDT
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': record.status === 'success',
                    'bg-yellow-100 text-yellow-800': record.status === 'pending',
                    'bg-red-100 text-red-800': record.status === 'failed'
                  }"
                >
                  {{ record.statusText }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 邀请好友卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">邀请好友</h3>
      
      <!-- 邀请统计卡片 -->
      <div class="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <!-- 已邀请人数 -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
          <div class="flex flex-col h-28 sm:h-auto">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
              已邀请人数
            </p>
            <div class="flex-1 flex items-center justify-center">
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {{ inviteData.invitedCount }}
              </p>
            </div>
          </div>
        </div>

        <!-- 剩余邀请名额 -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
          <div class="flex flex-col h-28 sm:h-auto">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
              剩余邀请名额
            </p>
            <div class="flex-1 flex items-center justify-center">
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {{ inviteData.remainingInvites }}
              </p>
            </div>
          </div>
        </div>

        <!-- 累计邀请奖励卡片 -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
          <div class="flex flex-col h-28 sm:h-auto">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
              累计邀请奖励
            </p>
            <!-- 单位 -->
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
              USDT
            </p>
            <!-- 数值 -->
            <div class="flex-1 flex items-center justify-center">
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {{ formatNumber(inviteData.totalRewards, 6) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 邀请链接 - 移动端优化 -->
      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6">
        <input 
          type="text" 
          :value="inviteData.link"
          readonly
          class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm"
        />
        <button
          @click="copyInviteLink"
          class="w-[40%] sm:w-[10%] mx-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none text-sm font-medium"
        >
          复制
        </button>
      </div>

      <!-- 邀请奖励机制说明 -->
      <div class="bg-purple-50 rounded-lg p-4 mb-6">
        <h4 class="font-medium text-purple-900 mb-2">邀请奖励机制</h4>
        <ul class="text-sm text-purple-700 space-y-1">
          <li>• 每成功邀请一位好友加入并完成质押，可获得其收益的5%作为奖励</li>
          <li>• 邀请奖励将在好友收益发放时自动发放</li>
          <li>• 每位用户最多可邀请10位好友</li>
        </ul>
      </div>

      <!-- 邀请收益历史 - 移动端卡片式布局 -->
      <div class="block md:hidden space-y-3">
        <div 
          v-for="record in inviteData.history" 
          :key="record.id"
          class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-500">{{ record.time }}</span>
            <span class="text-sm text-gray-900">{{ record.invitee }}</span>
          </div>
          <div class="text-base font-medium text-gray-900 dark:text-white">
            {{ formatNumber(record.reward, 6) }} USDT
          </div>
        </div>
      </div>
      <!-- 桌面端表格布局 -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                被邀请人
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                奖励金额
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="record in inviteData.history" :key="record.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ record.time }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ record.invitee }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatNumber(record.reward, 6) }} USDT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 信用分说明弹窗 - 移动端全屏 -->
    <div 
      v-if="dialogs.creditHelp"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div 
        class="bg-white dark:bg-gray-800 w-full sm:max-w-sm rounded-t-xl sm:rounded-lg shadow-xl p-4 sm:p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            信用分说明
          </h3>
          <button 
            @click="dialogs.creditHelp = false"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">信用分等级</span>
            <span class="text-gray-900 font-medium">每日提现次数</span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-green-600">优秀 (90-100)</span>
              <span>5次</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-600">良好 (80-89)</span>
              <span>3次</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-yellow-600">中等 (60-79)</span>
              <span>2次</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-red-600">较差 (0-59)</span>
              <span>1次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useWalletStore } from '../stores/wallet'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { formatAddress } from '@/utils/format'
import { mockProfileData } from '@/services/mock/profile'
import type { AccountData, InviteData, EarningRecord, Notification } from '@/types/profile'
import { CREDIT_SCORE_LEVELS, MAX_INVITE_COUNT } from '@/constants/profile'
import { getCreditScoreLevel, getWithdrawalLimit } from '@/utils/profile'

const wallet = useWalletStore()
const router = useRouter()
const message = useMessage()

// 从 store 中获取响应式数据
const { isConnected, address } = storeToRefs(wallet)

// 路由守卫
watch(isConnected, (connected) => {
  if (!connected) {
    router.push('/')
    message.warning('请先连接钱包')
  }
})

// 通知相关
const showNotifications = ref(false)
const notifications = ref([])
const unreadNotifications = computed(() => 
  notifications.value.filter(n => !n.read).length
)

// 账户数据 - 使用 ref 而不是直接赋值字符串
const accountData = ref<AccountData>({
  totalEarnings: '0',
  pendingRewards: '0',
  creditScore: 0,
  currentLevel: 1,
  levelProgress: 0,
  currentLevelMin: '0',
  nextLevelMin: '0'
})

// 计算属性
const canClaim = computed(() => 
  parseFloat(accountData.value.pendingRewards) > 0
)

// 等级相关计算属性
const levelInfo = computed(() => ({
  current: accountData.value.currentLevel,
  progress: accountData.value.levelProgress,
  currentMin: accountData.value.currentLevelMin,
  nextMin: accountData.value.nextLevelMin
}))

// 邀请相关数据
const inviteData = ref<InviteData>({
  invitedCount: 0,
  remainingInvites: 10,
  totalRewards: '0',
  link: '',
  history: []
})

// 历史记录数据
const earningsHistory = ref<EarningRecord[]>([])

// 弹窗控制
const dialogs = ref({
  creditHelp: false,
  customerService: false
})

// API 调用相关
const loading = ref({
  stats: false,
  history: false,
  claim: false
})

// 获取账户数据
const fetchAccountData = async () => {
  loading.value.stats = true
  try {
    const data = await mockProfileData.getAccountData()
    accountData.value = data
  } catch (error) {
    message.error('获取账户数据失败')
  } finally {
    loading.value.stats = false
  }
}

// 获取历史记录
const fetchHistory = async () => {
  loading.value.history = true
  try {
    const data = await mockProfileData.getEarningsHistory()
    earningsHistory.value = data
  } catch (error) {
    message.error('获取历史记录失败')
  } finally {
    loading.value.history = false
  }
}

// 获取通知
const fetchNotifications = async () => {
  try {
    const data = await mockProfileData.getNotifications()
    notifications.value = data
  } catch (error) {
    console.error('获取通知失败:', error)
  }
}

// 获取邀请数据
const fetchInviteData = async () => {
  try {
    const data = await mockProfileData.getInviteData()
    inviteData.value = data
  } catch (error) {
    message.error('获取邀请数据失败')
  }
}

// 处理提现
const handleClaim = async () => {
  if (!canClaim.value) return
  
  loading.value.claim = true
  try {
    // TODO: API 调用
    // await api.claimRewards()
    message.success('提现成功')
    await fetchAccountData()
  } catch (error) {
    message.error('提现失败')
  } finally {
    loading.value.claim = false
  }
}

// 复制邀请链接
const copyInviteLink = async () => {
  try {
    await navigator.clipboard.writeText(inviteData.value.link)
    message.success('复制成功')
  } catch (err) {
    message.error('复制失败')
    console.error('Failed to copy:', err)
  }
}

// 清除所有通知
const clearAllNotifications = async () => {
  try {
    // TODO: API 调用
    // await api.markAllNotificationsAsRead()
    notifications.value = notifications.value.map(n => ({ ...n, read: true }))
    message.success('已全部标记为已读')
  } catch (error) {
    message.error('操作失败')
  }
}

// 滚动到历史记录
const scrollToHistory = () => {
  const historyElement = document.querySelector('#earnings-history')
  if (historyElement) {
    historyElement.scrollIntoView({ behavior: 'smooth' })
  }
}

// 客服处理
const handleCustomerService = () => {
  dialogs.value.customerService = true
  // TODO: 实现客服聊天功能
}

// 格式化数字
const formatNumber = (value: string | number, decimals: number = 2) => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0'
  return num.toFixed(decimals)
}

// 初始化
onMounted(async () => {
  if (!isConnected.value) {
    router.push('/')
    return
  }
  
  await Promise.all([
    fetchAccountData(),
    fetchInviteData(),
    fetchHistory(),
    fetchNotifications()
  ])
})
</script> 