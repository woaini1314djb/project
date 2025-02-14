<template>
  <div class="min-h-screen bg-gray-50 relative">
    <!-- 添加动态背景 -->
    <AnimatedBackground />
    
    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 标题 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div class="text-center">
          <h1 class="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 text-transparent bg-clip-text mb-10 leading-loose pb-4">
            Polygon Node
          </h1>
          <p class="text-xl text-gray-600 mt-4">
            The first dApp of multi-chain validate transaction running on the Polygon network
          </p>
        </div>
      </div>

      <!-- What Is Polygon Node? -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What Is Polygon Node?</h2>
          <p class="text-gray-600">
            Polygon Node - The first dApp of multi-chain validate transaction running on the Polygon network. Polygon makes Ethereum accessible for all, over 7000+ dApps have used Polygon to scale their performance.
          </p>
        </div>
      </div>

      <!-- Current Problems & The Solution -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Current Problems</h2>
          <p class="text-gray-600">
            With the gradual enrichment of the Ethereum network ecology and the increase of Ethereum applications, the congestion of Ethereum's main network in transactions and high fee for transaction have become the most important problems in this era.
          </p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
          <p class="text-gray-600">
            Due to Ethereum 2.0 needs to be deployed in 2024, in order to solve the problem with congestion of transaction in Ethereum network, The Polygon network has become the best scaling solution for the current Ethereum network.
          </p>
        </div>
      </div>

      <!-- The Polygon Network -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">The Polygon Network</h2>
          <p class="text-gray-600 mb-4">
            The Polygon network is an extension of the Ethereum network that bridges the Ethereum network, Binance Smart Chain (BSC) network, and Tron network, to make all transactions faster with lower gas fee.
          </p>
          <p class="text-gray-600">
            In order to ensure security, each transaction needs to be validated by the validator, when the validation is completed, the Polygon network will assign a certain reward to the validator, we call this mechanism an incentive mechanism, the incentive mechanism allows each validator to earn continuous rewards, and keep the community of Polygon alive.
          </p>
        </div>
      </div>

      <!-- How to become a validator? -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">How to become a validator?</h2>
          <p class="text-gray-600 mb-4">
            You can use any wallet which supports Ethereum network, Binance Smart Chain (BSC) network, Polygon network, or Tron network to become a validator by paying a little gas fee, and you will participate in validating all of transactions which made on the chosen network.
          </p>
          <p class="text-gray-600 mb-4">
            We recommend that you use the wallet of Tron network, Binance Smart Chain (BSC) network or Polygon network, because they have lower gas fee but higher efficiency for transaction validation.
          </p>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p class="text-yellow-700">
              <span class="font-bold">Important Note:</span> Please keep the private key and mnemonic phrase of your wallet safe and do not share with anyone.
            </p>
          </div>
        </div>
      </div>

      <!-- Reward Mechanism -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Reward Mechanism</h2>
          <p class="text-gray-600 mb-4">
            After you become a validator, smart contracts running on the blockchain network will automatically distribute rewards once every 6 hours, based on the tokens balance in your wallet and the sum of unclaimed tokens, with the number of validators increases, the rate of reward may get lower and lower.
          </p>
          <p class="text-gray-600 mb-4">
            The amount of reward distribution depends entirely on the smart contract, which is based on the POS (Proof of Stake) mechanism, the more tokens balance in your wallet, the more consensus you can get on the Polygon network, which means more rewards for you to distribute.
          </p>
          <p class="text-purple-600">
            Reward distribution of Polygon Node is different from traditional staked mining, it does not require you to stake any tokens.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackground from '../components/AnimatedBackground.vue'
</script> 