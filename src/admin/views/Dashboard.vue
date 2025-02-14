<template>
  <div class="container px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      总控台
    </h2>
    
    <!-- 添加加载状态 -->
    <n-spin :show="loading.stats">
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <!-- 总用户数 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              总用户数
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.totalUsers }}
            </p>
          </div>
        </div>
        
        <!-- 总交易额 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              总交易额
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ formatAmount(stats.totalAmount) }} MATIC
            </p>
          </div>
        </div>

        <!-- 今日交易数 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              今日交易数
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.todayTrades }}
            </p>
          </div>
        </div>

        <!-- 活跃验证者 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              活跃验证者
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.activeValidators }}
            </p>
          </div>
        </div>
      </div>
    </n-spin>

    <!-- 图表区域 -->
    <n-spin :show="loading.charts">
      <div class="grid gap-6 mb-8 md:grid-cols-2">
        <!-- 交易趋势图 -->
        <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            交易趋势
          </h4>
          <div class="h-64">
            <div ref="tradeChartRef" class="w-full h-full"></div>
          </div>
        </div>

        <!-- 用户增长图 -->
        <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            用户增长
          </h4>
          <div class="h-64">
            <div ref="userChartRef" class="w-full h-full"></div>
          </div>
        </div>
      </div>
    </n-spin>

    <!-- 最新交易记录 -->
    <n-spin :show="loading.transactions">
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-300">
            最新交易记录
          </h4>
          <n-button size="small" @click="router.push('/admin/transactions')">
            查看全部
          </n-button>
        </div>
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <n-data-table
              :columns="transactionColumns"
              :data="latestTransactions"
              :pagination="false"
              :bordered="false"
            />
          </div>
        </div>
      </div>
    </n-spin>

    <!-- 添加刷新按钮 -->
    <div class="fixed bottom-4 right-4">
      <n-button
        circle
        type="primary"
        @click="() => {
          fetchStats()
          fetchChartData()
          fetchLatestTransactions()
        }"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NDataTable, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { formatDate, formatAddress, formatAmount } from '@/admin/utils'
import type { Transaction } from '@/admin/types'
import * as echarts from 'echarts'

const router = useRouter()
const tradeChartRef = ref<HTMLElement | null>(null)
const userChartRef = ref<HTMLElement | null>(null)
let tradeChart: echarts.ECharts | null = null
let userChart: echarts.ECharts | null = null

// 统计数据
const stats = ref({
  totalUsers: 0,
  totalAmount: '0',
  todayTrades: 0,
  activeValidators: 0
})

// 图表数据
const tradeChartData = ref([])
const userChartData = ref([])

// 最新交易记录
const latestTransactions = ref<Transaction[]>([])

// 交易记录表格列配置
const transactionColumns: DataTableColumns<Transaction> = [
  {
    title: '交易哈希',
    key: 'txHash',
    render: (row) => formatAddress(row.txHash)
  },
  {
    title: '发送方',
    key: 'from',
    render: (row) => formatAddress(row.from)
  },
  {
    title: '接收方',
    key: 'to',
    render: (row) => formatAddress(row.to)
  },
  {
    title: '金额',
    key: 'amount',
    render: (row) => `${formatAmount(row.amount)} MATIC`
  },
  {
    title: '状态',
    key: 'status',
    render: (row) => {
      const statusMap = {
        pending: { text: '处理中', type: 'warning' },
        success: { text: '成功', type: 'success' },
        failed: { text: '失败', type: 'error' }
      }
      const status = statusMap[row.status]
      return h(NTag, { type: status.type }, () => status.text)
    }
  },
  {
    title: '时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  }
]

// 添加 loading 状态
const loading = ref({
  stats: false,
  charts: false,
  transactions: false
})

// 添加自动刷新间隔（毫秒）
const REFRESH_INTERVAL = 30000 // 30秒

// 获取统计数据
const fetchStats = async () => {
  loading.value.stats = true
  try {
    // 这里添加获取统计数据的 API 调用
    stats.value = {
      totalUsers: 1234,
      totalAmount: '1234567.89',
      todayTrades: 156,
      activeValidators: 45
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    loading.value.stats = false
  }
}

// 获取图表数据
const fetchChartData = async () => {
  try {
    // 这里添加获取图表数据的 API 调用
    // 示例数据
    tradeChartData.value = [
      { time: 1648512000000, value: 100 },
      { time: 1648598400000, value: 200 },
      { time: 1648684800000, value: 150 }
    ]
    userChartData.value = [
      { time: 1648512000000, value: 500 },
      { time: 1648598400000, value: 600 },
      { time: 1648684800000, value: 750 }
    ]
  } catch (error) {
    console.error('获取图表数据失败:', error)
  }
}

// 获取最新交易记录
const fetchLatestTransactions = async () => {
  try {
    // 这里添加获取最新交易记录的 API 调用
    // 示例数据
    latestTransactions.value = [
      {
        id: 1,
        txHash: '0x1234567890abcdef1234567890abcdef12345678',
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        to: '0x7890abcdef1234567890abcdef1234567890abcd',
        amount: '123.45',
        status: 'success',
        createdAt: new Date().toISOString()
      }
    ]
  } catch (error) {
    console.error('获取最新交易记录失败:', error)
  }
}

// 优化图表配置
const getChartOption = (data: any[], title: string) => ({
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      const [param] = params
      return `${formatDate(param.value[0])}<br/>${title}: ${param.value[1]}`
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
    axisLabel: {
      formatter: (value: number) => formatDate(value)
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    data,
    type: 'line',
    smooth: true,
    name: title,
    showSymbol: false,
    lineStyle: {
      width: 2
    },
    areaStyle: {
      opacity: 0.1
    }
  }]
})

// 初始化图表
const initCharts = () => {
  if (tradeChartRef.value) {
    tradeChart = echarts.init(tradeChartRef.value)
    tradeChart.setOption(getChartOption(tradeChartData.value, '交易量'))
  }

  if (userChartRef.value) {
    userChart = echarts.init(userChartRef.value)
    userChart.setOption(getChartOption(userChartData.value, '用户数'))
  }
}

// 自动刷新数据
let refreshTimer: number

const startAutoRefresh = () => {
  refreshTimer = window.setInterval(() => {
    fetchStats()
    fetchChartData()
    fetchLatestTransactions()
  }, REFRESH_INTERVAL)
}

const stopAutoRefresh = () => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer)
  }
}

// 监听窗口可见性变化
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAutoRefresh()
  } else {
    startAutoRefresh()
  }
}

// 组件挂载时
onMounted(() => {
  fetchStats()
  fetchChartData()
  fetchLatestTransactions()
  initCharts()
  startAutoRefresh()
  
  // 添加可见性变化监听
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // 添加主题变化监听
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    tradeChart?.dispose()
    userChart?.dispose()
    initCharts()
  })
})

// 组件卸载时
onUnmounted(() => {
  stopAutoRefresh()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  tradeChart?.dispose()
  userChart?.dispose()
})
</script> 