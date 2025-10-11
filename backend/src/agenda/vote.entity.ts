import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { AgendaItem } from './agenda-item.entity';

// Tipos de voto definidos no TypeScript
export type VoteStatus = 'Sim' | 'Nao' | 'Diligencia';

@Entity('votos')
// Garante que um votante só possa ter um voto por item de pauta
@Index(['votanteId', 'agendaItem'], { unique: true })
export class Vote {
  @PrimaryGeneratedColumn()
  id!: number;

  // Usamos um ID fixo (1) para simular o usuário logado no service
  @Column({ name: 'votante_id' })
  votanteId: number; 

  // Usamos @CreateDateColumn, que mapeia corretamente para TEXT/DATE no SQLite
  @CreateDateColumn() 
  dataHora!: Date;

  // Corrigido: Usamos 'text' ou 'varchar' (padrão) no TypeORM/SQLite para simular ENUM
  // O valor será armazenado como uma string (Sim, Nao, ou Diligencia)
  @Column() 
  voto!: VoteStatus; 

  // Relacionamento N:1: Muitos Votos para um Item de Pauta
  @ManyToOne(() => AgendaItem, (item) => item.votes)
  agendaItem!: AgendaItem;

  constructor(votanteId: number, voto: VoteStatus) {
    this.votanteId = votanteId;
    this.voto = voto;
  }
}
