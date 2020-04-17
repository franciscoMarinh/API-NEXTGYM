import {
  Entity, PrimaryGeneratedColumn,
  Column, BaseEntity,
  CreateDateColumn, UpdateDateColumn,
  Timestamp
} from 'typeorm'

  @Entity({ name: 'studentActivity' })
export class StudentActivity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    classId: number;

    @Column({ nullable: false })
    studentId: number;

    @Column({ nullable: false })
    description: string;

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp
}
