export default class GetEnrollmentOutputData {
  code: string
  balance: number
  installments: any[]
  penalty: number
  interests: number

  constructor(
    code: string,
    balance: number,
    installments: any[],
    penalty: number,
    interests: number
  ) {
    this.code = code
    this.balance = balance
    this.installments = installments
    this.penalty = penalty
    this.interests = interests
  }
}
