import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  JoinTable,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { Class } from './Classes'
import { Student } from './Students'
import { ChatRoom } from './ChatRooms'
import { User } from './Users'

@Entity({ name: 'teacher' })
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ nullable: false, unique: true })
  license: string

  @CreateDateColumn({ nullable: false })
  birthDate: Timestamp

  @Column({ nullable: false })
  biography: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  /* Relationships */
  @OneToMany((type) => Class, (classes) => classes.teacher)
  @JoinTable()
  classes: Class[]

  @OneToMany((type) => Student, (student) => student.teacher)
  student: Student[]

  @OneToMany((type) => ChatRoom, (chatRoom) => chatRoom.teacher)
  @JoinTable()
  chatRooms: ChatRoom[]

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  /* ClassMethods */
  static getTeacherProfile = async (userId: number): Promise<Teacher> => {
    const teacher = await Teacher.findOne({
      where: { user: { id: userId } },
    })

    if (!teacher) throw new Error('The user not is a teacher')

    return teacher
  }
}
