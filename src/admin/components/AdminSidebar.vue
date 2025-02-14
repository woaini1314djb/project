<template>
  <aside
    :class="[
      'fixed inset-y-0 z-20 flex-shrink-0 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:static md:block',
      isOpen ? 'block' : 'hidden'
    ]"
  >
    <div class="py-4">
      <div class="px-6 py-2">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">管理后台</h2>
      </div>
      <nav class="mt-4 px-4">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 mt-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg"
          :class="{ 'bg-purple-50 dark:bg-gray-700': isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])

const route = useRoute()

const menuItems = [
  { name: '总控台', path: '/admin/dashboard' },
  { name: '代理管理', path: '/admin/agents' },
  { name: '用户管理', path: '/admin/users' },
  { name: '提现管理', path: '/admin/withdrawals' },
  { name: '交易记录', path: '/admin/transactions' }
]

const isActive = (path: string) => route.path.startsWith(path)
</script> 