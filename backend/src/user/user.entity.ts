import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "src/vote/vote.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  role: string;

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];
}