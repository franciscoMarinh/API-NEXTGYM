import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  ManyToMany,
} from 'typeorm'

import { Class } from './Classes'

@Entity({ name: 'place' })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  place: string

  @Column({ nullable: false })
  classId: number

  @ManyToMany((type) => Class, (classes) => classes.place)
  classes: Class[]

  @CreateDateColumn({ nullable: false })
  exerciseDate: Timestamp
}
