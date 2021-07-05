export default class PayInvoiceInputData {
  code: string
  month: number
  year: number
  amount: number
  currentDate: Date

  constructor(params: {
    code: string
    month: number
    year: number
    amount: number
    currentDate: Date
  }) {
    this.code = params.code
    this.month = params.month
    this.year = params.year
    this.amount = params.amount
    this.currentDate = params.currentDate
  }
}
