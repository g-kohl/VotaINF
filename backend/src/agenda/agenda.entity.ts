import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AgendaItem } from './agenda-item.entity';

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id!: number; // Use non-null assertion as TypeORM populates this

  @OneToMany(() => AgendaItem, (agendaItem) => agendaItem.agenda, { cascade: true })
  items!: AgendaItem[]; // Use non-null assertion; TypeORM initializes the relation array

  // Removed constructor to avoid initializing 'items' with '=[]'
}
