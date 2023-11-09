import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'/system_role/operation/:id?',
          component: () => import('@/views/pages/SystemRole/operation.vue'),
          meta:{
            title:'角色编辑'
          }
        },
        {
          path:'/system_user/operation/:id?',
          component: () => import('@/views/pages/SystemUser/operation.vue'),
          meta:{
            title:'用户'
          }
        },
        {
          path:'/system_menu/operation/:id?',
          component: () => import('@/views/pages/SystemMenu/operation.vue'),
          meta:{
            title:'菜单'
          }
        },
        {
          path: '/:catchAll(.*)*',
          component: () => import('@/views/NotFound.vue')
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
