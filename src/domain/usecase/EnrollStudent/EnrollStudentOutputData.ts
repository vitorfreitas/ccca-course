import { Installment } from '../../entity/Installment'

export default class EnrollStudentOutputData {
  code: string
  installments: Installment[]

  constructor(code: string, installments: Installment[]) {
    this.code = code
    this.installments = installments
  }
}
