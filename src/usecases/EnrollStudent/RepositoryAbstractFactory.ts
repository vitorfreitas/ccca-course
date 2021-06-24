import CourseRepository from '../../data/repositories/Courses/CourseRepository'
import EnrollmentRepository from '../../data/repositories/Enrollments/EnrollmentRepository'

export default interface RepositoryAbstractFactory {
  createCourseRepository(): CourseRepository
  createEnrollmentRepository(): EnrollmentRepository
}
