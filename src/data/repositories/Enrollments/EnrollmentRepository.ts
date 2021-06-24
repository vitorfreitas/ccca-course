import Enrollment from '../../../usecases/EnrollStudent/Enrollment'

export default interface EnrollmentRepository {
  save(enrollment: Enrollment): void
  findAllByClass(classCode: string): any[]
  findByCpf(cpf: string): Enrollment
  count(): number
  findByCode(enrollmentCode: string): Enrollment
}
