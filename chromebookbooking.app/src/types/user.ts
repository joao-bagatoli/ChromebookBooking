export interface User {
  id: number
  email: string
  role: UserRole
  isActive: boolean
}

export type UserRole = 'Admin' | 'Teacher'
