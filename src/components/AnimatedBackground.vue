<template>
  <div class="animated-bg absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    <div v-for="n in 20" :key="n" 
         class="hex absolute"
         :style="{
           left: `${Math.random() * 100}%`,
           top: `${Math.random() * 100}%`,
           animationDelay: `${Math.random() * 5}s`
         }">
    </div>
  </div>
</template>

<style scoped>
.animated-bg {
  z-index: 0;
}

.hex {
  width: 100px;
  height: 115px;
  background: linear-gradient(135deg, #8247E5 0%, #3C8CE7 100%);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: float 10s infinite ease-in-out;
  opacity: 0.5;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-20px) rotate(180deg) scale(1.1);
  }
  100% {
    transform: translateY(0) rotate(360deg) scale(1);
  }
}
</style> 