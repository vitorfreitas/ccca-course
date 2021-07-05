import { differenceInDays } from 'date-fns'

export class Classroom {
  level: string
  module: string
  code: string
  capacity: number
  startDate: Date
  endDate: Date

  constructor(params: {
    level: string
    module: string
    code: string
    capacity: number
    startDate: string
    endDate: string
  }) {
    this.level = params.level
    this.module = params.module
    this.code = params.code
    this.capacity = params.capacity
    this.startDate = new Date(params.startDate)
    this.endDate = new Date(params.endDate)
  }

  isFinished(baseDate: Date) {
    return baseDate > this.endDate
  }

  getProgress(baseDate: Date): number {
    const totalClassDays = differenceInDays(
      new Date(this.endDate),
      new Date(this.startDate)
    )
    const daysSinceClassStarted = differenceInDays(
      baseDate,
      new Date(this.startDate)
    )
    return (daysSinceClassStarted / totalClassDays) * 100
  }
}
