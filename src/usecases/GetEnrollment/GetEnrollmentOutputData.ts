export default class GetEnrollmentOutputData {
  code: string
  balance: number

  constructor(code: string, balance: number) {
    this.code = code
    this.balance = balance
  }
}
