import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Vote } from "src/vote/vote.entity";
import { Agenda } from "src/agenda/agenda.entity";

@Entity()
export class AgendaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', default: "nao-pautado" })
  status: string;

  @CreateDateColumn({ name: 'dateCreation' })
  dateCreation: Date;

  @OneToMany(() => Vote, vote => vote.agendaItem)
  votes: Vote[];

  @ManyToOne(() => Agenda, agenda => agenda.agendaItems, {nullable: true, onDelete: 'SET NULL'})
  agenda: Agenda;
}