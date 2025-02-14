<template>
  <div class="container px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      代理管理
    </h2>

    <!-- 统计卡片 -->
    <n-spin :show="loading.stats">
      <div class="grid gap-6 mb-8 md:grid-cols-4">
        <!-- 总代理数 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              总代理数
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.totalAgents }}
            </p>
          </div>
        </div>
        <!-- 代理用户数 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              代理用户数
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.totalUsers }}
            </p>
          </div>
        </div>
        <!-- 总佣金 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              总佣金
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ formatAmount(stats.totalCommission) }} MATIC
            </p>
          </div>
        </div>
        <!-- 今日佣金 -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              今日佣金
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ formatAmount(stats.todayCommission) }} MATIC
            </p>
          </div>
        </div>
      </div>
    </n-spin>

    <!-- 搜索和操作 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="w-full sm:w-1/3 mb-4 sm:mb-0">
        <n-input-group>
          <n-input
            v-model:value="searchQuery"
            type="text"
            placeholder="搜索代理地址..."
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
        <n-button type="primary" @click="handleAddAgent">
          添加代理
        </n-button>
      </div>
    </div>

    <!-- 代理列表 -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <n-data-table
          :columns="columns"
          :data="agents"
          :loading="loading.table"
          :pagination="pagination"
          :bordered="false"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    </div>

    <!-- 添加代理对话框 -->
    <n-modal
      v-model:show="showAddModal"
      preset="dialog"
      title="添加代理"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleAddConfirm"
      @negative-click="showAddModal = false"
    >
      <n-form
        ref="addFormRef"
        :model="addForm"
        :rules="addRules"
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="addForm.username"
            placeholder="请输入登录用户名"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="addForm.password"
            type="password"
            placeholder="请输入登录密码"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="代理地址" path="address">
          <n-input
            v-model:value="addForm.address"
            placeholder="请输入代理钱包地址"
          />
        </n-form-item>
        <n-form-item label="佣金比例" path="commission">
          <n-input-number
            v-model:value="addForm.commission"
            :min="0"
            :max="100"
            :precision="2"
            placeholder="请输入佣金比例"
          >
            <template #suffix>%</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="addForm.remark"
            type="textarea"
            placeholder="请输入备注信息"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 代理详情对话框 -->
    <n-modal
      v-model:show="showDetailsModal"
      preset="card"
      style="width: 800px"
      :title="'代理详情 #' + selectedAgent?.id"
    >
      <n-tabs type="line">
        <!-- 基本信息 -->
        <n-tab-pane name="basic" tab="基本信息">
          <n-descriptions bordered>
            <n-descriptions-item label="代理地址">
              {{ formatAddress(selectedAgent?.address || '') }}
            </n-descriptions-item>
            <n-descriptions-item label="佣金比例">
              {{ selectedAgent?.commission }}%
            </n-descriptions-item>
            <n-descriptions-item label="用户数量">
              {{ selectedAgent?.users || 0 }}
            </n-descriptions-item>
            <n-descriptions-item label="创建时间">
              {{ formatDate(selectedAgent?.createdAt || '') }}
            </n-descriptions-item>
            <n-descriptions-item label="备注" :span="3">
              {{ selectedAgent?.remark || '-' }}
            </n-descriptions-item>
          </n-descriptions>
        </n-tab-pane>

        <!-- 佣金记录 -->
        <n-tab-pane name="commission" tab="佣金记录">
          <n-data-table
            :columns="commissionColumns"
            :data="commissionRecords"
            :pagination="{ pageSize: 5 }"
          />
        </n-tab-pane>

        <!-- 用户列表 -->
        <n-tab-pane name="users" tab="用户列表">
          <n-data-table
            :columns="userColumns"
            :data="userList"
            :pagination="{ pageSize: 5 }"
          />
        </n-tab-pane>
      </n-tabs>
    </n-modal>

    <!-- 添加编辑代理对话框 -->
    <n-modal
      v-model:show="showEditModal"
      preset="dialog"
      title="编辑代理"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleEditConfirm"
      @negative-click="showEditModal = false"
    >
      <n-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="editForm.username"
            placeholder="请输入登录用户名"
            disabled
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="editForm.password"
            type="password"
            placeholder="不修改请留空"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="佣金比例" path="commission">
          <n-input-number
            v-model:value="editForm.commission"
            :min="0"
            :max="100"
            :precision="2"
            placeholder="请输入佣金比例"
          >
            <template #suffix>%</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="editForm.remark"
            type="textarea"
            placeholder="请输入备注信息"
          />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import type { DataTableColumns, FormInst } from 'naive-ui'
import { 
  NButton, 
  NTag, 
  NSelect, 
  NDataTable, 
  NInput,
  NInputNumber,
  NModal, 
  NForm, 
  NFormItem,
  NSpin,
  NInputGroup,
  NDescriptions,
  NDescriptionsItem,
  NTabs,
  NTabPane
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
  totalAgents: 0,
  totalUsers: 0,
  totalCommission: 0,
  todayCommission: 0
})

// 代理列表数据
const agents = ref([])
const searchQuery = ref('')
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50]
})

