export default class EnrollmentCode {
  value: string

  constructor(params: {
    moduleCode: string
    classCode: string
    levelCode: string
    issueYear: number
    sequence: number
  }) {
    const id = params.sequence.toString().padStart(4, '0')
    this.value = `${params.issueYear}${params.levelCode}${params.moduleCode}${params.classCode}${id}`
  }
}
