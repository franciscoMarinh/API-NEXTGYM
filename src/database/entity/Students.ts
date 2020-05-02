import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm'

import { BaseUser } from '../commons/utils/baseUser'

import { Goal } from './Goals'
import { Teacher } from './Teachers'
import { StudentActivity } from './studentActivity'

@Entity({ name: 'student' })
export class Student extends BaseUser {
  @Column({ nullable: false })
  name: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @OneToOne((type) => Teacher, (teacher) => teacher.student)
  teacher: Teacher

  @ManyToMany(
    (type) => StudentActivity,
    (studentActivity) => studentActivity.student
  )
  @JoinTable()
  studentActivity: StudentActivity[]

  @ManyToMany((type) => Goal, (goals) => goals.student)
  @JoinTable()
  goals: Goal[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  static async findByEmail(email: string, password: string): Promise<Student> {
    const student = await this.findOne({ email })
    if (!student) throw new Error('user not found')
    if (!(await student.isPassword(password)))
      throw new Error('password incorret')
    return student
  }
}
