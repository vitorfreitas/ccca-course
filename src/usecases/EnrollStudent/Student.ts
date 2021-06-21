import { Name } from './Name'
import { Cpf } from './Cpf'
import { differenceInYears } from 'date-fns'

export default class Student {
  name: Name
  cpf: Cpf
  birthDate: Date

  constructor(name: string, cpf: string, birthDate: string) {
    this.name = new Name(name)
    this.cpf = new Cpf(cpf)
    this.birthDate = new Date(birthDate)
  }

  getAge(): number {
    return differenceInYears(
      new Date(),
      this.birthDate
    )
  }
}
