import type { CurrentClassPeriod } from './classPeriod'

export interface Cabinet {
  id: number
  name: string
  isActive: boolean
}

export interface CabinetsOverview {
  currentClassPeriod: CurrentClassPeriod
  cabinets: CabinetStatus[]
}

interface CabinetStatus {
  id: number
  name: string
  status: 'Available' | 'Booked' | 'Inactive'
}
