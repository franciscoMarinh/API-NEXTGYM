import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
  OneToOne,
  BaseEntity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Goal } from './Goals'
import { Teacher } from './Teachers'
import { StudentActivity } from './studentActivity'
import { User } from './Users'

@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  /* Relationships */
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

  @OneToOne((type) => User)
  @JoinColumn()
  user: User
}
