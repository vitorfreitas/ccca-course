import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import GetEnrollmentOutputData from './GetEnrollmentOutputData'
import RepositoryAbstractFactory from '../EnrollStudent/RepositoryAbstractFactory'

export default class GetEnrollment {
  private enrollmentRepository: EnrollmentRepository

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
  }

  execute(code: string, currentDate: Date): GetEnrollmentOutputData {
    const enrollment = this.enrollmentRepository.findByCode(code)
    const installments = enrollment.installments.map(installment => ({
      status: installment.getStatus(currentDate),
      dueDate: installment.dueDate,
      penalty: installment.getPenalty(currentDate),
      interests: installment.getInterests(currentDate),
      balance: installment.getBalance()
    }))
    return new GetEnrollmentOutputData(
      enrollment.enrollmentCode.value,
      enrollment.getInstallmentsBalance(),
      installments
    )
  }
}
