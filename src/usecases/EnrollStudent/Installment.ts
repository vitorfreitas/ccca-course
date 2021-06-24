export class Installment {
  amount: number
  dueDate: Date
  status: 'paid' | 'not_paid'

  constructor(amount: number, dueDate: Date) {
    this.amount = amount
    this.dueDate = dueDate
    this.status = 'not_paid'
  }
}
