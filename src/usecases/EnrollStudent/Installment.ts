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
}
