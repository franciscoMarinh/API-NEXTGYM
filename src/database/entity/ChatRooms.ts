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
import student from 'src/api/modules/student'

@Entity({ name: 'chatRoom' })
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @OneToOne((type) => Student)
  @JoinColumn()
  student: Student

  @ManyToOne((type) => Teacher, (teacher) => teacher.chatRooms)
  @JoinColumn()
  teacher: Teacher

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[]

  @CreateDateColumn()
  createdAt: Timestamp
}
