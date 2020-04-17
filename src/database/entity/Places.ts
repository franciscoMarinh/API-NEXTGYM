import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
} from 'typeorm'

@Entity({ name: 'place' })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  place: string

  @Column({ nullable: false })
  classId: number

  @CreateDateColumn({ nullable: false })
  exerciseDate: Timestamp
}
