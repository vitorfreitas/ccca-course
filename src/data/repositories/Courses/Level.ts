export class Level {
  code: string
  description: string

  constructor(params: {
    code: string
    description: string
  }) {
    this.code = params.code
    this.description = params.description
  }
}
