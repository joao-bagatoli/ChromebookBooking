export interface ClassPeriod {
  id: number
  name: string
  shift: number
  startTime: string 
  endTime: string
}

export interface CurrentClassPeriod {
  id: number
  name: string
  isClassTime: boolean
}
