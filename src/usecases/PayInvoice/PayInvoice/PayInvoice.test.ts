import EnrollStudent from '../../EnrollStudent/EnrollStudent'
import EnrollmentRepositoryMemory from '../../../data/repositories/Enrollments/EnrollmentRepositoryMemory'
import CoursesRepositoryMemory from '../../../data/repositories/Courses/CourseRepositoryMemory'
import PayInvoice from '../PayInvoice'

let payInvoice: PayInvoice
let enrollStudent: EnrollStudent

beforeEach(() => {
  const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory()
  enrollStudent = new EnrollStudent(
    new CoursesRepositoryMemory(),
    enrollmentRepositoryMemory
  )
  payInvoice = new PayInvoice(enrollmentRepositoryMemory)
})

test('Should pay enrollment invoice', () => {
  const enrollmentRequest = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  }
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
