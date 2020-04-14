import {
  Entity, PrimaryGeneratedColumn,
  Column, BaseEntity, Generated,
  CreateDateColumn, UpdateDateColumn,
  Timestamp, BeforeInsert
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
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

  /* hooks */
  @BeforeInsert()
  async encriptPass (): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  /* prototypes */
  async isPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
