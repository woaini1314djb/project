<template>
  <!-- 侧边栏导航 -->
  <aside class="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg">
    <nav class="mt-5 px-2">
      <!-- 导航菜单项 -->
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
        :class="[
          // 当前路由高亮样式
          $route.path === item.href
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
        ]"
      >
        <!-- 菜单图标 -->
        <component
          :is="item.icon"
          class="mr-4 flex-shrink-0 h-6 w-6"
          :class="[
            // 图标颜色样式
            $route.path === item.href
              ? 'text-gray-500 dark:text-gray-300'
              : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
          ]"
          aria-hidden="true"
        />
        {{ item.name }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// 导入图标组件
import {
  HomeIcon,
  CubeIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

// 导航菜单配置
const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Mining', href: '/mining', icon: CubeIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]
</script> 