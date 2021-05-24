import { validateCpf } from '../helpers/validateCpf'

type Student = {
  name: string
  cpf: string
}

type EnrollmentRequest = {
  student: Student
}

export default class EnrollStudent {
  private students: Student[] = []

  public execute(enrollmentRequest: EnrollmentRequest) {
    const isValidName = this.isValidName(enrollmentRequest.student.name)
    if (!isValidName) {
      throw new Error('Invalid student name')
    }
    const isValidCpf = validateCpf(enrollmentRequest.student.cpf)
    if (!isValidCpf) {
      throw new Error('Invalid student cpf')
    }
    const isDuplicatedStudent = this.isDuplicatedStudent(enrollmentRequest.student)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    this.students.push(enrollmentRequest.student)
  }

  private isValidName(name: string) {
    const [firstName, lastName] = name.split(' ')

    return firstName && lastName
  }

  private isDuplicatedStudent({ cpf }: Student) {
    const hasStudent = this.students.find(
      student => student.cpf === cpf
    )

    return Boolean(hasStudent)
  }
}

