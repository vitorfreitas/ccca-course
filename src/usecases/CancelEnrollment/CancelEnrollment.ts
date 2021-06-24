import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import Enrollment from '../EnrollStudent/Enrollment'

export default class CancelEnrollment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private enrollmentRepository: EnrollmentRepository) {
  }

  execute({ code }: { code: string }): any {
    const enrollment = this.enrollmentRepository.findByCode(code)
    enrollment.cancel()
    return enrollment
  }
}
