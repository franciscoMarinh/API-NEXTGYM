import {
  Entity, PrimaryGeneratedColumn,
  Column, BaseEntity,
  CreateDateColumn, UpdateDateColumn,
  Timestamp, BeforeInsert
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  /* Class method */
  static async findByEmail (email: string, password: string): Promise<User> {
    const user = await this.findOne({ email })
    if (!user) throw new Error('user not found')
    if (!await user.isPassword(password)) throw new Error('password incorret')
    return user
  }

  /* Hooks */
  @BeforeInsert()
  async encriptPass (): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  /* Prototypes */
  async isPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
