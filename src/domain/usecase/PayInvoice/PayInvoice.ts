import EnrollmentRepository from '../../repository/EnrollmentRepository'
import RepositoryAbstractFactory from '../../factory/RepositoryAbstractFactory'
import PayInvoiceInputData from './PayInvoiceInputData'

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

  execute(request: PayInvoiceInputData): void {
    const enrollment = this.enrollmentRepository.findByCode(request.code)
    enrollment.payInstallment(
      request.month,
      request.year,
      request.amount,
      request.currentDate
    )
  }
}
