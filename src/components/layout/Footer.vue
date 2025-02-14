<template>
  <!-- 页脚 -->
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- 合作伙伴 -->
      <div class="mb-8">
        <h3 class="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 text-transparent bg-clip-text">
          Our Partners
        </h3>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
          <!-- Ethereum -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="ethereumLogo" alt="Ethereum" class="h-12 w-12" />
          </div>
          <!-- Ethereum Classic -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="ethereumClassicLogo" alt="Ethereum Classic" class="h-12 w-12" />
          </div>
          <!-- Polygon -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="polygonLogo" alt="Polygon" class="h-12 w-12" />
          </div>
          <!-- BSC -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="bscLogo" alt="BSC" class="h-12 w-12" />
          </div>
          <!-- USDT -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="usdtLogo" alt="USDT" class="h-12 w-12" />
          </div>
          <!-- USDC -->
          <div class="col-span-1 flex justify-center items-center">
            <img :src="usdcLogo" alt="USDC" class="h-12 w-12" />
          </div>
        </div>
      </div>

      <!-- 认证信息 -->
      <div class="border-t border-gray-200 pt-8">
        <h3 class="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 text-transparent bg-clip-text">
          Certifications
        </h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- 安全认证 -->
          <div class="flex flex-col items-center">
            <svg class="h-8 w-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h4 class="text-sm font-medium text-gray-900">Security Audited</h4>
            <p class="mt-1 text-xs text-gray-500">by CertiK</p>
          </div>

          <!-- 智能合约认证 -->
          <div class="flex flex-col items-center">
            <svg class="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h4 class="text-sm font-medium text-gray-900">Smart Contract Verified</h4>
            <p class="mt-1 text-xs text-gray-500">on Polygonscan</p>
          </div>

          <!-- 合规认证 -->
          <div class="flex flex-col items-center">
            <svg class="h-8 w-8 text-purple-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 class="text-sm font-medium text-gray-900">Compliance Certified</h4>
            <p class="mt-1 text-xs text-gray-500">ISO 27001</p>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="mt-8 border-t border-gray-200 pt-8">
        <p class="text-center">
          <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 text-transparent bg-clip-text">
            Polygon Node
          </span>
          <span class="block mt-2 text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }} All rights reserved.
          </span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import ethereumLogo from '../../assets/images/chains/ethereum-eth-logo.png'
import ethereumClassicLogo from '../../assets/images/chains/ethereum-classic-etc-logo.png'
import polygonLogo from '../../assets/images/chains/polygon-matic-logo.png'
import bscLogo from '../../assets/images/chains/bnb-bnb-logo.png'
import usdtLogo from '../../assets/images/chains/tether-usdt-logo.png'
import usdcLogo from '../../assets/images/chains/usd-coin-usdc-logo.png'
</script> 