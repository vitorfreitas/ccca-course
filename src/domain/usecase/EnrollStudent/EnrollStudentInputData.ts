export default class EnrollStudentInputData {
  studentName: string
  studentCpf: string
  studentBirthDate: string
  level: string
  module: string
  classCode: string
  installments: number

  constructor(params: {
    studentName: string,
    studentCpf: string,
    studentBirthDate: string,
    level: string,
    module: string,
    classCode: string,
    installments: number
  }) {
    this.studentName = params.studentName
    this.studentCpf = params.studentCpf
    this.studentBirthDate = params.studentBirthDate
    this.level = params.level
    this.module = params.module
    this.classCode = params.classCode
    this.installments = params.installments
  }
}
