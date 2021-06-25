import RepositoryAbstractFactory from './RepositoryAbstractFactory'
import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import CoursesRepositoryMemory from '../../data/repositories/Courses/CourseRepositoryMemory'
import CourseRepository from '../../data/repositories/Courses/CourseRepository'
import EnrollmentRepositoryMemorySingleton
  from '../../data/repositories/Enrollments/EnrollmentRepositoryMemorySingleton'

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
