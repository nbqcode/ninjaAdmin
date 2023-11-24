import { createRouter, createWebHistory, useRoute } from 'vue-router'
import HomeView from '@/layout/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect:'/dashboard/index',
      meta:{
        title:'首页'
      },
      children:[
        {

          path: '/:catchAll(.*)*',
          component: () => import('@/views/NotFound.vue'),
          meta:{
            title:'404'
          }
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Login.vue')
    }
    
  ]
})


export default router
