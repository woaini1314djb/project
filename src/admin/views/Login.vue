<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-8">
      <!-- 标题区域 -->
      <div>
        <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          验证者平台
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          管理后台登录
        </p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-white dark:bg-gray-800 py-6 px-6 shadow rounded-lg">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- 账号 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              账号
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="h-9 block w-full rounded-md border border-gray-300 px-3 shadow-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              :disabled="loading"
            />
            <div v-if="errors.username" class="mt-1 text-xs text-red-500">
              {{ errors.username }}
            </div>
          </div>

          <!-- 密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              密码
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="h-9 block w-full rounded-md border border-gray-300 px-3 pr-10 shadow-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                :disabled="loading"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <svg
                  class="h-5 w-5 text-gray-400 hover:text-gray-500"
                  :class="{ 'text-purple-500': showPassword }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <div v-if="errors.password" class="mt-1 text-xs text-red-500">
              {{ errors.password }}
            </div>
          </div>

          <!-- 验证码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              验证码
            </label>
            <div class="flex space-x-2">
              <input
                v-model="form.captcha"
                required
                class="h-9 block w-full rounded-md border border-gray-300 px-3 shadow-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                :disabled="loading"
              />
              <img
                :src="captchaUrl"
                alt="验证码"
                class="h-9 w-24 rounded cursor-pointer"
                @click="refreshCaptcha"
              />
            </div>
            <div v-if="errors.captcha" class="mt-1 text-xs text-red-500">
              {{ errors.captcha }}
            </div>
          </div>

          <!-- 记住我 -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              :disabled="loading"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              记住我
            </label>
          </div>

          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="h-9 w-full flex items-center justify-center rounded-md border border-transparent bg-purple-600 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <template v-if="loading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              登录中...
            </template>
            <template v-else>
              登录
            </template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useAdminStore } from '@/admin/stores/admin'

const router = useRouter()
const message = useMessage()
const adminStore = useAdminStore()

const loading = ref(false)
const showPassword = ref(false)
const captchaUrl = ref('/api/admin/captcha')

const form = reactive({
  username: '',
  password: '',
  captcha: '',
  remember: false
})

const errors = reactive({
  username: '',
  password: '',
  captcha: ''
})

// 刷新验证码
const refreshCaptcha = () => {
  captchaUrl.value = `/api/admin/captcha?t=${Date.now()}`
}

// 表单验证
const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''
  errors.captcha = ''

  if (!form.username) {
    errors.username = '请输入账号'
    isValid = false
  }

  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  }

  if (!form.captcha) {
    errors.captcha = '请输入验证码'
    isValid = false
  }

  return isValid
}

// 处理登录
const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await adminStore.login({
      username: form.username,
      password: form.password,
      captcha: form.captcha,
      remember: form.remember
    })
    
    message.success('登录成功')
    router.push('/admin/dashboard')
  } catch (error: any) {
    message.error(error.message || '登录失败')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}
</script> 