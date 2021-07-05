export default class InvoiceEvent {
  eventType: string
  amount: number

  constructor(eventType: string, amount: number) {
    this.eventType = eventType
    this.amount = amount
  }
}
