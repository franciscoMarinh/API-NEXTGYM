import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm'
import { ChatRoom } from './ChatRooms'
import { User } from './Users'

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  message: string

  @ManyToOne((type) => User, (user) => user.messages, {})
  @JoinColumn({ name: 'authorId' })
  author: User

  @ManyToOne((type) => ChatRoom, (chatRoom) => chatRoom.messages)
  @JoinColumn({ name: 'chatId' })
  chat: ChatRoom

  @CreateDateColumn()
  createdAt: Timestamp

  @Column({ nullable: false })
  authorId: string
}
