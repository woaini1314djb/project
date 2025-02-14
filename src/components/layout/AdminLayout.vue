<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white dark:bg-gray-800">
      <div class="h-16 flex items-center justify-center">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">管理后台</h2>
      </div>
      <nav class="mt-6">
        <div class="px-4 py-2">
          <router-link
            v-for="item in adminMenus"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark:text-gray-300 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <header class="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6">
        <h1 class="text-lg font-semibold text-gray-800 dark:text-white">仪表盘</h1>
        <div class="flex items-center">
          <ThemeToggle />
          <button class="ml-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            退出登录
          </button>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '../common/ThemeToggle.vue'

const adminMenus = [
  { name: '仪表盘', path: '/admin' },
  { name: '用户管理', path: '/admin/users' },
  { name: '矿机管理', path: '/admin/miners' },
  { name: '收益统计', path: '/admin/earnings' },
  { name: '系统设置', path: '/admin/settings' }
]
</script> 