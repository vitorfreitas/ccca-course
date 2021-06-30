export default class GetEnrollmentOutputData {
  code: string
  balance: number
  installments: any[]

  constructor(
    code: string,
    balance: number,
    installments: any[],
  ) {
    this.code = code
    this.balance = balance
    this.installments = installments
  }
}
