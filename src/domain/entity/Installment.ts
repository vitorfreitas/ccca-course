import {differenceInDays} from 'date-fns'
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
    return this.events.reduce((total, event) => {
      if (event.eventType === 'payment') {
        return total - event.amount
      }
      if (event.eventType === 'interests') {
        return total + event.amount
      }
      if (event.eventType === 'penalty') {
        return total + event.amount
      }
      return total
    }, this.amount)
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

  getPenalty(fromDate: Date) {
    if (this.getStatus(fromDate) !== 'overdue') {
      return 0
    }
    return Math.round(this.getBalance() * .1 * 100) / 100
  }

  getInterests(fromDate: Date) {
    if (this.getStatus(fromDate) !== 'overdue') {
      return 0
    }
    const daysWithoutPaying = differenceInDays(
      fromDate,
      this.dueDate
    )
    return Math.round(this.getBalance() * .01 * daysWithoutPaying * 100) / 100
  }
}
