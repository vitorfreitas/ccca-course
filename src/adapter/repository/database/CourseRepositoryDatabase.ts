import CourseRepository from '../../../domain/repository/CourseRepository'
import { Classroom } from '../../../domain/entity/Classroom'
import { Module } from '../../../domain/entity/Module'
import { Level } from '../../../domain/entity/Level'
import ConnectionPool from '../../../infra/database/ConnectionPool'

export default class CoursesRepositoryMemory implements CourseRepository {
  async getLevels() {
    const levels = await ConnectionPool.query('select * from system.level', [])
    return levels.map((level: any) => new Level({
      code: level.code,
      description: level.description
    }))
  }

  async getModules() {
    const modules = await ConnectionPool.query('select * from system.module', [])
    return modules.map((module: any) => new Module({
      code: module.code,
      description: module.description,
      level: module.level,
      price: module.price,
      minimumAge: module.minimum_age
    }))
  }

  async getClassrooms() {
    const classrooms = await ConnectionPool.query('select * from system.classroom', [])
    return classrooms.map((classroom: any) => new Classroom({
      code: classroom.code,
      level: classroom.level,
      module: classroom.module,
      endDate: classroom.end_date,
      capacity: classroom.capacity,
      startDate: classroom.start_date
    }))
  }

  async getClassroom(code: string) {
    const classroom = await ConnectionPool.one('select * from system.classroom where code = $1', [code])
    return new Classroom({
      level: classroom.level,
      module: classroom.module,
      code: classroom.code,
      capacity: classroom.capacity,
      startDate: classroom.start_date,
      endDate: classroom.end_date
    })
  }

  async getLevel(code: string) {
    const level = await ConnectionPool.one('select * from system.level where code = $1', [code])
    return new Level({
      code: level.code,
      description: level.description
    })
  }

  async getModule(code: string, level: string) {
    const moduleData = await ConnectionPool.one('select * from system.module where level = $1 and code = $2', [level, code])
    return new Module({
      level: moduleData.level,
      code: moduleData.code,
      description: moduleData.description,
      minimumAge: moduleData.minimum_age,
      price: moduleData.price
    })
  }
}
