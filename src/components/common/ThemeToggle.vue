<template>
  <!-- 主题切换按钮 -->
  <button
    @click="toggleTheme"
    class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
  >
    <sun-icon v-if="isDark" class="h-5 w-5" />
    <moon-icon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

// 深色模式状态
const isDark = ref(false);

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

// 组件挂载时初始化主题
onMounted(() => {
  // 检查本地存储或系统偏好
  isDark.value = localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  }
});
</script> 