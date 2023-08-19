import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['apelido', 'nome', 'stack'], { fulltext: true })
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 32 })
  apelido: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 10 })
  nascimento: string;

  @Column({ type: 'simple-array', nullable: true })
  stack: string[];
}
