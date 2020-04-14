import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataNascimento: Date;

  @Column()
  idUsuario: number;

  @Column()
  Biografia: string;
}
