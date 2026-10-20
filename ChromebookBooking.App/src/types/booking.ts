export interface Booking {
  id: number
  date: string            
  classPeriodId: number
  classPeriodName: string
  cabinetId: number
  cabinetName: string
  teacherEmail: string
  sectionName: string
  isPartial: boolean
  chromebooksQuantity: number | null
}

export interface CreateBookingPayload {
  date: string
  classPeriodId: number
  teacherId: number       
  sectionId: number
  isPartial: boolean
  chromebooksQuantity: number | null
}
