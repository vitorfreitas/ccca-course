import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import Student from './Student'
import Enrollment from './Enrollment'
import { differenceInDays, addMonths } from 'date-fns'
import CourseRepository from '../../data/repositories/Courses/CourseRepository'
import {Classroom} from "../../data/repositories/Courses/Classroom";
import {Module} from "../../data/repositories/Courses/Module";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

type StudentDTO = {
  name: string
  cpf: string
  birthDate: string
}

type EnrollmentRequest = {
  student: StudentDTO
  level: string
  module: string
  classCode: string
  installments: number
}

export default class EnrollStudent {
  private courseRepository: CourseRepository
  private enrollmentRepository: EnrollmentRepository

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.courseRepository = repositoryFactory.createCourseRepository()
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
  }

  public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
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
      installments: enrollmentRequest.installments,
    })
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }

  private isOverCapacity(classroom: Classroom) {
    const classLength = this.enrollmentRepository.findAllByClass(
      classroom.code
    ).length
    return classLength >= classroom.capacity
  }
}

