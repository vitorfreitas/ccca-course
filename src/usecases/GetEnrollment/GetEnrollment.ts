import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'

export default class GetEnrollment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private enrollmentRepository: EnrollmentRepository) {
  }

  execute({ code }: { code: string }) {
    const enrollment = this.enrollmentRepository.findByCode(code)
    return {
      student: enrollment.student,
      enrollmentCode: enrollment.enrollmentCode,
      level: enrollment.level,
      module: enrollment.module,
      classroom: enrollment.classroom,
      balance: enrollment.getInstallmentsBalance()
    }
  }
}
