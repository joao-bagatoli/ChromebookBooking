import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import ServiceFactory from '../services/ServiceFactory'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const userService = serviceFactory.createUserService()
  const users = ref<User[]>([])

  async function getAllUsers() {
    try {
      users.value = await userService.getAllUsers()
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  return {
    users,
    getAllUsers
  }
})
