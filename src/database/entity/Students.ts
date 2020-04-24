import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Goal } from './Goals'
import { User } from './User'
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

  @OneToOne(type => User, user => user.student)
  user: User;

  @ManyToMany(type => StudentActivity, studentActivity => studentActivity.student)
  @JoinTable()
  studentActivity: StudentActivity[];

  @ManyToMany(type => Goal, goals => goals.student)
  @JoinTable()
  goals: Goal[];

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
