import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ],
})

export default router
