import GetEnrollment from './GetEnrollment'
import EnrollStudent from '../EnrollStudent/EnrollStudent'
import CoursesRepositoryMemory from '../../data/repositories/Courses/CourseRepositoryMemory'
import EnrollmentRepositoryMemory from '../../data/repositories/Enrollments/EnrollmentRepositoryMemory'

let getEnrollment: GetEnrollment
let enrollStudent: EnrollStudent

beforeEach(() => {
  const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory()
  enrollStudent = new EnrollStudent(
    new CoursesRepositoryMemory(),
    enrollmentRepositoryMemory
  )
  getEnrollment = new GetEnrollment(enrollmentRepositoryMemory)
})

test('Should get enrollment by code with invoice balance', () => {
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
  const code = `${new Date().getFullYear()}EM3A0001`
  const createdEnrollment = enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute({ code })
  expect(enrollment).toEqual({
    student: createdEnrollment.student,
    enrollmentCode: createdEnrollment.enrollmentCode,
    level: createdEnrollment.level,
    module: createdEnrollment.module,
    classroom: createdEnrollment.classroom,
    balance: 17000
  })
})
