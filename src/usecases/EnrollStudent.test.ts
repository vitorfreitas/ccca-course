import EnrollStudent from './EnrollStudent'

test('Should not enroll without valid student name', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana',
      cpf: '334.615.023-24'
    }
  }
  const enrollStudent = new EnrollStudent()
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student name')
})

test('Should not enroll without valid student cpf', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '123.456.789-10'
    }
  }
  const enrollStudent = new EnrollStudent()
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student cpf')
})

test('Should not enroll duplicated student', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '388.880.240-77'
    }
  }
  const enrollStudent = new EnrollStudent()
  enrollStudent.execute(enrollmentRequest)
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Enrollment with duplicated student is not allowed')
})
