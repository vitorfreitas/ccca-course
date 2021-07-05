import CourseRepository from '../repository/CourseRepository'
import EnrollmentRepository from '../repository/EnrollmentRepository'

export default interface RepositoryAbstractFactory {
  createCourseRepository(): CourseRepository
  createEnrollmentRepository(): EnrollmentRepository
}
