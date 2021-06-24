export default class EnrollStudentOutputData {
  code: string
  installments: any[]

  constructor(code: string, installments: any[]) {
    this.code = code
    this.installments = installments
  }
}
