import EnrollStudent from '../../EnrollStudent/EnrollStudent'
import PayInvoice from '../PayInvoice'
import RepositoryMemoryFactory from '../../EnrollStudent/RepositoryMemoryFactory'
import EnrollStudentInputData from '../../EnrollStudent/EnrollStudentInputData'

let payInvoice: PayInvoice
let enrollStudent: EnrollStudent

beforeEach(() => {
  enrollStudent = new EnrollStudent(
    new RepositoryMemoryFactory()
  )
  payInvoice = new PayInvoice(enrollStudent['enrollmentRepository'])
})

test('Should pay enrollment invoice', () => {
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
    month: new Date().getMonth(),
    year: 2021,
    amount: 1416.67
  }
  const balance = payInvoice.execute(payInvoiceRequest)
  expect(balance).toBe(15583.33)
})
