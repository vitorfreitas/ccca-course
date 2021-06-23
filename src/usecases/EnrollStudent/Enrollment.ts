import { addMonths } from 'date-fns'
import Student from './Student'
import { Classroom } from '../../data/repositories/Courses/Classroom'
import { Module } from '../../data/repositories/Courses/Module'
import { Level } from '../../data/repositories/Courses/Level'
import EnrollmentCode from './EnrollmentCode'
import {Installment} from "./Installment";

export default class Enrollment {
  student: Student
  enrollmentCode: EnrollmentCode
  level: Level
  module: Module
  classroom: Classroom
  installments: Installment[]

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
    this.installments = this.generateInstallments(params.installments, params.issueDate)
    this.enrollmentCode = new EnrollmentCode({
      classCode: this.classroom.code,
      moduleCode: this.module.code,
      levelCode: this.level.code,
      sequence: params.sequence,
      issueYear: params.issueDate.getFullYear()
    })
  }

  private generateInstallments(installmentsQuantity: number, issueDate: Date) {
    const installmentValue = Number((this.module.price / installmentsQuantity).toFixed(2))
    const installmentCorrection = Number((this.module.price - (installmentValue * installmentsQuantity)).toFixed(2))
    const installments = new Array(installmentsQuantity).fill(null).map((_, index) => {
      const isLastInstallment = index + 1 === installmentsQuantity
      const dueDate = addMonths(issueDate, index)
      const value = isLastInstallment ? installmentValue + installmentCorrection : installmentValue
      return new Installment(value, dueDate)
    })
    return installments
  }
}
