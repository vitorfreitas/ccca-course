import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import GetEnrollmentOutputData from './GetEnrollmentOutputData'
import RepositoryAbstractFactory from '../EnrollStudent/RepositoryAbstractFactory'

export default class GetEnrollment {
  private enrollmentRepository: EnrollmentRepository

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
  }

  execute(code: string): GetEnrollmentOutputData {
    const enrollment = this.enrollmentRepository.findByCode(code)
    const penalty = enrollment.getPenalty(new Date())
    const interests = enrollment.getInterests(new Date())
    return new GetEnrollmentOutputData(
      enrollment.enrollmentCode.value,
      enrollment.getInstallmentsBalance(),
      penalty,
      interests
    )
  }
}
