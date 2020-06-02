import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { ChatRoom } from './ChatRooms'

@Entity({ name: 'messages' })
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  message: string

  @Column({ nullable: false })
  author: string

  @ManyToOne((type) => ChatRoom, (chatRoom) => chatRoom.messages)
  @JoinColumn({ name: 'chatId' })
  chat: ChatRoom

  @Column()
  chatId: number

  @CreateDateColumn()
  createdAt: Timestamp
}
