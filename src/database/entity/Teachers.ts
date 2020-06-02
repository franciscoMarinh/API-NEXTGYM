import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  JoinTable,
} from 'typeorm'

import { BaseUser } from '../commons/utils/baseUser'

import { Class } from './Classes'
import { Student } from './Students'
import { ChatRoom } from './ChatRooms'

@Entity({ name: 'teacher' })
export class Teacher extends BaseUser {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  license: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  biography: string

  @OneToMany((type) => Class, (classes) => classes.teacher)
  @JoinTable()
  classes: Class[]

  @OneToMany((type) => Student, (student) => student.teacher)
  @JoinTable()
  student: Student[]

  @OneToMany((type) => ChatRoom, (chatRoom) => chatRoom.teacher)
  @JoinTable()
  chatRooms: ChatRoom[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  static async findByEmail(email: string, password: string): Promise<Teacher> {
    const teacher = await this.findOne({ email })
    if (!teacher) throw new Error('user not found')
    if (!(await teacher.isPassword(password)))
      throw new Error('password incorret')
    return teacher
  }
}
