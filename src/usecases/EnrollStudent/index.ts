import { Name } from './Name'
import { Cpf } from './Cpf'
import { CoursesRepository } from '../../data/repositories/courses'
import { differenceInYears } from 'date-fns'

type Student = {
  name: Name
  cpf: Cpf
  enrollmentCode: string
  classCode: string
}

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
  private students: Student[] = []

  constructor(
    private coursesRepository: CoursesRepository
  ) {
  }

  public execute(enrollmentRequest: EnrollmentRequest): Student {
    const name = new Name(enrollmentRequest.student.name)
    const cpf = new Cpf(enrollmentRequest.student.cpf)
    const isDuplicatedStudent = this.isDuplicatedStudent(enrollmentRequest.student)
    if (isDuplicatedStudent) {
      throw new Error('Enrollment with duplicated student is not allowed')
    }
    const isBelowMinimumAge = this.isBelowMinimumAge(enrollmentRequest)
    if (isBelowMinimumAge) {
      throw new Error('Student below minimum age')
    }
    const isOverCapacity = this.isOverCapacity(enrollmentRequest)
    if (isOverCapacity) {
      throw new Error('Class is over capacity')
    }
    const enrollmentCode = this.generateEnrollmentCode(enrollmentRequest)
    const student = {
      name,
      cpf,
      enrollmentCode,
      classCode: enrollmentRequest.classCode
    }
    this.students.push(student)
    return student
  }

  private isDuplicatedStudent({ cpf }: StudentDTO) {
    const hasStudent = this.students.find(
      student => student.cpf.value === cpf
    )

    return Boolean(hasStudent)
  }

  private generateEnrollmentCode(enrollmentRequest: EnrollmentRequest) {
    const { level, module, classCode } = enrollmentRequest
    const currentYear = new Date().getFullYear()
    const id = (this.students.length + 1).toString().padStart(4, '0')
    return `${currentYear}${level}${module}${classCode}${id}`
  }

  private isBelowMinimumAge(enrollmentRequest: EnrollmentRequest) {
    const { modules } = this.coursesRepository.get()
    const currentModule = modules.find(module => {
      return module.level === enrollmentRequest.level &&
        module.code === enrollmentRequest.module
    })
    const studentAge = differenceInYears(
      new Date(),
      new Date(enrollmentRequest.student.birthDate)
    )
    return studentAge < currentModule!.minimumAge
  }

  private isOverCapacity(enrollmentRequest: EnrollmentRequest) {
    const { classes } = this.coursesRepository.get()
    const enrollmentClass = classes.find(currentClass =>
      currentClass.code === enrollmentRequest.classCode
    )
    const classLength = this.students.filter(student =>
      student.classCode === enrollmentRequest.classCode
    ).length

    return classLength >= enrollmentClass!.capacity
  }
}

