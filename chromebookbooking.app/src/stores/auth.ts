import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import type { LoggedUser } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const profile = ref<LoggedUser | null>(null)
  const loading = ref<boolean>(false)
  const authService = new AuthService()

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
    profile.value = null
  }

  function getToken(): string | null {
    return session.value?.access_token ?? null
  }

  async function getLoggedUser(userService: UserService) {
    if (!user.value) return;
    try {
      profile.value = await userService.getLoggedUser()
    } catch (error) {
      console.error('Error validating access:', error)
      await logout()
    }
  }

  return {
    user,
    session,
    profile,
    loading,
    init,
    loginWithGoogle,
    logout,
    getToken,
    getLoggedUser
  }
})
