import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  BaseEntity,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from 'typeorm'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

import config from '../commons/config/auth.config'
import { Student } from './Students'
import { Teacher } from './Teachers'
import { Message } from './Messages'
import { Administrator } from './Administrator'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false, select: false })
  password: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @OneToOne((type) => Student, (student) => student.user, {
    onDelete: 'CASCADE',
  }) // specify inverse side as a second parameter
  student: Student

  @OneToOne((type) => Teacher, (teacher) => teacher.user, {
    onDelete: 'CASCADE',
  }) // specify inverse side as a second parameter
  teacher: Teacher

  @OneToOne((type) => Administrator, (administrator) => administrator.user, {
    onDelete: 'CASCADE',
  }) // specify inverse side as a second parameter
  administrator: Administrator

  @OneToMany((type) => Message, (message) => message.author)
  messages: Message[]

  /* Hooks */
  @BeforeInsert()
  async encriptPass(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  /* Prototypes */
  async isPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  async generateToken(): Promise<string> {
    const genAsync = Promises.promisify(jwt.sign).bind(jwt)
    return genAsync(
      { email: this.email, id: this.id },
      config.privateKey,
      config.configOptions
    )
  }

  /* Class Methods */
  static async findByEmail(email: string, password: string): Promise<User> {
    const user = await this.findOne(
      { email },
      { select: ['password', 'email', 'id'] }
    )
    if (!user) throw new Error('user not found')
    if (!(await user.isPassword(password))) throw new Error('password incorret')
    return user
  }

  static async getProfile(id: string) {
    const user = await User.findOne({
      where: { id },
      relations: ['student', 'teacher', 'administrator'],
    })

    if (!user.student) delete user.student
    if (!user.administrator) delete user.administrator
    if (!user.teacher) delete user.teacher

    return user
  }
}
