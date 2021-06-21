import Student from './Student'

export default class Enrollment {
  student: Student
  enrollmentCode: string
  classCode: string
  installments: any[]

  constructor(
    student: Student,
    enrollmentCode: string,
    classCode: string,
    installments: any[]
  ) {
    this.student = student
    this.enrollmentCode = enrollmentCode
    this.classCode = classCode
    this.installments = installments
  }
}
