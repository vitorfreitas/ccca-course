import EnrollStudent from '../EnrollStudent/EnrollStudent'
import CancelEnrollment from './CancelEnrollment'
import RepositoryMemoryFactory from '../EnrollStudent/RepositoryMemoryFactory'
import EnrollStudentInputData from '../EnrollStudent/EnrollStudentInputData'

let cancelEnrollment: CancelEnrollment
let enrollStudent: EnrollStudent

beforeEach(() => {
  enrollStudent = new EnrollStudent(
    new RepositoryMemoryFactory()
  )
  cancelEnrollment = new CancelEnrollment(enrollStudent['enrollmentRepository'])
})

test('Should cancel enrollment', () => {
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
  const enrollment = cancelEnrollment.execute({ code: `${new Date().getFullYear()}EM3A0001` })
  expect(enrollment.status).toBe('cancelled')
})
