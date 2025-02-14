<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavBar />
    <div class="flex">
      <main class="flex-1">
        <router-view />
      </main>
    </div>
    <!-- 根据路由和钱包状态控制页脚显示 -->
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWalletStore } from '@/stores/wallet';
import NavBar from '../NavBar.vue';
import Footer from './Footer.vue';

const route = useRoute();
const wallet = useWalletStore();

// 控制页脚显示的计算属性
const showFooter = computed(() => {
  // 如果钱包已连接且在 Mining 或 Profile 页面，则隐藏页脚
  if (wallet.isConnected && (route.path === '/mining' || route.path === '/profile')) {
    return false;
  }
  // 其他情况显示页脚
  return true;
});
</script> 