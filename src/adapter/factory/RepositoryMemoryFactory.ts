import RepositoryAbstractFactory from '../../domain/factory/RepositoryAbstractFactory'
import EnrollmentRepository from '../../domain/repository/EnrollmentRepository'
import CoursesRepositoryMemory from '../repository/memory/CourseRepositoryMemory'
import CourseRepository from '../../domain/repository/CourseRepository'
import EnrollmentRepositoryMemorySingleton
  from '../repository/memory/EnrollmentRepositoryMemorySingleton'

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
  constructor() {
    EnrollmentRepositoryMemorySingleton.destroy()
  }

  createEnrollmentRepository(): EnrollmentRepository {
    return EnrollmentRepositoryMemorySingleton.getInstance()
  }

  createCourseRepository(): CourseRepository {
    return new CoursesRepositoryMemory()
  }
}
