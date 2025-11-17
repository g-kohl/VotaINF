import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: false })
  begin: Date;

  @Column({ type: 'datetime', nullable: true })
  end: Date;

  @Column({type: 'text', nullable: false})
  format: string;

  @Column({type: 'text', nullable: false, default: 'futuro'})
  status: string;

  @Column({ type: 'text', nullable: true })
  place: string;

  @OneToMany(() => AgendaItem, agendaItem => agendaItem.agenda)
  agendaItems: AgendaItem[];
}
