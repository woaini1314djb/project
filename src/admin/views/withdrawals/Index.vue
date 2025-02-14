<template>
  <div class="container px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      提现管理
    </h2>

    <!-- 统计卡片 -->
    <n-spin :show="loading.stats">
      <div class="grid gap-6 mb-8 md:grid-cols-4">
        <div v-for="(stat, key) in stats" :key="key" 
             class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ stat.label }}
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </n-spin>

    <!-- 搜索和过滤 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="w-full sm:w-1/3 mb-4 sm:mb-0">
        <n-input-group>
          <n-input
            v-model:value="searchQuery"
            type="text"
            placeholder="搜索用户地址..."
            clearable
            @update:value="handleSearch"
          >
            <template #prefix>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </n-input>
          <n-button type="primary" @click="handleSearch">
            搜索
          </n-button>
        </n-input-group>
      </div>

      <div class="flex space-x-4">
        <n-select
          v-model:value="statusFilter"
          :options="statusOptions"
          placeholder="选择状态"
          clearable
          @update:value="handleFilter"
        />
      </div>
    </div>

    <!-- 提现列表 -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <n-data-table
          :columns="columns"
          :data="withdrawals"
          :loading="loading.table"
          :pagination="pagination"
          :bordered="false"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    </div>

    <!-- 审核对话框 -->
    <n-modal
      v-model:show="showAuditModal"
      preset="dialog"
      title="提现审核"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleAuditConfirm"
      @negative-click="showAuditModal = false"
    >
      <n-form
        ref="auditFormRef"
        :model="auditForm"
        :rules="auditRules"
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="审核结果" path="status">
          <n-radio-group v-model:value="auditForm.status">
            <n-radio-button value="approved">通过</n-radio-button>
            <n-radio-button value="rejected">拒绝</n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="auditForm.remark"
            type="textarea"
            placeholder="请输入审核意见"
          />
        </n-form-item>
        <template v-if="auditForm.status === 'approved'">
          <n-form-item label="交易哈希" path="txHash">
            <n-input
              v-model:value="auditForm.txHash"
              placeholder="请输入交易哈希"
            />
          </n-form-item>
        </template>
      </n-form>
    </n-modal>

    <!-- 详情对话框 -->
    <n-modal
      v-model:show="showDetailsModal"
      preset="card"
      style="width: 600px"
      :title="'提现详情 #' + selectedWithdrawal?.id"
    >
      <n-descriptions bordered>
        <n-descriptions-item label="用户地址">
          {{ formatAddress(selectedWithdrawal?.userAddress || '') }}
        </n-descriptions-item>
        <n-descriptions-item label="提现金额">
          {{ formatAmount(selectedWithdrawal?.amount || '0') }} MATIC
        </n-descriptions-item>
        <n-descriptions-item label="状态">
          <n-tag :type="getStatusType(selectedWithdrawal?.status)">
            {{ getStatusText(selectedWithdrawal?.status) }}
          </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="申请时间">
          {{ formatDate(selectedWithdrawal?.createdAt || '') }}
        </n-descriptions-item>
        <n-descriptions-item label="审核时间" v-if="selectedWithdrawal?.auditedAt">
          {{ formatDate(selectedWithdrawal?.auditedAt) }}
        </n-descriptions-item>
        <n-descriptions-item label="交易哈希" v-if="selectedWithdrawal?.txHash">
          {{ formatAddress(selectedWithdrawal?.txHash) }}
        </n-descriptions-item>
        <n-descriptions-item label="备注" v-if="selectedWithdrawal?.remark">
          {{ selectedWithdrawal?.remark }}
        </n-descriptions-item>
      </n-descriptions>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, onMounted, computed } from 'vue'
import { useMessage } from 'naive-ui'
import type { DataTableColumns, FormInst } from 'naive-ui'
import { 
  NButton, 
  NTag, 
  NSelect, 
  NDataTable, 
  NInput, 
  NModal, 
  NForm, 
  NFormItem,
  NSpin,
  NInputGroup,
  NRadioGroup,
  NRadioButton,
  NDescriptions,
  NDescriptionsItem
} from 'naive-ui'
import { useDebounceFn } from '@vueuse/core'
import { formatDate, formatAddress, formatAmount } from '@/admin/utils'

const message = useMessage()

// 加载状态
const loading = ref({
  stats: false,
  table: false
})

