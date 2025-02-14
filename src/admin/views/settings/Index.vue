<template>
  <div class="container px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      系统设置
    </h2>

    <!-- 设置卡片 -->
    <div class="grid gap-6 mb-8 md:grid-cols-2">
      <!-- 基础设置 -->
      <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          基础设置
        </h4>
        <div class="space-y-4">
          <!-- 系统名称 -->
          <div>
            <label class="block text-sm text-gray-700 dark:text-gray-400">
              系统名称
            </label>
            <input
              v-model="settings.siteName"
              type="text"
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </div>

          <!-- 系统描述 -->
          <div>
            <label class="block text-sm text-gray-700 dark:text-gray-400">
              系统描述
            </label>
            <textarea
              v-model="settings.description"
              rows="3"
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-textarea"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 收益设置 -->
      <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          收益设置
        </h4>
        <div class="space-y-4">
          <!-- 基础收益率 -->
          <div>
            <label class="block text-sm text-gray-700 dark:text-gray-400">
              基础收益率 (%)
            </label>
            <input
              v-model="settings.baseRate"
              type="number"
              step="0.01"
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </div>

          <!-- 最大收益率 -->
          <div>
            <label class="block text-sm text-gray-700 dark:text-gray-400">
              最大收益率 (%)
            </label>
            <input
              v-model="settings.maxRate"
              type="number"
              step="0.01"
              class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
      >
        保存设置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const settings = ref({
  siteName: '验证者平台',
  description: '基于 Polygon 网络的多链验证交易平台',
  baseRate: 0.32,
  maxRate: 1.3
})

const saveSettings = async () => {
  try {
    // 这里添加保存设置的逻辑
    message.success('设置保存成功')
  } catch (error) {
    message.error('设置保存失败')
  }
}
</script> 