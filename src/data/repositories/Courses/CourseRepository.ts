import { Classroom } from './Classroom'
import { Module } from './Module'
import { Level } from './Level'

export default interface CourseRepository {
  getLevels(): Level[]
  getModules(): Module[]
  getClassrooms(): Classroom[]
  getClassroom(classCode: string, level: string, module: string): Classroom
  getLevel(code: string): Level
  getModule(code: string, level: string): Module
}
