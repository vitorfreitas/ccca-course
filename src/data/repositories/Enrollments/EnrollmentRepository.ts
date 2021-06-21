export default interface EnrollmentRepository {
  save(enrollment: any): void
  findAllByClass(classCode: string): any[]
  findByCpf(cpf: string): any
  count(): number
}
