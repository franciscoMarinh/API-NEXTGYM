import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
} from 'typeorm'

import { Student } from './Students'

@Entity({ name: 'goals' })
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  tittle: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: false })
  userId: number

  @ManyToMany((type) => Student, (student) => student.goals)
  student: Student[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
