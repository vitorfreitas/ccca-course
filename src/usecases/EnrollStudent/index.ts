import { CoursesRepository } from '../../data/repositories/courses'
import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import Student from './Student'
import Enrollment from './Enrollment'

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
    const { modules } = this.coursesRepository.get()
    const currentModule = modules.find(module => {
      return module.level === enrollmentRequest.level &&
        module.code === enrollmentRequest.module
    })
    return student.getAge() < currentModule!.minimumAge
  }

  private isOverCapacity(enrollmentRequest: EnrollmentRequest) {
    const { classes } = this.coursesRepository.get()
    const enrollmentClass = classes.find(currentClass =>
      currentClass.code === enrollmentRequest.classCode
    )
    const classLength = this.enrollmentRepository.findAllByClass(
      enrollmentRequest.classCode
    ).length

    return classLength >= enrollmentClass!.capacity
  }
}

