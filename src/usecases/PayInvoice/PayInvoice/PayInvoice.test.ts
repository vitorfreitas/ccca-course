import EnrollStudent from '../../EnrollStudent/EnrollStudent'
import PayInvoice from '../PayInvoice'
import RepositoryMemoryFactory from '../../EnrollStudent/RepositoryMemoryFactory'
import EnrollStudentInputData from '../../EnrollStudent/EnrollStudentInputData'
import GetEnrollment from '../../GetEnrollment/GetEnrollment'

let payInvoice: PayInvoice
let enrollStudent: EnrollStudent
let getEnrollment: GetEnrollment

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryMemoryFactory)
  payInvoice = new PayInvoice(repositoryMemoryFactory)
  getEnrollment = new GetEnrollment(repositoryMemoryFactory)
})

test('Should pay enrollment invoice', () => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(2021, 0, 1))
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent.execute(enrollmentRequest)
  const payInvoiceRequest = {
    code: `${new Date().getFullYear()}EM3A0001`,
    month: 1,
    year: 2021,
    amount: 1416.67
  }
  payInvoice.execute(payInvoiceRequest)
  const enrollment = getEnrollment.execute(payInvoiceRequest.code, new Date('2021-06-29'))
  expect(enrollment.balance).toBe(15583.33)
  jest.useRealTimers()
})

test('Should pay overdue invoice', () => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(2021, 5, 29))
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  enrollStudent.execute(enrollmentRequest)
  const payInvoiceRequest = {
    code: `${new Date().getFullYear()}EM3A0001`,
    month: 1,
    year: 2021,
    amount: 4037.5095
  }
  payInvoice.execute(payInvoiceRequest)
  const enrollment = getEnrollment.execute(payInvoiceRequest.code, new Date('2021-06-29'))
  expect(enrollment.balance).toBe(15583.33)
  jest.useRealTimers()
})