// 统计数据
const stats = ref({
  total: { label: '总提现金额', value: '0 MATIC' },
  pending: { label: '待审核', value: 0 },
  today: { label: '今日提现', value: '0 MATIC' },
  avgTime: { label: '平均审核时长', value: '0h' }
})

// 提现列表数据
const withdrawals = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50]
})

// 状态选项
const statusOptions = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' }
]

// 表格列配置
const columns: DataTableColumns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '用户地址',
    key: 'userAddress',
    render: (row) => formatAddress(row.userAddress)
  },
  {
    title: '提现金额',
    key: 'amount',
    render: (row) => `${formatAmount(row.amount)} MATIC`
  },
  {
    title: '状态',
    key: 'status',
    render: (row) => {
      const statusMap = {
        pending: { text: '待审核', type: 'warning' },
        approved: { text: '已通过', type: 'success' },
        rejected: { text: '已拒绝', type: 'error' }
      }
      const status = statusMap[row.status]
      return h(NTag, { type: status.type }, () => status.text)
    }
  },
  {
    title: '申请时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      const buttons = [
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'info',
            class: 'mr-2',
            onClick: () => handleViewDetails(row)
          },
          () => '详情'
        )
      ]

      if (row.status === 'pending') {
        buttons.push(
          h(
            NButton,
            {
              size: 'small',
              quaternary: true,
              type: 'warning',
              onClick: () => handleAudit(row)
            },
            () => '审核'
          )
        )
      }

      return buttons
    }
  }
]

// 审核对话框
const showAuditModal = ref(false)
const auditFormRef = ref<FormInst | null>(null)
const selectedWithdrawal = ref(null)
const auditForm = reactive({
  status: '',
  remark: '',
  txHash: ''
})
const auditRules = {
  status: {
    required: true,
    message: '请选择审核结果',
    trigger: 'blur'
  },
  remark: {
    required: true,
    message: '请输入审核意见',
    trigger: 'blur'
  },
  txHash: {
    required: true,
    message: '请输入交易哈希',
    trigger: 'blur'
  }
}

// 详情对话框
const showDetailsModal = ref(false)

// 获取状态类型
const getStatusType = (status?: string) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error'
  }
  return typeMap[status || ''] || 'default'
}

// 获取状态文本
const getStatusText = (status?: string) => {
  const textMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return textMap[status || ''] || '未知'
}

// 事件处理函数
const handleSearch = useDebounceFn(() => {
  pagination.value.page = 1
  fetchWithdrawals()
}, 300)

const handleFilter = () => {
  pagination.value.page = 1
  fetchWithdrawals()
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
  fetchWithdrawals()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
  fetchWithdrawals()
}

const handleViewDetails = (withdrawal: any) => {
  selectedWithdrawal.value = withdrawal
  showDetailsModal.value = true
}

const handleAudit = (withdrawal: any) => {
  selectedWithdrawal.value = withdrawal
  auditForm.status = ''
  auditForm.remark = ''
  auditForm.txHash = ''
  showAuditModal.value = true
}

const handleAuditConfirm = async () => {
  if (!auditFormRef.value || !selectedWithdrawal.value) return
  
  try {
    await auditFormRef.value.validate()
    // 这里添加审核 API 调用
    message.success('审核成功')
    showAuditModal.value = false
    fetchWithdrawals()
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('操作失败')
    }
  }
}

// 获取提现列表
const fetchWithdrawals = async () => {
  loading.value.table = true
  try {
    // 这里添加获取提现列表的 API 调用
    // 使用模拟数据
    withdrawals.value = [
      {
        id: 1,
        userAddress: '0x1234567890abcdef1234567890abcdef12345678',
        amount: '1000',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ]
    pagination.value.total = 100
  } catch (error) {
    message.error('获取提现列表失败')
  } finally {
    loading.value.table = false
  }
}

// 获取统计数据
const fetchStats = async () => {
  loading.value.stats = true
  try {
    // 这里添加获取统计数据的 API 调用
    // 使用模拟数据
    stats.value = {
      total: { label: '总提现金额', value: '1,000,000 MATIC' },
      pending: { label: '待审核', value: 10 },
      today: { label: '今日提现', value: '10,000 MATIC' },
      avgTime: { label: '平均审核时长', value: '2h' }
    }
  } catch (error) {
    message.error('获取统计数据失败')
  } finally {
    loading.value.stats = false
  }
}

// 初始化
onMounted(() => {
  fetchStats()
  fetchWithdrawals()
})
</script> 