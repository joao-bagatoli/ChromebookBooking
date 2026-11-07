export interface Section {
  id: number
  name: string
  shift: Shift | null
  isActive: boolean
}

export type Shift = 'Morning' | 'Afternoon'
