import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { routes as adminRoutes } from '@/admin/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '', // 首页路由
          name: 'Home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'mining', // 挖矿页面路由
          name: 'Mining',
          component: () => import('../views/Mining.vue')
        },
        {
          path: 'profile', // 个人资料页面路由
          name: 'Profile',
          component: () => import('../views/Profile.vue')
        }
      ]
    },
    // 添加管理后台路由
    ...adminRoutes
  ]
})

export default router 