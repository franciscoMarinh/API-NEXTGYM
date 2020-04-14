import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  local: string;

  @Column()
  idTurma: number;
}
