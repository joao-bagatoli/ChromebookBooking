export interface ClassPeriod {
  id: number
  name: string
  shift: string
  startTime: string 
  endTime: string
}

export interface CurrentClassPeriod {
  id: number
  name: string
  isClassTime: boolean
}
