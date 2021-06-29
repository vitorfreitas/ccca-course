import InvoiceEvent from './InvoiceEvent'

export class Installment {
  amount: number
  dueDate: Date
  events: InvoiceEvent[]

  constructor(amount: number, dueDate: Date) {
    this.amount = amount
    this.dueDate = dueDate
    this.events = []
  }

  addEvent(event: InvoiceEvent) {
    this.events.push(event)
  }

  getBalance(): number {
    return this.events.reduce((total, event) => total - event.amount, this.amount)
  }

  getStatus(fromDate: Date) {
    if (this.getBalance() === 0) {
      return 'paid'
    }
    if (fromDate.getTime() > this.dueDate.getTime()) {
      return 'overdue'
    }
    return 'open'
  }
}
