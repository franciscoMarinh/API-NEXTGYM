import {
  Entity, PrimaryGeneratedColumn,
  Column, BaseEntity,
  CreateDateColumn, UpdateDateColumn,
  Timestamp
} from 'typeorm'

@Entity({ name: 'classes' })
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  teacherId: number;

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
