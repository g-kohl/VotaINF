import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/user/user.entity";
import { AgendaItem } from "src/agenda-item/agenda-item.entity";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  decision: string;

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => AgendaItem, agendaItem => agendaItem.votes)
  agendaItem: AgendaItem;
}