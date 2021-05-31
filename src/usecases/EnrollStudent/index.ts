import { Name } from './Name'
import { Cpf } from './Cpf'

type Student = {
  name: Name
  cpf: Cpf
  enrollmentCode: string
}

type StudentDTO = {
  name: string
  cpf: string
}

type EnrollmentRequest = {
  student: StudentDTO
  level: string
  module: string
  classCode: string
}

export default class EnrollStudent {
  private students: Student[] = []

  public execute(enrollmentRequest: EnrollmentRequest): Student {
    const name = new Name(enrollmentRequest.student.name)
    const cpf = new Cpf(enrollmentRequest.student.cpf)
    const isDuplicatedStudent = this.isDuplicatedStudent(enrollmentRequest.student)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    const enrollmentCode = this.generateEnrollmentCode(enrollmentRequest)
    const student = {
      name,
      cpf,
      enrollmentCode
    }
    this.students.push(student)
    return student
  }

  private isDuplicatedStudent({ cpf }: StudentDTO) {
    const hasStudent = this.students.find(
      student => student.cpf.value === cpf
    )

    return Boolean(hasStudent)
  }

  private generateEnrollmentCode(enrollmentRequest: EnrollmentRequest) {
    const { level, module, classCode } = enrollmentRequest
    const currentYear = new Date().getFullYear()
    const id = (this.students.length + 1).toString().padStart(4, '0')
    return `${currentYear}${level}${module}${classCode}${id}`
  }
}

