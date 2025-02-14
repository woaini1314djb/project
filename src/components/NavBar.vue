<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useWalletStore } from '../stores/wallet'
import { useRouter, useRoute } from 'vue-router'

const wallet = useWalletStore()
const router = useRouter()
const route = useRoute()

// 导航链接配置
const navLinks = [
  { 
    to: '/mining', 
    text: '验证', 
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' // 简化的加号图标
  },
  { 
    to: '/profile', 
    text: '个人', 
    icon: 'M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21' // 用户图标
  }
]

// 语言配置
const languages = [
  { name: '简体中文', code: 'zh-CN', icon: '🇨🇳' },
  { name: 'English', code: 'en-US', icon: '🇺🇸' },
  { name: '日本語', code: 'ja-JP', icon: '🇯🇵' },
  { name: '한국어', code: 'ko-KR', icon: '🇰🇷' }
]

const showLanguageMenu = ref(false)
const selectedLanguage = ref(languages[0])
const languageMenuRef = ref<HTMLElement | null>(null)

// 处理语言切换
const handleLanguageChange = (language: typeof languages[0]) => {
  selectedLanguage.value = language
  showLanguageMenu.value = false
  // 这里可以添加实际的语言切换逻辑
}

// 处理点击外部关闭语言菜单
const handleLanguageClickOutside = (event: MouseEvent) => {
  if (languageMenuRef.value && !languageMenuRef.value.contains(event.target as Node)) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleLanguageClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleLanguageClickOutside)
})

// 连接钱包
const handleConnect = async () => {
  try {
    const success = await wallet.connectWallet()
    if (success) {
      router.push('/mining')
    }
  } catch (error) {
    console.error('Failed to connect wallet:', error)
  }
}

// 断开连接
const handleDisconnect = () => {
  wallet.disconnectWallet()
  router.push('/')
}

// 添加短地址显示
const shortAddress = computed(() => {
  if (!wallet.address) return ''
  return `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
})

const isMobileMenuOpen = ref(false)

// 点击导航链接后关闭移动端菜单
watch(route, () => {
  isMobileMenuOpen.value = false
})

// 移动端语言切换
const showMobileLanguageMenu = ref(false)

const handleMobileLanguageChange = (language: typeof languages[0]) => {
  selectedLanguage.value = language
  showMobileLanguageMenu.value = false
  // 这里可以添加实际的语言切换逻辑
}
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo 部分 -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <svg 
              class="h-8 w-auto hover:opacity-80 transition-opacity"
              viewBox="0 0 80 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- 主体多边形 -->
              <path 
                d="M40 5L70 22.5V57.5L40 75L10 57.5V22.5L40 5Z" 
                fill="url(#polygon_gradient)"
                class="drop-shadow-xl"
              />
              <!-- 内部图案 -->
              <path 
                d="M40 20L55 30V50L40 60L25 50V30L40 20Z" 
                fill="white"
                fill-opacity="0.9"
              />
              <!-- 渐变定义 -->
              <defs>
                <linearGradient 
                  id="polygon_gradient" 
                  x1="10" 
                  y1="40" 
                  x2="70" 
                  y2="40" 
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#9F7AEA"/>
                  <stop offset="1" stop-color="#7C3AED"/>
                </linearGradient>
              </defs>
            </svg>
            <!-- Logo 文字 - 移动端也显示 -->
            <span class="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
              Polygon
            </span>
          </router-link>

          <!-- 桌面端导航按钮 -->
          <div v-if="wallet.isConnected" class="hidden md:flex items-center ml-10">
            <router-link 
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="group flex flex-col items-center px-6 py-2 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              :class="[
                route.path === link.to
                  ? 'text-purple-600'
                  : 'text-gray-500'
              ]"
            >
              <!-- 导航图标 -->
              <svg 
                class="w-5 h-5 mb-1" 
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  :d="link.icon"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2"
                />
              </svg>
              <!-- 文字标签 -->
              <span class="text-sm font-medium">{{ link.text }}</span>
              <!-- 活动指示器 -->
              <div 
                class="h-0.5 w-full mt-1 transition-all duration-200 rounded-full"
                :class="[
                  route.path === link.to
                    ? 'bg-purple-600'
                    : 'bg-transparent group-hover:bg-purple-200'
                ]"
              />
            </router-link>
          </div>
        </div>

        <!-- 右侧按钮组 -->
        <div class="flex items-center">
          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="text-gray-500 hover:text-gray-600 p-2 -mr-2"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  v-else
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- 桌面端按钮 -->
          <div class="hidden md:flex items-center space-x-4">
            <!-- 语言切换按钮 -->
            <div class="relative" ref="languageMenuRef">
              <button
                @click.stop="showLanguageMenu = !showLanguageMenu"
                class="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="text-lg">{{ selectedLanguage.icon }}</span>
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- 语言选择下拉菜单 -->
              <div
                v-if="showLanguageMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
                @click.stop
              >
                <button
                  v-for="language in languages"
                  :key="language.code"
                  @click="handleLanguageChange(language)"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span class="text-lg mr-2">{{ language.icon }}</span>
                  <span>{{ language.name }}</span>
                </button>
              </div>
            </div>

            <!-- 钱包按钮 -->
            <button
              :disabled="wallet.isConnected"
              @click="handleConnect"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200"
              :class="[
                wallet.isConnected 
                  ? 'text-white bg-gray-500 cursor-default'
                  : 'text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:opacity-90'
              ]"
            >
              <!-- 钱包图标 -->
              <svg 
                class="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              {{ wallet.isConnected ? shortAddress : '连接钱包' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden border-t border-gray-100"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- 移动端导航链接 -->
          <router-link 
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            v-if="wallet.isConnected"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="[
              route.path === link.to
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-purple-50'
            ]"
          >
            {{ link.text }}
          </router-link>

          <!-- 移动端语言切换按钮 -->
          <button
            @click.stop="showMobileLanguageMenu = !showMobileLanguageMenu"
            class="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <span class="text-lg mr-2">{{ selectedLanguage.icon }}</span>
            <span class="flex-1 text-left">{{ selectedLanguage.name }}</span>
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 移动端钱包按钮 -->
          <button
            :disabled="wallet.isConnected"
            @click="handleConnect"
            class="w-full mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md"
            :class="[
              wallet.isConnected 
                ? 'text-white bg-gray-500 cursor-default'
                : 'text-white bg-gradient-to-r from-purple-500 to-violet-600'
            ]"
          >
            {{ wallet.isConnected ? shortAddress : '连接钱包' }}
          </button>
        </div>
      </div>

      <!-- 移动端语言选择弹窗 -->
      <div 
        v-if="showMobileLanguageMenu" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        @click="showMobileLanguageMenu = false"
      >
        <div 
          class="fixed inset-x-0 bottom-0 bg-white rounded-t-xl"
          @click.stop
        >
          <!-- 标题栏 -->
          <div class="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 class="text-base font-medium text-gray-900">选择语言</h3>
            <button @click="showMobileLanguageMenu = false" class="text-gray-400">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- 语言列表 -->
          <div class="max-h-[50vh] overflow-y-auto py-2">
            <button
              v-for="language in languages"
              :key="language.code"
              @click="handleMobileLanguageChange(language)"
              class="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50"
            >
              <span class="text-lg mr-3">{{ language.icon }}</span>
              <span class="text-base text-gray-700">{{ language.name }}</span>
              <span v-if="language.code === selectedLanguage.code" class="ml-auto text-purple-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template> 