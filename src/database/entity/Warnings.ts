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
import { Class } from "./Classes"

@Entity({ name: 'warning' })
export class Warning extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  tittle: string

  @Column({ nullable: false })
  classId: number

  @Column({ nullable: false })
  description: string

  @ManyToMany(type => Class, classes => classes.warning)
  classes: Class[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
