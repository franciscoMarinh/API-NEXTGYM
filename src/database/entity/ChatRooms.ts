import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { Teacher } from './Teachers'
import { Student } from './Students'
import { Message } from './Messages'

@Entity({ name: 'chatRoom' })
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @OneToOne((type) => Student)
  @JoinColumn()
  student: Student

  @ManyToOne((type) => Teacher, (teacher) => teacher.chatRooms, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  teacher: Teacher

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[]

  @CreateDateColumn()
  createdAt: Timestamp
}
