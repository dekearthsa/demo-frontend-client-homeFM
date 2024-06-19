import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DetailView from '@/views/DetailView.vue'
import AddingDevice from '@/views/AddingDevice.vue'
import CreatePlatform from '@/views/CreatePlatform.vue'
import DashboardDeviceList from '@/views/DashboardDeviceList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/listDevice",
      name: "listDevice",
      component: DashboardDeviceList
    },
    {
      path: "/addDevice",
      name: "AddingDevice",
      component: AddingDevice
    },
    {
      path: "/createPlatform",
      name: "CreatePlatform",
      component: CreatePlatform
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DetailView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ]
})

export default router
