import EnrollStudent from './index'
import { CoursesRepository } from '../../data/repositories/courses'

test('Should not enroll without valid student name', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana',
      cpf: '334.615.023-24',
      birthDate: '2001-01-01'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent(new CoursesRepository())
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student name')
})

test('Should not enroll without valid student cpf', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '123.456.789-10',
      birthDate: '2001-01-01'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent(new CoursesRepository())
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student cpf')
})

test('Should not enroll duplicated student', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '388.880.240-77',
      birthDate: '2001-01-01'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent(new CoursesRepository())
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
  const enrollStudent = new EnrollStudent(new CoursesRepository())
  const enrolledStudent = enrollStudent.execute(enrollmentRequest)
  const currentYear = new Date().getFullYear()
  expect(enrolledStudent.enrollmentCode).toBe(`${currentYear}EM1A0001`)
})

test('Should not enroll student below minimum age', () => {
  const enrollmentRequest = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2007-03-12'
    },
    level: 'EM',
    module: '1',
    classCode: 'A'
  }
  const enrollStudent = new EnrollStudent(new CoursesRepository())
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Student below minimum age')
})

test('Should not enroll student over class capacity', () => {
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
  const cpfs = ['762.632.770-50', '702.717.719-68', '830.253.884-12']
  const enrollStudent = new EnrollStudent(new CoursesRepository())
  cpfs.forEach(cpf => {
    const enrollmentRequestMock = {
      ...enrollmentRequest,
      student: {
        ...enrollmentRequest.student,
        cpf
      }
    }
    enrollStudent.execute(enrollmentRequestMock)
  })
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is over capacity')
})
