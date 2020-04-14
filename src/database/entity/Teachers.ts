import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  licenca: string;

  @Column()
  dataNascimentousers: Date;

  @Column()
  biografia: string;

  @Column()
  idUsuario: number
}
