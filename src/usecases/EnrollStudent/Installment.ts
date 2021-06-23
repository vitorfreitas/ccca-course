export class Installment {
  amount: number
  dueDate: Date

  constructor(amount: number, dueDate: Date) {
    this.amount = amount
    this.dueDate = dueDate
  }
}
