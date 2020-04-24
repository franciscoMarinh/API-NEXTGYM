import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm'

import { Class } from './Classes'
import { User } from './User'

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

  @Column({ nullable: false })
  biography: string

  @Column({ nullable: false })
  userId: number

  @OneToOne(type => User, user => user.teacher)
  user: User;

  @OneToMany(type => Class, classes => classes.teacher)
  @JoinTable()
  classes: Class[];

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

}
