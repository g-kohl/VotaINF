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
}
