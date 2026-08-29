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
      throw error
    }
  }

  async function addUser(email: string, role: UserRole) {
    try {
      const newUser = await userService.createUser(email, role)
      users.value.push(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async function updateUser(id: number, payload: { role: UserRole, isActive: boolean }) {
    try {
      await userService.updateUser(id, payload)
      const user = users.value.find(u => u.id == id)
      if (user) {
        user.role = payload.role
        user.isActive = payload.isActive
      }
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  return {
    users,
    loadUsers,
    addUser,
    updateUser
  }
})
