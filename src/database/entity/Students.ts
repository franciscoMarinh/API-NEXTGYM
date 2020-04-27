import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  OneToOne,
} from 'typeorm'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

import { Goal } from './Goals'
import { Teacher } from './Teachers'
import { StudentActivity } from './studentActivity'

@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @Column({ nullable: false })
  userId: number

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, unique: true })
  email: string

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

  /* Hooks */
  @BeforeInsert()
  async encriptPass(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  /* Prototypes */
  async isPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  async generateUserToken(): Promise<string> {
    const genAsync = Promises.promisify(jwt.sign).bind(jwt)
    return genAsync(
      { email: this.email, id: this.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )
  }
}
