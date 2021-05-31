import EnrollStudent from './index'

test('Should not enroll without valid student name', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana',
      cpf: '334.615.023-24'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
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
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
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
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent()
  enrollStudent.execute(enrollmentRequest)
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Enrollment with duplicated student is not allowed')
})

test('Should generate enrollment code', () => {
  const enrollmentRequest = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent()
  const enrolledStudent = enrollStudent.execute(enrollmentRequest)
  const currentYear = new Date().getFullYear()
  expect(enrolledStudent.enrollmentCode).toBe(`${currentYear}EM1A0001`)
})
