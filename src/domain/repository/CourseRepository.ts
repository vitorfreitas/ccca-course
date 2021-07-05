import { Classroom } from '../entity/Classroom'
import { Module } from '../entity/Module'
import { Level } from '../entity/Level'

export default interface CourseRepository {
  getLevels(): Promise<Level[]>
  getModules(): Promise<Module[]>
  getClassrooms(): Promise<Classroom[]>
  getClassroom(classCode: string, level: string, module: string): Promise<Classroom>
  getLevel(code: string): Promise<Level>
  getModule(code: string, level: string): Promise<Module>
}
