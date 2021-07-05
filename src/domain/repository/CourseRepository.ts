import { Classroom } from '../entity/Classroom'
import { Module } from '../entity/Module'
import { Level } from '../entity/Level'

export default interface CourseRepository {
  getLevels(): Level[]
  getModules(): Module[]
  getClassrooms(): Classroom[]
  getClassroom(classCode: string, level: string, module: string): Classroom
  getLevel(code: string): Level
  getModule(code: string, level: string): Module
}
