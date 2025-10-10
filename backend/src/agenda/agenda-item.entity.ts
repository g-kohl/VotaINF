import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Agenda } from './agenda.entity';

@Entity()
export class AgendaItem {
  @PrimaryGeneratedColumn()
  id!: number; // Use non-null assertion

  @Column()
  title!: string; // Use non-null assertion

  @Column({ default: 0 })
  votesYes: number = 0; // Initialization is fine for simple value columns

  @Column({ default: 0 })
  votesNo: number = 0; // Initialization is fine for simple value columns

  @ManyToOne(() => Agenda, (agenda) => agenda.items)
  agenda!: Agenda; // Use non-null assertion

  // Use a simple constructor only for non-relation properties if needed, 
  // but removing it simplifies TypeORM usage further.
  constructor(title: string) {
    this.title = title;
  }
}
