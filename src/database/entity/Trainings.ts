import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { Teacher } from './Teachers'
import { Student } from './Students'

@Entity({ name: 'training' })
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne((type) => Student)
  @JoinColumn()
  student: Student

  @Column()
  title: string

  @Column()
  urlYoutube: string

  @Column({ type: 'text' })
  description: string

  @ManyToOne((type) => Teacher)
  @JoinColumn()
  teacher: Teacher

  @CreateDateColumn({ nullable: false })
  exerciseDate: Timestamp
}
