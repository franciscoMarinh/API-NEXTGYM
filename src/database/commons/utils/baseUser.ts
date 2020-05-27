import {
  BaseEntity,
  BeforeInsert,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

import { privateKey } from '../config/auth.config'

export class BaseUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, unique: true })
  email: string

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
    return genAsync({ email: this.email, id: this.id }, privateKey, {
      expiresIn: process.env.JWT_EXPIRES,
    })
  }
}
