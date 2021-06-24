import RepositoryAbstractFactory from './RepositoryAbstractFactory'
import EnrollmentRepositoryMemory from '../../data/repositories/Enrollments/EnrollmentRepositoryMemory'
import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'
import CoursesRepositoryMemory from '../../data/repositories/Courses/CourseRepositoryMemory'
import CourseRepository from '../../data/repositories/Courses/CourseRepository'

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
  createEnrollmentRepository(): EnrollmentRepository {
    return new EnrollmentRepositoryMemory()
  }

  createCourseRepository(): CourseRepository {
    return new CoursesRepositoryMemory()
  }
}
