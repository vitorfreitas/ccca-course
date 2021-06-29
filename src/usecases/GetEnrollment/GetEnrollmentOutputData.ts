export default class GetEnrollmentOutputData {
  code: string
  balance: number
  penalty: number
  interests: number

  constructor(code: string, balance: number, penalty: number, interests: number) {
    this.code = code
    this.balance = balance
    this.penalty = penalty
    this.interests = interests
  }
}
