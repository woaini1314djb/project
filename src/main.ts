import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

// 引入 Tailwind CSS
import './assets/main.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 使用 Pinia 状态管理
app.use(createPinia())
// 使用路由
app.use(router)
app.use(naive)

// 挂载应用
app.mount('#app') 