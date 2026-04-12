import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const authService = serviceFactory.createAuthService()
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref<boolean>(false)

  async function init() {
    loading.value = true

    session.value = await authService.getSession()
    user.value = session.value?.user ?? null

    authService.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })

    loading.value = false
  }

  async function loginWithGoogle() {
    await authService.loginWithGoogle()
  }

  async function logout() {
    await authService.logout()
    user.value = null
    session.value = null
  }

  function getToken(): string | null {
    return session.value?.access_token ?? null
  }

  return {
    user,
    session,
    loading,
    init,
    loginWithGoogle,
    logout,
    getToken
  }
})
