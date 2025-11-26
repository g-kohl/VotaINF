import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) { }

  async createVote(dto: CreateVoteDto): Promise<Vote> {
    const existing = await this.voteRepository.findOne({
      where: { userId: dto.userId, agendaItemId: dto.agendaItemId },
    });

    if (existing) {
      throw new Error('Usuário já votou nesse item de pauta');
    }

    const vote = this.voteRepository.create(dto);

    return this.voteRepository.save(vote);
  }

  async findByAgendaItem(agendaItemId: number): Promise<Vote[]> {
    return this.voteRepository.find({ where: { agendaItemId } });
  }

  async findUserVote(userId: number, agendaItemId: number): Promise<Vote | null> {
    return this.voteRepository.findOne({ where: { userId, agendaItemId } })
  }

  async getVoteReport(agendaItemId: number): Promise<any> {
    const result = { approved: 0, reproved: 0, voters: [] as string[], abstentions: [] as string[] };
    
    const votes = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.agendaItem', 'agendaItem')
      .where('agendaItem.id = :agendaItemId', { agendaItemId })
      .select([
      'vote.decision',
      'agendaItem.agendaId',
      'COUNT(*) as count'
      ])
      .getRawMany();

    votes.forEach(v => {
      if (v.vote_decision === 'approve') result.approved = Number(v.count);
      if (v.vote_decision === 'reprove') result.reproved = Number(v.count);
      console.log(v);
    });

    const users = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.user', 'user')
      .leftJoin('vote.agendaItem', 'agendaItem')
      .where('agendaItem.id = :agendaItemId', { agendaItemId })
      .select(['user.username'])
      .getRawMany();

    result.voters = users.map(u => u.user_username);

    const abstentions = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.user', 'user')
      .leftJoin('vote.agendaItem', 'agendaItem')
      .where('agendaItem.id = :agendaItemId', { agendaItemId })
      .andWhere('vote.decision = :decision', { decision: 'abstain' })
      .select(['user.username'])
      .getRawMany();

    result.abstentions = abstentions.map(a => a.user_username);

    return result;
  }
}
