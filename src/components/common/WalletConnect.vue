<template>
  <button
    @click="connectWallet"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <template v-if="isConnected">
      {{ shortAddress }}
    </template>
    <template v-else>
      连接钱包
    </template>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 钱包连接状态
const isConnected = ref(false);
// 钱包地址
const address = ref('');

// 格式化后的短地址
const shortAddress = computed(() => {
  if (!address.value) return '';
  return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
});

// 连接钱包
const connectWallet = async () => {
  try {
    // 这里添加实际的钱包连接逻辑
    console.log('连接钱包');
    isConnected.value = true;
    address.value = '0x1234567890123456789012345678901234567890';
  } catch (error) {
    console.error('钱包连接失败:', error);
  }
};
</script> 