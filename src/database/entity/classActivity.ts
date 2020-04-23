import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany
} from 'typeorm'

@Entity({ name: 'classActivity' })
export class ClassActivity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  classId: number

  @Column({ nullable: false })
  description: string

  @ManyToMany(type => Classes, classes => classes.classActivity)
  classes: Classes[]

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp
}
