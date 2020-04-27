import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

import { Class } from './Classes'
import { Student } from './Students'

@Entity({ name: 'teacher' })
export class Teacher extends BaseEntity {
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

  @Column({ nullable: false })
  userId: number

  @OneToMany((type) => Class, (classes) => classes.teacher)
  @JoinTable()
  classes: Class[]

  @OneToMany((type) => Student, (student) => student.teacher)
  @JoinTable()
  student: Student[]

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
