import EnrollStudent from '../EnrollStudent/EnrollStudent'
import EnrollmentRepositoryMemory from '../../data/repositories/Enrollments/EnrollmentRepositoryMemory'
import CoursesRepositoryMemory from '../../data/repositories/Courses/CourseRepositoryMemory'
import CancelEnrollment from './CancelEnrollment'

let cancelEnrollment: CancelEnrollment
let enrollStudent: EnrollStudent

beforeEach(() => {
  const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory()
  enrollStudent = new EnrollStudent(
    new CoursesRepositoryMemory(),
    enrollmentRepositoryMemory
  )
  cancelEnrollment = new CancelEnrollment(enrollmentRepositoryMemory)
})

test('Should cancel enrollment', () => {
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
  const enrollment = cancelEnrollment.execute({ code: `${new Date().getFullYear()}EM3A0001` })
  expect(enrollment.status).toBe('cancelled')
})
