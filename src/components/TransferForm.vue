<template>
  <form @submit.prevent="handleTransfer" class="max-w-md mx-auto p-4">
    <div class="mb-4">
      <label class="block text-gray-700 mb-2">Recipient Address</label>
      <input
        v-model="recipient"
        type="text"
        class="w-full px-3 py-2 border rounded"
        placeholder="0x..."
      />
    </div>
    
    <div class="mb-4">
      <label class="block text-gray-700 mb-2">Amount (USDT)</label>
      <input
        v-model="amount"
        type="text"
        class="w-full px-3 py-2 border rounded"
        placeholder="0.00"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      :disabled="!wallet.connected"
    >
      Transfer USDT
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWalletStore } from '@/store/modules/wallet';
import { storeToRefs } from 'pinia';

const walletStore = useWalletStore();
const wallet = storeToRefs(walletStore);

const recipient = ref('');
const amount = ref('');

const handleTransfer = async () => {
  try {
    const tx = await walletStore.transferUSDT(recipient.value, amount.value);
    console.log('Transaction hash:', tx);
    // 清空表单
    recipient.value = '';
    amount.value = '';
  } catch (error) {
    console.error('Transfer failed:', error);
  }
};
</script> 