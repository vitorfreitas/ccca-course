import EnrollmentRepository from './EnrollmentRepository'
import Enrollment from '../../../usecases/EnrollStudent/Enrollment'

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
  private enrollments: Enrollment[]

  constructor() {
    this.enrollments = []
  }

  count(): number {
    return this.enrollments.length
  }

  findAllByClass(classCode: string): any[] {
    return this.enrollments.filter(enrollment => enrollment.classCode === classCode)
  }

  findByCpf(cpf: string): any {
    return this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf)
  }

  save(enrollment: any): void {
    this.enrollments.push(enrollment)
  }
}
