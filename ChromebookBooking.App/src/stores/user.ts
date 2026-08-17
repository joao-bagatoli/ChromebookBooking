import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
import type { User, UserRole } from '../types/user'

export const useUserStore = defineStore('user', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const userService = serviceFactory.createUserService()
  const users = ref<User[]>([])

  async function loadUsers() {
    try {
      users.value = await userService.getAllUsers()
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  async function addUser(email: string, role: UserRole) {
    try {
      const newUser = await userService.createUser(email, role)
      users.value.push(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return {
    users,
    loadUsers,
    addUser
  }
})
