import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Assumindo que você tem as entidades Agenda, AgendaItem e Vote
import { Agenda } from './agenda.entity';
import { AgendaItem } from './agenda-item.entity';
import { Vote, VoteStatus } from './vote.entity'; // Importa VoteStatus para tipagem

// ID fixo para simular o usuário logado (deve ser substituído por contexto de autenticação real)
const SIMULATED_VOTER_ID = 1;

// Interface de retorno com os campos agregados esperados pelo frontend
export interface AggregatedAgendaItem extends AgendaItem { // EXPORTADO para o Controller
    votesSim: number;
    votesNao: number;
    votesDiligencia: number;
    userVote: VoteStatus | null;
}

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
    @InjectRepository(AgendaItem)
    private agendaItemRepository: Repository<AgendaItem>,
    @InjectRepository(Vote) // Injetando o novo repositório de Votos
    private voteRepository: Repository<Vote>,
  ) {}

  /**
   * Retorna os itens de pauta da Agenda ID 1, com contagem de votos agregada.
   */
  async getAgendaItemsWithAggregatedVotes(): Promise<AggregatedAgendaItem[]> {
    // 1. Busca todos os itens de pauta associados à Agenda ID 1
    const items = await this.agendaItemRepository.find({
        where: { agenda: { id: 1 } as any },
        select: ['id', 'assunto', 'descricao', 'arquivosAnexos'],
    });

    if (!items.length) {
        return [];
    }
    
    const itemIds = items.map(i => i.id);

    // 2. Agrega os votos para os itens encontrados em uma única consulta
    const voteCounts = await this.voteRepository
        .createQueryBuilder("vote")
        .select("vote.agendaItem", "itemId")
        .addSelect("SUM(CASE WHEN vote.voto = 'Sim' THEN 1 ELSE 0 END)", "votesSim")
        .addSelect("SUM(CASE WHEN vote.voto = 'Nao' THEN 1 ELSE 0 END)", "votesNao")
        .addSelect("SUM(CASE WHEN vote.voto = 'Diligencia' THEN 1 ELSE 0 END)", "votesDiligencia")
        .where("vote.agendaItem IN (:...itemIds)", { itemIds })
        .groupBy("vote.agendaItem")
        .getRawMany();
    
    // 3. Busca o voto individual do usuário simulado
    const userVotes = await this.voteRepository.find({
        where: {
            votanteId: SIMULATED_VOTER_ID,
            agendaItem: { id: itemIds } as any,
        },
        relations: ['agendaItem'], // Precisa do relacionamento para mapeamento
    });

    // 4. Mapeia os dados e os retorna no formato final esperado pelo frontend
    return items.map(item => {
        const counts = voteCounts.find(vc => vc.itemId === item.id) || {};
        const userVote = userVotes.find(uv => uv.agendaItem.id === item.id);
        
        return {
            ...item,
            votesSim: parseInt(counts.votesSim || '0', 10),
            votesNao: parseInt(counts.votesNao || '0', 10),
            votesDiligencia: parseInt(counts.votesDiligencia || '0', 10),
            userVote: userVote ? userVote.voto : null,
        } as AggregatedAgendaItem;
    });
  }

  /**
   * Cria um novo item de pauta e o associa à Agenda ID 1.
   */
  async createAgendaItem(assunto: string, descricao: string, arquivosAnexos: string): Promise<AgendaItem> {
    const parentAgenda = await this.agendaRepository.findOneBy({ id: 1 }); 

    if (!parentAgenda) {
        throw new InternalServerErrorException('No parent Agenda found. Please create an Agenda with ID 1 first.');
    }

    const newItem = new AgendaItem();
    newItem.assunto = assunto;
    newItem.descricao = descricao;
    newItem.arquivosAnexos = arquivosAnexos;
    newItem.agenda = parentAgenda;

    return this.agendaItemRepository.save(newItem);
  }

  /**
   * Registra ou atualiza o voto de um usuário simulado para um item.
   */
  async registerVote(itemId: number, voto: VoteStatus): Promise<AggregatedAgendaItem | null> {
    const item = await this.agendaItemRepository.findOneBy({ id: itemId });

    if (!item) {
        return null;
    }

    // Tenta encontrar um voto existente do usuário
    let voteEntity = await this.voteRepository.findOne({
        where: { votanteId: SIMULATED_VOTER_ID, agendaItem: { id: itemId } as any },
    });

    if (voteEntity) {
        // Atualiza o voto
        voteEntity.voto = voto;
        await this.voteRepository.save(voteEntity);
    } else {
        // Correção: Agora passamos votanteId e voto para o construtor
        voteEntity = new Vote(SIMULATED_VOTER_ID, voto); 
        voteEntity.agendaItem = item;
        await this.voteRepository.save(voteEntity);
    }

    // Após salvar, retorna o item com a contagem de votos atualizada
    const updatedItems = await this.getAgendaItemsWithAggregatedVotes();
    return updatedItems.find(i => i.id === itemId) || null;
  }

  // Métodos antigos que podem ser removidos, mantidos para evitar erro de compilação
  async getAgenda(): Promise<Agenda | null> {
      // Este método foi substituído por getAgendaItemsWithAggregatedVotes() no Controller
      // Mas o TypeORM exige um filtro para findOne. 
      return this.agendaRepository.findOne({ where: { id: 1 }, relations: ['items'] });
  }

  async createAgenda(): Promise<Agenda> {
    const newAgenda = new Agenda();
    return this.agendaRepository.save(newAgenda);
  }
}