// 表格列配置
const columns: DataTableColumns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '代理地址',
    key: 'address',
    render: (row) => formatAddress(row.address)
  },
  {
    title: '佣金比例',
    key: 'commission',
    render: (row) => `${row.commission}%`
  },
  {
    title: '用户数量',
    key: 'users'
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      const statusMap = {
        active: { text: '正常', type: 'success' },
        disabled: { text: '禁用', type: 'error' }
      }
      const status = statusMap[row.status] || { text: '未知', type: 'default' }
      return h(NTag, { type: status.type }, () => status.text)
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return [
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
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'warning',
            class: 'mr-2',
            onClick: () => handleEditAgent(row)
          },
          () => '编辑'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: row.status === 'active' ? 'error' : 'success',
            onClick: () => handleToggleStatus(row)
          },
          () => row.status === 'active' ? '禁用' : '启用'
        )
      ]
    }
  }
]

// 佣金记录列配置
const commissionColumns: DataTableColumns = [
  {
    title: '时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  },
  {
    title: '来源用户',
    key: 'userAddress',
    render: (row) => formatAddress(row.userAddress)
  },
  {
    title: '佣金金额',
    key: 'amount',
    render: (row) => `${formatAmount(row.amount)} MATIC`
  },
  {
    title: '类型',
    key: 'type',
    render: (row) => {
      const typeMap = {
        stake: { text: '质押', type: 'success' },
        reward: { text: '奖励', type: 'info' }
      }
      const type = typeMap[row.type]
      return h(NTag, { type: type.type }, () => type.text)
    }
  }
]

// 添加用户列表列配置
const userColumns: DataTableColumns = [
  {
    title: '用户地址',
    key: 'address',
    render: (row) => formatAddress(row.address)
  },
  {
    title: '余额',
    key: 'balance',
    render: (row) => `${formatAmount(row.balance)} MATIC`
  },
  {
    title: '质押金额',
    key: 'stakedAmount',
    render: (row) => `${formatAmount(row.stakedAmount)} MATIC`
  },
  {
    title: '创建时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  }
]

// 添加用户列表数据
const userList = ref([])

// 添加代理表单
const showAddModal = ref(false)
const addFormRef = ref<FormInst | null>(null)
const addForm = reactive({
  username: '',
  password: '',
  address: '',
  commission: null,
  remark: ''
})
const addRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  address: {
    required: true,
    message: '请输入代理地址',
    trigger: 'blur'
  },
  commission: {
    required: true,
    message: '请输入佣金比例',
    trigger: 'blur'
  }
}

// 详情对话框
const showDetailsModal = ref(false)
const selectedAgent = ref(null)
const commissionRecords = ref([])

// 添加编辑代理对话框
const showEditModal = ref(false)
const editFormRef = ref<FormInst | null>(null)
const editForm = reactive({
  username: '',
  password: '',
  commission: null,
  remark: ''
})
const editRules = {
  commission: {
    required: true,
    message: '请输入佣金比例',
    trigger: 'blur'
  }
}

// 事件处理函数
const handleSearch = useDebounceFn(() => {
  pagination.value.page = 1
  fetchAgents()
}, 300)

const handleFilter = () => {
  pagination.value.page = 1
  fetchAgents()
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
  fetchAgents()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
  fetchAgents()
}

const handleAddAgent = () => {
  Object.assign(addForm, {
    username: '',
    password: '',
    address: '',
    commission: null,
    remark: ''
  })
  showAddModal.value = true
}

const handleAddConfirm = async () => {
  if (!addFormRef.value) return
  
  try {
    await addFormRef.value.validate()
    // 这里添加创建代理的 API 调用
    message.success('添加成功')
    showAddModal.value = false
    fetchAgents()
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('操作失败')
    }
  }
}

const handleViewDetails = async (agent: any) => {
  selectedAgent.value = agent
  showDetailsModal.value = true
  
  try {
    // 这里添加获取佣金记录和用户列表的 API 调用
    commissionRecords.value = []
    userList.value = []
  } catch (error) {
    message.error('获取详情失败')
  }
}

const handleEditAgent = (agent: any) => {
  selectedAgent.value = agent
  editForm.username = agent.username
  editForm.commission = agent.commission
  editForm.remark = agent.remark
  showEditModal.value = true
}

const handleEditConfirm = async () => {
  if (!editFormRef.value) return
  
  try {
    await editFormRef.value.validate()
    // 这里添加编辑代理的 API 调用
    message.success('编辑成功')
    showEditModal.value = false
    fetchAgents()
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('操作失败')
    }
  }
}

const handleToggleStatus = async (agent: any) => {
  try {
    // 这里添加更新状态的 API 调用
    message.success('状态更新成功')
    fetchAgents()
  } catch (error) {
    message.error('操作失败')
  }
}

// 获取代理列表
const fetchAgents = async () => {
  loading.value.table = true
  try {
    // 使用模拟数据
    agents.value = [
      {
        id: 1,
        username: 'agent001',
        address: '0x1234567890abcdef1234567890abcdef12345678',
        commission: 10,
        users: 100,
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ]
    pagination.value.total = 100
  } catch (error) {
    message.error('获取代理列表失败')
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
      totalAgents: 100,
      totalUsers: 1000,
      totalCommission: '100,000 MATIC',
      todayCommission: '1,000 MATIC'
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
  fetchAgents()
})
</script>
