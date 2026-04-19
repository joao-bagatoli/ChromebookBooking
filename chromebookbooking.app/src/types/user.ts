export interface User {
  id: number
  email: string
  role: UserRole
  isActive: boolean
}

export interface LoggedUser {
  id: number
  email: string
  role: UserRole
  modules: UserModule[]
}

export type UserRole = 'Admin' | 'Teacher'

export type UserModule = 'Dashboard' | 'Schedule' | 'History' | 'Settings'
