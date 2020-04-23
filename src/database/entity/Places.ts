import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable
} from 'typeorm'

@Entity({ name: 'place' })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  place: string

  @Column({ nullable: false })
  classId: number

  @ManyToMany(type => Classes, classes => classes.place)
  classes: Classes[];

  @CreateDateColumn({ nullable: false })
  exerciseDate: Timestamp
}
