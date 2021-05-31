export class Name {
  value: string = ''

  constructor(name: string) {
    if (!this.validate(name)) {
      throw new Error('Invalid student name')
    }

    this.value = name
  }

  validate(name: string) {
    const [firstName, lastName] = name.split(' ')

    return firstName && lastName
  }
}
