export interface Booking {
  id: number
  date: string
  classPeriodId: number
  classPeriodName: string
  cabinetId: number
  cabinetName: string
  teacherId: number
  teacherEmail: string
  sectionId: number
  sectionName: string
  isPartial: boolean
  chromebooksQuantity: number | null
}

export interface BookingRequest {
  date: string
  classPeriodId: number
  teacherId: number
  sectionId: number
  isPartial: boolean
  chromebooksQuantity: number | null
}
