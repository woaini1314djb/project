<template>
  <div class="flex flex-col items-center gap-4">
    <button
      v-if="!wallet.connected"
      @click="connectWallet"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Connect Wallet
    </button>
    <div v-else class="text-center">
      <p class="text-gray-700">Connected Address:</p>
      <p class="font-mono">{{ shortenAddress(wallet.address) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/modules/wallet';
import { storeToRefs } from 'pinia';

const walletStore = useWalletStore();
const wallet = storeToRefs(walletStore);

const connectWallet = async () => {
  try {
    await walletStore.connectWallet();
  } catch (error) {
    console.error(error);
  }
};

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
</script> 