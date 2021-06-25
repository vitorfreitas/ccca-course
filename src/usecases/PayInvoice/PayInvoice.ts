import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'

type PayInvoiceRequest = {
  code: string
  month: number
  year: number
  amount: number
}

export default class PayInvoice {
  // eslint-disable-next-line no-useless-constructor
  constructor(private enrollmentRepository: EnrollmentRepository) {
  }

  execute(request: PayInvoiceRequest): number {
    const enrollment = this.enrollmentRepository.findByCode(request.code)
    enrollment.payInstallment(request.month, request.year, request.amount)
    return enrollment.getInstallmentsBalance()
  }
}
