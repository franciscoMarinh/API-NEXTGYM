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
  OneToMany,
} from 'typeorm'

import { Teacher } from './Teachers'
import { Student } from './Students'
import { Messages } from './Messages'

@Entity({ name: 'chatRoom' })
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @OneToOne(() => Student)
  @JoinColumn()
  student: number

  @Column()
  studentId: number

  @ManyToOne((type) => Teacher, (teacher) => teacher.chatRooms)
  @JoinColumn()
  teacher: number

  @Column()
  teacherId: number

  @OneToMany((type) => Messages, (messages) => messages.chat)
  messages: Messages[]

  @CreateDateColumn()
  createdAt: Timestamp
}
