import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  JoinTable,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { Class } from './Classes'
import { Student } from './Students'
import { ChatRoom } from './ChatRooms'
import { User } from './Users'

@Entity({ name: 'teacher' })
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false, unique: true })
  license: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  /* Relationships */
  @OneToMany((type) => Class, (classes) => classes.teacher)
  @JoinTable()
  classes: Class[]

  @OneToMany((type) => Student, (student) => student.teacher)
  @JoinTable()
  student: Student[]

  @OneToMany((type) => ChatRoom, (chatRoom) => chatRoom.teacher)
  @JoinTable()
  chatRooms: ChatRoom[]

  @OneToOne((type) => User)
  @JoinColumn()
  user: User
}
