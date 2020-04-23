import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToOne,
  ManyToMany,
  JoinTable
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

  @OneToOne(type => User, user => user.student)
  user: User;

  @ManyToMany(type => StudentActivity, activity => activity.student)
  @JoinTable()
  activity: StudentActivity[];

  @ManyToMany(type => Goals, goal => goal.student)
  @JoinTable()
  goal: Goals[];

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
