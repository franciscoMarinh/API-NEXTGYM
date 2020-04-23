import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  BeforeInsert,
  OneToOne,
  JoinColumn
} from 'typeorm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @OneToOne(type => Student, student => student.user)
  @JoinColumn()
  student: Student;

   @OneToOne(type => Teacher, teacher => teacher.user)
   @JoinColumn()
   teacher: Teacher;

  /* Class method */
  static async findByEmail(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email })
    if (!user) throw new Error('user not found')
    if (!(await user.isPassword(password))) throw new Error('password incorret')
    return user
  }

  /* Hooks */
  @BeforeInsert()
  async encriptPass(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  /* Prototypes */
  async isPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  async generateUserToken(): Promise<string> {
    const genAsync = Promises.promisify(jwt.sign).bind(jwt)
    return genAsync(
      { email: this.email, id: this.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )
  }
}
