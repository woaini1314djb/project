import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录', public: true }
  },
  {
    path: '/admin',
    component: () => import('../views/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '总控台', permission: ['admin'] }
      },
      {
        path: 'agents',
        name: 'Agents',
        component: () => import('../views/agents/Index.vue'),
        meta: { title: '代理管理' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/users/Index.vue'),
        meta: { title: '用户管理', permission: ['admin'] }
      },
      {
        path: 'withdrawals',
        name: 'Withdrawals',
        component: () => import('../views/withdrawals/Index.vue'),
        meta: { title: '提现管理' }
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: () => import('../views/transactions/Index.vue'),
        meta: { title: '交易记录', permission: ['admin'] }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/settings/Index.vue'),
        meta: { title: '系统设置', permission: ['admin'] }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = `${to.meta.title} - 管理后台`
  
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('admin_token')
  if (to.path !== '/admin/login' && !isLoggedIn) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router 