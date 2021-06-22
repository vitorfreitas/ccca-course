export class Classroom {
  private level: string
  private module: string
  private code: string
  private capacity: number
  private startDate: Date
  private endDate: Date

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
}
