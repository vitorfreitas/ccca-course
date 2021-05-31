import { Name } from './Name'
import { Cpf } from './Cpf'

type Student = {
  name: Name
  cpf: Cpf
}

type StudentDTO = {
  name: string
  cpf: string
}

type EnrollmentRequest = {
  student: StudentDTO
}

export default class EnrollStudent {
  private students: Student[] = []

  public execute(enrollmentRequest: EnrollmentRequest) {
    const name = new Name(enrollmentRequest.student.name)
    const cpf = new Cpf(enrollmentRequest.student.cpf)
    const isDuplicatedStudent = this.isDuplicatedStudent(enrollmentRequest.student)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    const student = {
      name,
      cpf
    }
    this.students.push(student)
  }

  private isDuplicatedStudent({ cpf }: StudentDTO) {
    const hasStudent = this.students.find(
      student => student.cpf.value === cpf
    )

    return Boolean(hasStudent)
  }
}

