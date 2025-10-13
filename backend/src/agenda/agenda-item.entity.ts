import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Agenda } from './agenda.entity';

@Entity()
export class AgendaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: '' })
  vote: string;

  @ManyToOne(() => Agenda, (agenda) => agenda.items)
  agenda: Agenda;

  constructor(id?: number, title?: string, description?: string) {
    if (id) this.id = id;
    if (title) this.title = title;
    if (description) this.description = description;
    this.vote = '';
  }
}
