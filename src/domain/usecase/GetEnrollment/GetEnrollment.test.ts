import GetEnrollment from './GetEnrollment'
import EnrollStudent from '../EnrollStudent/EnrollStudent'
import RepositoryMemoryFactory from '../../../adapter/factory/RepositoryMemoryFactory'
import EnrollStudentInputData from '../EnrollStudent/EnrollStudentInputData'

let getEnrollment: GetEnrollment
let enrollStudent: EnrollStudent

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryMemoryFactory)
  getEnrollment = new GetEnrollment(repositoryMemoryFactory)
})

test('Should get enrollment by code with invoice balance', async () => {
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
  const createdEnrollment = await enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute(code, new Date('2021-06-29'))
  expect(enrollment.code).toBe(createdEnrollment.code)
  expect(enrollment.balance).toBe(17000)
})

test('Should calculate due date and return status open or overdue for each invoice', async () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '3',
    classCode: 'A',
    installments: 12
  })
  const enrolledStudent = await enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute(enrolledStudent.code, new Date('2021-06-29'))
  expect(enrollment.installments[0].dueDate.toLocaleDateString('pt')).toBe('05/01/2021')
  expect(enrollment.installments[0].status).toBe('overdue')
  expect(enrollment.installments[11].dueDate.toLocaleDateString('pt')).toBe('05/12/2021')
  expect(enrollment.installments[11].status).toBe('open')
})

test('Should calculate penalty and interests', async () => {
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
  await enrollStudent.execute(enrollmentRequest)
  const enrollment = getEnrollment.execute(code, new Date('2021-06-29'))
  expect(enrollment.installments[0].penalty).toBe(141.67)
  expect(enrollment.installments[0].interests).toBe(2465.01)
})
