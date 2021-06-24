import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import GetEnrollmentOutputData from "./GetEnrollmentOutputData";

export default class GetEnrollment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private enrollmentRepository: EnrollmentRepository) {
  }

  execute({ code }: { code: string }): GetEnrollmentOutputData {
    const enrollment = this.enrollmentRepository.findByCode(code)
    return new GetEnrollmentOutputData(
      enrollment.enrollmentCode.value,
      enrollment.getInstallmentsBalance()
    )
  }
}
