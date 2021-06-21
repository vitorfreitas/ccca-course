import { CoursesRepository } from '../../data/repositories/courses'
import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import Student from './Student'
import Enrollment from './Enrollment'
import { differenceInDays } from 'date-fns'

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
}

export default class EnrollStudent {
  constructor(
    private coursesRepository: CoursesRepository,
    private enrollmentRepository: EnrollmentRepository
  ) {
  }

  public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    )
    const isDuplicatedStudent = this.isDuplicatedStudent(enrollmentRequest.student)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    const isBelowMinimumAge = this.isBelowMinimumAge(student, enrollmentRequest)
    if (isBelowMinimumAge) {
      throw new Error('Student below minimum age')
    }
    const isOverCapacity = this.isOverCapacity(enrollmentRequest)
    if (isOverCapacity) {
      throw new Error('Class is over capacity')
    }
    const isClassAlreadyStarted = this.isClassAlreadyStarted(enrollmentRequest)
    if (isClassAlreadyStarted) {
      throw new Error('Class is already started')
    }
    const isEnrolledAfterEndOfClass = this.isEnrolledAfterEndOfClass(enrollmentRequest)
    if (isEnrolledAfterEndOfClass) {
      throw new Error('Class is already finished')
    }
    const enrollmentCode = this.generateEnrollmentCode(enrollmentRequest)
    const enrollment = new Enrollment(
      student,
      enrollmentCode,
      enrollmentRequest.classCode
    )
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }

  private isDuplicatedStudent({ cpf }: StudentDTO) {
    const hasStudent = this.enrollmentRepository.findByCpf(cpf)
    return Boolean(hasStudent)
  }

  private generateEnrollmentCode(enrollmentRequest: EnrollmentRequest) {
    const { level, module, classCode } = enrollmentRequest
    const currentYear = new Date().getFullYear()
    const id = (this.enrollmentRepository.count() + 1).toString().padStart(4, '0')
    return `${currentYear}${level}${module}${classCode}${id}`
  }

  private isBelowMinimumAge(student: Student, enrollmentRequest: EnrollmentRequest) {
    const modules = this.coursesRepository.getModules()
    const currentModule = modules.find(module => {
      return module.level === enrollmentRequest.level &&
        module.code === enrollmentRequest.module
    })
    return student.getAge() < currentModule!.minimumAge
  }

  private isOverCapacity(enrollmentRequest: EnrollmentRequest) {
    const classes = this.coursesRepository.getClasses()
    const enrollmentClass = classes.find(currentClass =>
      currentClass.code === enrollmentRequest.classCode
    )
    const classLength = this.enrollmentRepository.findAllByClass(
      enrollmentRequest.classCode
    ).length

    return classLength >= enrollmentClass!.capacity
  }

  private isEnrolledAfterEndOfClass(enrollmentRequest: EnrollmentRequest) {
    const classes = this.coursesRepository.getClasses()
    const enrollmentClass = classes.find(currentClass =>
      currentClass.code === enrollmentRequest.classCode
    )
    return new Date() > new Date(enrollmentClass!.endDate)
  }

  private isClassAlreadyStarted(enrollmentRequest: EnrollmentRequest) {
    const classes = this.coursesRepository.getClasses()
    const enrollmentClass = classes.find(currentClass =>
      currentClass.code === enrollmentRequest.classCode
    )
    if (!enrollmentClass) {
      throw new Error('Class not found')
    }
    const totalClassDays = differenceInDays(
      new Date(enrollmentClass.endDate),
      new Date(enrollmentClass.startDate)
    )
    const daysSinceClassStarted = differenceInDays(
      new Date(),
      new Date(enrollmentClass.startDate)
    )

    return (daysSinceClassStarted / totalClassDays) > 0.25
  }
}

