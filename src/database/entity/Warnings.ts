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
  tittle: string

  @Column({ nullable: false })
  classId: number

  @Column({ nullable: false })
  description: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
