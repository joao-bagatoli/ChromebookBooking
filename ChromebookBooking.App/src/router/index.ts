import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/AppLayout.vue'
import { type UserModule } from '../types/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('../views/ScheduleView.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('../views/HistoryView.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('../views/AccessDeniedView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  const isAuthenticated = !!authStore.user
  const isAuthorized = !!authStore.profile

  if (to.name === 'Login' && isAuthenticated) {
    return next({ name: authStore.getDefaultModule() })
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'Login' })
    }
    if (!isAuthorized) {
      return next({ name: 'AccessDenied' })
    }
    if (to.path === '/') {
      return next({ name: authStore.getDefaultModule() })
    }
    if (to.name && !authStore.canAccessModule(to.name as UserModule)) {
      return next({ name: 'AccessDenied' })
    }
    return next()
  }

  return next()
})
