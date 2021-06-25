import { addMonths } from 'date-fns'
import Student from './Student'
import { Classroom } from '../../data/repositories/Courses/Classroom'
import { Module } from '../../data/repositories/Courses/Module'
import { Level } from '../../data/repositories/Courses/Level'
import EnrollmentCode from './EnrollmentCode'
import { Installment } from './Installment'
import InvoiceEvent from './InvoiceEvent'

export default class Enrollment {
  student: Student
  enrollmentCode: EnrollmentCode
  level: Level
  module: Module
  classroom: Classroom
  installments: Installment[]
  status: 'in_progress' | 'cancelled'

  constructor(params: {
    student: Student
    classroom: Classroom
    module: Module
    level: Level
    installments: number
    sequence: number
    issueDate: Date
  }) {
    this.student = params.student
    this.classroom = params.classroom
    this.level = params.level
    this.module = params.module
    this.status = 'in_progress'
    this.installments = this.generateInstallments(params.installments, params.issueDate)
    this.enrollmentCode = new EnrollmentCode({
      classCode: this.classroom.code,
      moduleCode: this.module.code,
      levelCode: this.level.code,
      sequence: params.sequence,
      issueYear: params.issueDate.getFullYear()
    })
  }

  getInstallmentsBalance() {
    const balance = this.installments
      .reduce((total, installment) => total + installment.getBalance(), 0)
    return Number(balance.toFixed(2))
  }

  cancel() {
    this.status = 'cancelled'
  }

  payInstallment(
    month: number,
    year: number,
    amount: number
  ): void {
    const installment = this.installments.find(installment => {
      const dueYear = installment.dueDate.getFullYear()
      const dueMonth = installment.dueDate.getMonth()
      return dueYear === year && dueMonth === month
    })
    if (!installment) {
      throw new Error('Invalid installment')
    }
    installment.addEvent(new InvoiceEvent('payment', amount))
  }

  private generateInstallments(installmentsQuantity: number, issueDate: Date) {
    const installmentValue = Number((this.module.price / installmentsQuantity).toFixed(2))
    const installmentCorrection = Number((this.module.price - (installmentValue * installmentsQuantity)).toFixed(2))
    const installments = new Array(installmentsQuantity).fill(null).map((_, index) => {
      const startDate = new Date(new Date().getFullYear(), 0, 5)
      const isLastInstallment = index + 1 === installmentsQuantity
      const dueDate = addMonths(startDate, index)
      const value = isLastInstallment ? installmentValue + installmentCorrection : installmentValue
      return new Installment(value, dueDate)
    })
    return installments
  }
}
