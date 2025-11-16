import { Entity, ManyToOne, Column, PrimaryColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { AgendaItem } from "src/agenda-item/agenda-item.entity";

@Entity()
export class Vote {

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  agendaItemId: number;

  @ManyToOne(() => User, user => user.votes, { eager: true })
  user: User;

  @ManyToOne(() => AgendaItem, agendaItem => agendaItem.votes, { eager: true })
  agendaItem: AgendaItem;

  @Column({ type: 'text', nullable: false })
  decision: string;
}
