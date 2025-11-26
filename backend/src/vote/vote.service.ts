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

  /**
   * Retorna uma lista de nomes de usuário distintos que votaram em um determinado item de pauta.
   *
   * @param agendaId - O identificador do item de pauta para o qual os votantes serão recuperados.
   * @returns Uma promessa que resolve para um array de strings contendo os nomes de usuário dos votantes.
   */
  async getVoters(agendaId: number): Promise<string[]> {
    const voters = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.agendaItem', 'agendaItem')
      .leftJoin('vote.user', 'user')
      .where('agendaItem.agendaId = :agendaId', { agendaId })
      .select(['user.username'])
      .distinct(true)
      .getRawMany();

    return voters.map(v => v.user_username);
  }

  /**
   * Gera um relatório de votos para um determinado item de pauta.
   *
   * Consulta o banco de dados para contar os votos aprovados, reprovados e listar os usuários que se abstiveram.
   * Também retorna o status atual do item de pauta.
   *
   * @param agendaItemId - O ID do item de pauta para o qual o relatório será gerado.
   * @returns Um objeto contendo a quantidade de votos aprovados, reprovados, lista de abstenções (nomes de usuário) e a decisão/status do item de pauta.
   */
  async getVoteReport(agendaItemId: number): Promise<any> {
    const result = { approved: 0, reproved: 0, abstentions: [] as string[], decision: '' };

    const votes = await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.agendaItem', 'agendaItem')
      .where('agendaItem.id = :agendaItemId', { agendaItemId })
      .select([
      'agendaItem.status as agenda_item_status',
      'vote.decision as vote_decision',
      'COUNT(*) as count'
      ])
      .groupBy('vote.decision')
      .getRawMany();

    votes.forEach(v => {
      if (v.vote_decision === 'approve') result.approved = Number(v.count);
      if (v.vote_decision === 'reprove') result.reproved = Number(v.count);
      result.decision = v.agenda_item_status;
    });

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
