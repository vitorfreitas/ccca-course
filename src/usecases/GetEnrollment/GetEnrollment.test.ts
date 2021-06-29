import GetEnrollment from './GetEnrollment'
import EnrollStudent from '../EnrollStudent/EnrollStudent'
import RepositoryMemoryFactory from '../EnrollStudent/RepositoryMemoryFactory'
import EnrollStudentInputData from '../EnrollStudent/EnrollStudentInputData'

let getEnrollment: GetEnrollment
let enrollStudent: EnrollStudent

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryMemoryFactory)
  getEnrollment = new GetEnrollment(repositoryMemoryFactory)
})

test('Should get enrollment by code with invoice balance', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const code = `${new Date().getFullYear()}EM3A0001`
  const createdEnrollment = enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute(code)
  expect(enrollment.code).toBe(createdEnrollment.code)
  expect(enrollment.balance).toBe(17000)
})

test('Should calculate penalty and interests', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const code = `${new Date().getFullYear()}EM3A0001`
  const createdEnrollment = enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute(code)
  expect(enrollment.code).toBe(createdEnrollment.code)
  expect(enrollment.balance).toBe(17000)
  expect(enrollment.penalty).toBe(141.667)
  expect(enrollment.interests).toBe(2479.1725)
})
