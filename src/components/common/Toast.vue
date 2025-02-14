<template>
  <TransitionGroup
    tag="div"
    class="fixed top-4 right-4 z-50 space-y-4"
    enter="transform ease-out duration-300 transition"
    enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to="translate-y-0 opacity-100 sm:translate-x-0"
    leave="transition ease-in duration-100"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div class="p-4">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ toast.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

const toasts = ref<Toast[]>([]);
</script> 