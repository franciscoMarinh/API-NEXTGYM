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

import { Class } from './Classes'

@Entity({ name: 'classActivity' })
export class ClassActivity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  classId: number

  @Column({ nullable: false })
  description: string

  @ManyToMany((type) => Class, (Class) => Class.classActivity)
  classes: Class[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
