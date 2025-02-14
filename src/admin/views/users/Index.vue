<template>
  <div class="container px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      用户管理
    </h2>

    <!-- 统计卡片 -->
    <n-spin :show="loading.stats">
      <div class="grid gap-6 mb-8 md:grid-cols-4">
        <div v-for="(stat, key) in stats" :key="key" 
             class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
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
        <n-button-group>
          <n-button
            :disabled="!selectedRowKeys.length"
            @click="handleBatchAction('active')"
          >
            批量激活
          </n-button>
          <n-button
            :disabled="!selectedRowKeys.length"
            @click="handleBatchAction('blocked')"
            type="error"
          >
            批量封禁
          </n-button>
        </n-button-group>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <n-data-table
          :columns="columns"
          :data="users"
          :loading="loading.table"
          :pagination="pagination"
          :bordered="false"
          :row-key="row => row.id"
          :row-props="rowProps"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          @update:sorter="handleSorterChange"
          @update:checked-row-keys="handleCheckedRowKeysChange"
        />
      </div>
    </div>

    <!-- 用户详情对话框 -->
    <user-details-dialog
      v-model:visible="showUserDetails"
      :user="selectedUser"
    />

    <!-- 状态更新对话框 -->
    <n-modal
      v-model:show="showStatusModal"
      preset="dialog"
      title="更新用户状态"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleStatusConfirm"
      @negative-click="showStatusModal = false"
    >
      <n-form
        ref="formRef"
        :model="statusForm"
        :rules="statusRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="新状态" path="status">
          <n-select
            v-model:value="statusForm.status"
            :options="statusOptions"
            placeholder="请选择新状态"
          />
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="statusForm.remark"
            type="textarea"
            placeholder="请输入状态变更原因"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 批量操作确认对话框 -->
    <n-modal
      v-model:show="showBatchModal"
      preset="dialog"
      :title="batchActionTitle"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleBatchConfirm"
      @negative-click="showBatchModal = false"
    >
      <n-form
        ref="batchFormRef"
        :model="batchForm"
        :rules="batchRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="batchForm.remark"
            type="textarea"
            placeholder="请输入操作原因"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 日志对话框 -->
    <n-modal
      v-model:show="showLogModal"
      preset="card"
      style="width: 800px"
      title="操作日志"
    >
      <n-data-table
        :columns="logColumns"
        :data="logs"
        :pagination="{ pageSize: 10 }"
      />
    </n-modal>

    <!-- 奖励对话框 -->
    <n-modal
      v-model:show="showRewardModal"
      preset="dialog"
      title="发放奖励"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleRewardConfirm"
    >
      <n-form
        ref="rewardFormRef"
        :model="rewardForm"
        :rules="rewardRules"
      >
        <n-form-item label="奖励类型" path="type">
          <n-select
            v-model:value="rewardForm.type"
            :options="rewardTypeOptions"
          />
        </n-form-item>
        <n-form-item label="奖励数量" path="amount">
          <n-input-number
            v-model:value="rewardForm.amount"
            :min="0"
          />
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="rewardForm.remark"
            type="textarea"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 转移对话框 -->
    <n-modal
      v-model:show="showTransferModal"
      preset="dialog"
      title="转移用户"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleTransferConfirm"
    >
      <n-form
        ref="transferFormRef"
        :model="transferForm"
        :rules="transferRules"
      >
        <n-form-item label="目标地址" path="toAddress">
          <n-input
            v-model:value="transferForm.toAddress"
            placeholder="请输入目标钱包地址"
          />
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="transferForm.remark"
            type="textarea"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 虚拟对话框 -->
    <n-modal
      v-model:show="showVirtualModal"
      preset="dialog"
      title="虚拟操作"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleVirtualConfirm"
    >
      <!-- 添加虚拟操作相关表单 -->
    </n-modal>

    <!-- 质押对话框 -->
    <n-modal
      v-model:show="showStakeModal"
      preset="dialog"
      title="质押操作"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleStakeConfirm"
    >
      <!-- 添加质押操作相关表单 -->
    </n-modal>

    <!-- 静默对话框 -->
    <n-modal
      v-model:show="showSilenceModal"
      preset="dialog"
      title="静默操作"
      positive-text="确认"
      negative-text="取消"
      @positive-click="handleSilenceConfirm"
    >
      <!-- 添加静默操作相关表单 -->
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, onMounted, computed } from 'vue'
import { useMessage } from 'naive-ui'
import type { DataTableColumns, FormInst } from 'naive-ui'
import { NButton, NTag, NSelect, NDataTable, NInput, NModal, NForm, NFormItem, NSpin, NInputGroup, NButtonGroup } from 'naive-ui'
import { useDebounceFn } from '@vueuse/core'
import { userService } from '@/admin/services/user'
import { USER_STATUS } from '@/admin/constants'
import { formatDate, formatAddress } from '@/admin/utils'
import type { User } from '@/admin/types'
import UserDetailsDialog from '@/admin/components/users/UserDetailsDialog.vue'
import type { SorterResult } from 'naive-ui/es/data-table/src/interface'

