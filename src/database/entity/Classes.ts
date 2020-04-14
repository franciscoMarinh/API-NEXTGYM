import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataCriacao: string;

  @Column()
  descricao: string;
}
