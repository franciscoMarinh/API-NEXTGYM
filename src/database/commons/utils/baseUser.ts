import {
  BaseEntity,
  BeforeInsert,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

import config from '../config/auth.config'
import { ColumnEnumOptions } from 'typeorm/decorator/options/ColumnEnumOptions'

export class BaseUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false, enum: ['teacher', 'student'] })
  typeProfile: string

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
      { email: this.email, id: this.id, typeProfile: this.typeProfile },
      config.privateKey,
      config.configOptions
    )
  }
}
