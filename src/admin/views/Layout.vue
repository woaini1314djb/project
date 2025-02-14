<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 侧边栏 -->
    <AdminSidebar :isOpen="isSidebarOpen" @close="closeSidebar" />

    <div class="flex flex-col flex-1">
      <!-- 顶部导航栏 -->
      <AdminHeader @toggle-sidebar="toggleSidebar" />

      <!-- 主内容区域 -->
      <main class="h-full overflow-y-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminHeader from '../components/AdminHeader.vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script> 