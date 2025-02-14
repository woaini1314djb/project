<template>
  <n-modal
    v-model:show="show"
    :title="'用户详情 - ' + formatAddress(user?.address || '')"
    preset="card"
    style="width: 600px"
  >
    <div class="space-y-4">
      <!-- 用户基本信息 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ID</label>
          <div class="mt-1">{{ user?.id }}</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">状态</label>
          <div class="mt-1">
            <n-tag :type="getStatusType(user?.status)">
              {{ getStatusText(user?.status) }}
            </n-tag>
          </div>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700">钱包地址</label>
          <div class="mt-1">{{ user?.address }}</div>
        </div>
      </div>

      <!-- 交易统计 -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-medium">交易统计</h3>
        <!-- 添加交易统计信息 -->
      </div>

      <!-- 验证记录 -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-medium">验证记录</h3>
        <!-- 添加验证记录信息 -->
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-4">
        <n-button @click="show = false">关闭</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@/admin/types'
import { USER_STATUS } from '@/admin/constants'
import { formatAddress } from '@/admin/utils'

const props = defineProps<{
  visible: boolean
  user?: User
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const show = ref(props.visible)

watch(() => props.visible, val => {
  show.value = val
})

watch(() => show.value, val => {
  emit('update:visible', val)
})

const getStatusType = (status?: string) => {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return 'success'
    case USER_STATUS.INACTIVE:
      return 'warning'
    case USER_STATUS.BLOCKED:
      return 'error'
    default:
      return 'default'
  }
}

const getStatusText = (status?: string) => {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return '活跃'
    case USER_STATUS.INACTIVE:
      return '未激活'
    case USER_STATUS.BLOCKED:
      return '已封禁'
    default:
      return '未知'
  }
}
</script> 