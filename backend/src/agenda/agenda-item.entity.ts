import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Vote } from './vote.entity';
import { Agenda } from './agenda.entity';

@Entity('agenda_itens')
export class AgendaItem {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  assunto!: string; // Trocado 'title' por 'assunto'

  @Column({ nullable: true })
  arquivosAnexos?: string; // String para o caminho/URL do anexo

  // Mantida a relação com Agenda (sua entidade de Reunião, por enquanto)
  @ManyToOne(() => Agenda, (agenda) => agenda.items)
  agenda!: Agenda;
  
  // Relação 1:N com Votos (para rastreamento)
  @OneToMany(() => Vote, (vote) => vote.agendaItem, { cascade: true })
  votes!: Vote[]; 

  constructor() {}
}
