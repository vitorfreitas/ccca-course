import EnrollStudent from './index'
import { CoursesRepository } from '../../data/repositories/courses'
import EnrollmentRepositoryMemory from "../../data/repositories/Enrollments/EnrollmentRepositoryMemory";

let enrollStudent: EnrollStudent

beforeEach(() => {
  enrollStudent = new EnrollStudent(
    new CoursesRepository(),
    new EnrollmentRepositoryMemory()
  )
})

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

test('Should not enroll after que end of the class', () => {
  const invalidClass = {
    level: 'EM',
    module: '3',
    code: 'A',
    capacity: 5,
    startDate: '2020-06-01',
    endDate: '2020-12-15'
  }
  const enrollmentRequest = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '3',
    classCode: 'A'
  }
  enrollStudent['coursesRepository'].getClasses = () => [invalidClass]
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is already finished')
})

test('Should not enroll after 25% of the start of the class', () => {
  const invalidClass = {
    level: 'EM',
    module: '3',
    code: 'A',
    capacity: 5,
    startDate: '2021-01-01',
    endDate: '2021-12-15'
  }
  const enrollmentRequest = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '3',
    classCode: 'A'
  }
  enrollStudent['coursesRepository'].getClasses = () => [invalidClass]
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is already started')
})
