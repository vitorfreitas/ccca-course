export class Module {
  level: string
  code: string
  description: string
  minimumAge: number
  price: number

  constructor(params: {
    level: string
    code: string
    description: string
    minimumAge: number
    price: number
  }) {
    this.level = params.level
    this.code = params.code
    this.description = params.description
    this.minimumAge = params.minimumAge
    this.price = params.price
  }
}
