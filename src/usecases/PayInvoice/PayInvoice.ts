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
    const installment = enrollment.installments.find(installment => {
      const year = installment.dueDate.getFullYear()
      const month = installment.dueDate.getMonth()
      return year === request.year && month === request.month
    })
    installment?.pay()
    return enrollment.getInstallmentsBalance()
  }
}
