import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AgendaItem } from './agenda-item.entity';

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AgendaItem, (item) => item.agenda, { cascade: true })
  items: AgendaItem[];

  constructor(id?: number, items?: AgendaItem[]) {
    if (id) this.id = id;
    if (items) this.items = items;
  }
}
