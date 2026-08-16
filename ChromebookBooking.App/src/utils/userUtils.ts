import type { UserRole } from '../types/user'

export function getRoleSeverity(role: UserRole | undefined) {
  if (!role) return 'secondary'
  switch (role) {
    case 'Admin': return 'info'
    case 'Teacher': return 'success'
    default: return 'secondary'
  }
}

export function getRoleLabel(role: UserRole | undefined) {
  if (role === 'Teacher') return 'Professor'
  return role || ''
}
