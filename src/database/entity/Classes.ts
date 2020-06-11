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
} from 'typeorm'

import { ClassActivity } from './classActivity'
import { Teacher } from './Teachers'
import { Warning } from './Warnings'

@Entity({ name: 'classes' })
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: false })
  teacherId: number

  @ManyToMany((type) => Teacher, (teacher) => teacher.classes)
  teacher: Teacher

  @ManyToMany((type) => Warning, (warning) => warning.classes)
  @JoinTable()
  warning: Warning[]

  @ManyToMany((type) => ClassActivity, (classActivity) => classActivity.classes)
  @JoinTable()
  classActivity: ClassActivity[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
