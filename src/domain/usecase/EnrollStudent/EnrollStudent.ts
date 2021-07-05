import EnrollmentRepository from '../../repository/EnrollmentRepository'
import Student from '../../entity/Student'
import Enrollment from '../../entity/Enrollment'
import CourseRepository from '../../repository/CourseRepository'
import { Classroom } from '../../entity/Classroom'
import RepositoryAbstractFactory from '../../factory/RepositoryAbstractFactory'
import EnrollStudentInputData from './EnrollStudentInputData'
import EnrollStudentOutputData from './EnrollStudentOutputData'

export default class EnrollStudent {
  private courseRepository: CourseRepository
  private enrollmentRepository: EnrollmentRepository

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.courseRepository = repositoryFactory.createCourseRepository()
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
  }

  public execute(enrollmentRequest: EnrollStudentInputData): EnrollStudentOutputData {
    const student = new Student(
      enrollmentRequest.studentName,
      enrollmentRequest.studentCpf,
      enrollmentRequest.studentBirthDate
    )
    const classroom = this.courseRepository.getClassroom(
      enrollmentRequest.classCode,
      enrollmentRequest.level,
      enrollmentRequest.module
    )
    const level = this.courseRepository.getLevel(enrollmentRequest.level)
    const module = this.courseRepository.getModule(enrollmentRequest.module, level.code)
    const isDuplicatedStudent = this.enrollmentRepository.findByCpf(student.cpf.value)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    const isBelowMinimumAge = student.getAge() < module.minimumAge
    if (isBelowMinimumAge) {
      throw new Error('Student below minimum age')
    }
    const isOverCapacity = this.isOverCapacity(classroom)
    if (isOverCapacity) {
      throw new Error('Class is over capacity')
    }
    const isEnrolledAfterEndOfClass = classroom.isFinished(new Date())
    if (isEnrolledAfterEndOfClass) {
      throw new Error('Class is already finished')
    }
    if (classroom.getProgress(new Date()) >= 25) {
      throw new Error('Class is already started')
    }
    const sequence = this.enrollmentRepository.count() + 1
    const enrollment = new Enrollment({
      student,
      classroom,
      level,
      module,
      sequence,
      issueDate: new Date(),
      installments: enrollmentRequest.installments
    })
    this.enrollmentRepository.save(enrollment)
    return new EnrollStudentOutputData(enrollment.enrollmentCode.value, enrollment.installments)
  }

  private isOverCapacity(classroom: Classroom) {
    const classLength = this.enrollmentRepository.findAllByClass(
      classroom.code
    ).length
    return classLength >= classroom.capacity
  }
}
