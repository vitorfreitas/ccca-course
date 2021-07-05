import CourseRepository from '../../../domain/repository/CourseRepository'
import { Classroom } from '../../../domain/entity/Classroom'
import { Module } from '../../../domain/entity/Module'
import { Level } from '../../../domain/entity/Level'

export default class CoursesRepositoryMemory implements CourseRepository {
  async getLevels() {
    return [
      new Level({
        code: 'EF1',
        description: 'Ensino Fundamental I'
      }),
      new Level({
        code: 'EF2',
        description: 'Ensino Fundamental II'
      }),
      new Level({
        code: 'EM',
        description: 'Ensino Médio'
      })
    ]
  }

  async getModules() {
    return [
      new Module({
        level: 'EF1',
        code: '1',
        description: '1o Ano',
        minimumAge: 6,
        price: 15000
      }),
      new Module({
        level: 'EF1',
        code: '2',
        description: '2o Ano',
        minimumAge: 7,
        price: 15000
      }),
      new Module({
        level: 'EF1',
        code: '3',
        description: '3o Ano',
        minimumAge: 8,
        price: 15000
      }),
      new Module({
        level: 'EF1',
        code: '4',
        description: '4o Ano',
        minimumAge: 9,
        price: 15000
      }),
      new Module({
        level: 'EF1',
        code: '5',
        description: '5o Ano',
        minimumAge: 10,
        price: 15000
      }),
      new Module({
        level: 'EF2',
        code: '6',
        description: '6o Ano',
        minimumAge: 11,
        price: 14000
      }),
      new Module({
        level: 'EF2',
        code: '7',
        description: '7o Ano',
        minimumAge: 12,
        price: 14000
      }),
      new Module({
        level: 'EF2',
        code: '8',
        description: '8o Ano',
        minimumAge: 13,
        price: 14000
      }),
      new Module({
        level: 'EF2',
        code: '9',
        description: '9o Ano',
        minimumAge: 14,
        price: 14000
      }),
      new Module({
        level: 'EM',
        code: '1',
        description: '1o Ano',
        minimumAge: 15,
        price: 17000
      }),
      new Module({
        level: 'EM',
        code: '2',
        description: '2o Ano',
        minimumAge: 16,
        price: 17000
      }),
      new Module({
        level: 'EM',
        code: '3',
        description: '3o Ano',
        minimumAge: 17,
        price: 17000
      })
    ]
  }

  async getClassrooms() {
    return [
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'A',
        capacity: 3,
        startDate: '2021-06-01',
        endDate: '2021-12-15'
      }),
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'B',
        capacity: 5,
        startDate: '2021-05-01',
        endDate: '2021-05-30'
      }),
      new Classroom({
        level: 'EM',
        module: '3',
        code: 'C',
        capacity: 5,
        startDate: '2021-05-01',
        endDate: '2021-06-30'
      })
    ]
  }

  async getClassroom(classCode: string, level: string, module: string) {
    const classrooms = await this.getClassrooms()
    const classroom = classrooms.find(
      classroom => classroom.code === classCode && classroom.level === level && classroom.module === module
    )
    if (!classroom) {
      throw new Error('Classroom not found')
    }
    return classroom
  }

  async getLevel(code: string) {
    const levels = await this.getLevels()
    const level = levels.find(level => level.code === code)
    if (!level) {
      throw new Error('Level not found')
    }
    return level
  }

  async getModule(code: string, level: string) {
    const modules = await this.getModules()
    const module = modules.find(module => module.code === code && module.level === level)
    if (!module) {
      throw new Error('Module not found')
    }
    return module
  }
}
