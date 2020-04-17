import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm'

@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @Column({ nullable: false })
  userId: number

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