const message = useMessage()
const formRef = ref<FormInst | null>(null)

// 加载状态
const loading = ref({
  stats: false,
  table: false
})

// 统计数据
const stats = ref({
  total: { label: '总用户数', value: 0 },
  active: { label: '活跃用户', value: 0 },
  inactive: { label: '未激活', value: 0 },
  blocked: { label: '已封禁', value: 0 }
})

// 用户列表数据
const users = ref<User[]>([])
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
  { label: '活跃', value: USER_STATUS.ACTIVE },
  { label: '未激活', value: USER_STATUS.INACTIVE },
  { label: '已封禁', value: USER_STATUS.BLOCKED }
]

// 添加选中行状态
const selectedRowKeys = ref<number[]>([])

// 添加排序状态
const sorter = ref<SorterResult>({})

// 添加批量操作相关状态
const showBatchModal = ref(false)
const batchActionType = ref('')
const batchForm = reactive({
  remark: ''
})
const batchFormRef = ref<FormInst | null>(null)
const batchRules = {
  remark: {
    required: true,
    message: '请输入操作原因',
    trigger: 'blur'
  }
}

// 计算批量操作标题
const batchActionTitle = computed(() => {
  const actionMap = {
    active: '批量激活',
    blocked: '批量封禁'
  }
  return actionMap[batchActionType.value] || '批量操作'
})

// 表格列配置
const columns: DataTableColumns<User> = [
  {
    type: 'selection'
  },
  {
    title: 'ID',
    key: 'id',
    sorter: true
  },
  {
    title: '钱包地址',
    key: 'address',
    render: (row) => formatAddress(row.address)
  },
  {
    title: '状态',
    key: 'status',
    render: (row) => {
      const statusMap = {
        [USER_STATUS.ACTIVE]: { text: '活跃', type: 'success' },
        [USER_STATUS.INACTIVE]: { text: '未激活', type: 'warning' },
        [USER_STATUS.BLOCKED]: { text: '已封禁', type: 'error' }
      }
      const status = statusMap[row.status]
      return h(NTag, { type: status.type }, () => status.text)
    }
  },
  {
    title: '注册时间',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt)
  },
  {
    title: '操作',
    key: 'actions',
    width: 400,
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
          () => '查看'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'default',
            class: 'mr-2',
            onClick: () => handleViewLogs(row)
          },
          () => '日志'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'success',
            class: 'mr-2',
            onClick: () => handleReward(row)
          },
          () => '奖励'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'info',
            class: 'mr-2',
            onClick: () => handleTransfer(row)
          },
          () => '转移'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'warning',
            class: 'mr-2',
            onClick: () => handleVirtual(row)
          },
          () => '虚拟'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'primary',
            class: 'mr-2',
            onClick: () => handleStake(row)
          },
          () => '质押'
        ),
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: 'error',
            onClick: () => handleSilence(row)
          },
          () => '静默'
        )
      ]
    }
  }
]

// 用户详情对话框
const showUserDetails = ref(false)
const selectedUser = ref<User | null>(null)

