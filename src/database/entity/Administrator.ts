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
  OneToOne,
} from 'typeorm'
import { User } from './Users'

@Entity({ name: 'administrator' })
export class Administrator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @OneToOne((type) => User)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Timestamp
}
