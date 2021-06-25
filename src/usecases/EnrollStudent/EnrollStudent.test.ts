import EnrollStudent from './EnrollStudent'
import { Classroom } from '../../data/repositories/Courses/Classroom'
import RepositoryMemoryFactory from './RepositoryMemoryFactory'
import EnrollStudentInputData from "./EnrollStudentInputData";

let enrollStudent: EnrollStudent

beforeEach(() => {
  enrollStudent = new EnrollStudent(
    new RepositoryMemoryFactory()
  )
})

test('Should not enroll without valid student name', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Ana',
    studentCpf: '334.615.023-24',
    studentBirthDate: '2001-01-01',
    level: 'EM',
    module: '1',
    classCode: 'A',
    installments: 12
  })
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student name')
})

test('Should not enroll without valid student cpf', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Ana Silva',
    studentCpf: '123.456.789-10',
    studentBirthDate: '2001-01-01',
    level: 'EM',
    module: '1',
    classCode: 'A',
    installments: 12
  })
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Invalid student cpf')
})

test('Should not enroll duplicated student', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Ana Silva',
    studentCpf: '388.880.240-77',
    studentBirthDate: '2001-01-01',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent.execute(enrollmentRequest)
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Enrollment with duplicated student is not allowed')
})

test('Should generate enrollment code', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const enrolledStudent = enrollStudent.execute(enrollmentRequest)
  const currentYear = new Date().getFullYear()
  expect(enrolledStudent.code).toBe(`${currentYear}EM3A0001`)
})

test('Should not enroll student below minimum age', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2007-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Student below minimum age')
})

test('Should not enroll student over class capacity', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const cpfs = ['762.632.770-50', '702.717.719-68', '830.253.884-12']
  cpfs.forEach(cpf => {
    const enrollmentRequestMock = new EnrollStudentInputData({
      ...enrollmentRequest,
      studentCpf: cpf
    })
    enrollStudent.execute(enrollmentRequestMock)
  })
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is over capacity')
})

test('Should not enroll after que end of the class', () => {
  const invalidClass = new Classroom({
    level: 'EM',
    module: '3',
    code: 'A',
    capacity: 5,
    startDate: '2020-06-01',
    endDate: '2020-12-15'
  })
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent['courseRepository'].getClassrooms = () => [invalidClass]
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is already finished')
})

test('Should not enroll after 25% of the start of the class', () => {
  const invalidClass = new Classroom({
    level: 'EM',
    module: '3',
    code: 'A',
    capacity: 5,
    startDate: '2021-01-01',
    endDate: '2021-12-15'
  })
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent['courseRepository'].getClassrooms = () => [invalidClass]
  expect(() => enrollStudent.execute(enrollmentRequest))
    .toThrow('Class is already started')
})

test('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
  const module = {
    level: 'EM',
    code: '3',
    description: '1o Ano',
    minimumAge: 15,
    price: 17000
  }
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent['courseRepository'].getModules = () => [module]
  const enrolledStudent = enrollStudent.execute(enrollmentRequest)
  const installmentsTotal = enrolledStudent.installments.reduce((acc, cur) => acc + cur.amount, 0)
  expect(enrolledStudent.installments.length).toBe(enrollmentRequest.installments)
  expect(installmentsTotal).toBe(module.price)
})

test('Should calculate due date and return status open or overdue for each invoice', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const enrolledStudent = enrollStudent.execute(enrollmentRequest)
  expect(enrolledStudent.installments[0].dueDate.toLocaleDateString('pt')).toBe('05/01/2021')
  expect(enrolledStudent.installments[11].dueDate.toLocaleDateString('pt')).toBe('05/12/2021')
})
