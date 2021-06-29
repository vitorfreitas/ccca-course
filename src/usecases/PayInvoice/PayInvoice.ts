import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import RepositoryAbstractFactory from '../EnrollStudent/RepositoryAbstractFactory'

type PayInvoiceRequest = {
  code: string
  month: number
  year: number
  amount: number
}

export default class PayInvoice {
  private enrollmentRepository: EnrollmentRepository

  constructor(private repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
  }

  execute(request: PayInvoiceRequest): void {
    const enrollment = this.enrollmentRepository.findByCode(request.code)
    enrollment.payInstallment(request.month, request.year, request.amount)
  }
}