// 状态更新对话框
const showStatusModal = ref(false)
const statusForm = reactive({
  status: '',
  remark: ''
})
const statusRules = {
  status: {
    required: true,
    message: '请选择新状态',
    trigger: 'blur'
  }
}

// 添加行属性配置
const rowProps = (row: User) => {
  return {
    style: row.status === USER_STATUS.BLOCKED ? 'opacity: 0.5;' : ''
  }
}

// 获取用户统计数据
const fetchStats = async () => {
  loading.value.stats = true
  try {
    const data = await userService.getUserStats()
    stats.value = {
      total: { label: '总用户数', value: data.total },
      active: { label: '活跃用户', value: data.active },
      inactive: { label: '未激活', value: data.inactive },
      blocked: { label: '已封禁', value: data.blocked }
    }
  } catch (error) {
    message.error('获取统计数据失败')
  } finally {
    loading.value.stats = false
  }
}

// 获取用户列表
const fetchUsers = async () => {
  loading.value.table = true
  try {
    const { list, total } = await userService.getUsers({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      status: statusFilter.value,
      search: searchQuery.value,
      sortBy: sorter.value.columnKey,
      sortOrder: sorter.value.order
    })
    users.value = list
    pagination.value.total = total
  } catch (error) {
    message.error('获取用户列表失败')
  } finally {
    loading.value.table = false
  }
}

// 事件处理
const handleSearch = useDebounceFn(() => {
  pagination.value.page = 1
  fetchUsers()
}, 300)

const handleFilter = () => {
  pagination.value.page = 1
  fetchUsers()
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
  fetchUsers()
}

const handleViewDetails = (user: User) => {
  selectedUser.value = user
  showUserDetails.value = true
}

const handleUpdateStatus = (user: User) => {
  selectedUser.value = user
  statusForm.status = user.status
  statusForm.remark = ''
  showStatusModal.value = true
}

const handleStatusConfirm = async () => {
  if (!selectedUser.value || !formRef.value) return
  
  try {
    await formRef.value.validate()
    await userService.updateUserStatus(selectedUser.value.id, statusForm.status)
    message.success('状态更新成功')
    showStatusModal.value = false
    fetchUsers()
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('操作失败')
    }
  }
}

// 处理分页大小变更
const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
  fetchUsers()
}

// 处理排序变更
const handleSorterChange = (result: SorterResult) => {
  sorter.value = result
  fetchUsers()
}

// 处理选中行变更
const handleCheckedRowKeysChange = (keys: number[]) => {
  selectedRowKeys.value = keys
}

// 处理批量操作
const handleBatchAction = (type: string) => {
  batchActionType.value = type
  batchForm.remark = ''
  showBatchModal.value = true
}

// 处理批量操作确认
const handleBatchConfirm = async () => {
  if (!batchFormRef.value) return
  
  try {
    await batchFormRef.value.validate()
    await userService.batchUpdateStatus({
      ids: selectedRowKeys.value,
      status: batchActionType.value,
      remark: batchForm.remark
    })
    message.success('操作成功')
    showBatchModal.value = false
    selectedRowKeys.value = []
    fetchUsers()
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('操作失败')
    }
  }
}

// 添加新的状态和引用
const showLogModal = ref(false)
const showRewardModal = ref(false)
const showTransferModal = ref(false)
const showVirtualModal = ref(false)
const showStakeModal = ref(false)
const showSilenceModal = ref(false)

// 添加新的处理函数
const handleViewLogs = (user: User) => {
  selectedUser.value = user
  showLogModal.value = true
}

const handleReward = (user: User) => {
  selectedUser.value = user
  showRewardModal.value = true
}

const handleTransfer = (user: User) => {
  selectedUser.value = user
  showTransferModal.value = true
}

const handleVirtual = (user: User) => {
  selectedUser.value = user
  showVirtualModal.value = true
}

const handleStake = (user: User) => {
  selectedUser.value = user
  showStakeModal.value = true
}

const handleSilence = (user: User) => {
  selectedUser.value = user
  showSilenceModal.value = true
}

// 初始化
onMounted(() => {
  fetchStats()
  fetchUsers()
})
</script> 