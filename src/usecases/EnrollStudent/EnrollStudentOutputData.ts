import { Installment } from './Installment'

export default class EnrollStudentOutputData {
  code: string
  installments: Installment[]

  constructor(code: string, installments: Installment[]) {
    this.code = code
    this.installments = installments
  }
}
