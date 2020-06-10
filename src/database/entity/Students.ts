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
  OneToMany,
  ManyToOne,
} from 'typeorm'

import { Goal } from './Goals'
import { Teacher } from './Teachers'
import { StudentActivity } from './studentActivity'
import { User } from './Users'
import { ChatRoom } from './ChatRooms'

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
  @ManyToOne((type) => Teacher, (teacher) => teacher.student)
  @JoinColumn()
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

  @OneToOne((type) => ChatRoom, (chatRoom) => chatRoom.student)
  chatRoom: ChatRoom

  @OneToOne((type) => User)
  @JoinColumn()
  user: User
}
