import Student from './Student'

export default class Enrollment {
  student: Student
  enrollmentCode: string
  classCode: string

  constructor(
    student: Student,
    enrollmentCode: string,
    classCode: string
  ) {
    this.student = student
    this.enrollmentCode = enrollmentCode
    this.classCode = classCode
  }
}
