import { Body, Controller, Get, Post, Param } from '@nestjs/common';
// Importa AgendaService e AggregatedAgendaItem do serviço
import { AgendaService, AggregatedAgendaItem } from './agenda.service';
// IMPORTAÇÃO CORRIGIDA: Importa VoteStatus diretamente da entidade Vote
import { VoteStatus } from './vote.entity'; 

/**
 * DTO para criação de item de pauta.
 * Usa os novos campos: 'assunto' e 'arquivosAnexos'.
 */
interface CreateAgendaItemDto {
  assunto: string;          
  arquivosAnexos: string;   
}

/**
 * DTO para registro de voto.
 */
interface VoteDto {
  id: number; // ID do AgendaItem
  voto: VoteStatus;
}

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  /**
   * GET /agenda
   * Retorna a lista de itens de pauta com contagens de votos agregadas.
   */
  @Get()
  async getAgenda(): Promise<AggregatedAgendaItem[]> {
    // Chama a função correta do serviço, que retorna AggregatedAgendaItem[]
    return await this.agendaService.getAgendaItemsWithAggregatedVotes();
  }

  /**
   * POST /agenda/item
   * Cria um novo item de pauta associado à Agenda padrão (ID 1).
   */
  @Post('item')
  async createItem(@Body() body: CreateAgendaItemDto) {
    // Mapeia os novos campos do DTO para a função de serviço
    return await this.agendaService.createAgendaItem(body.assunto, body.arquivosAnexos);
  }

  /**
   * POST /agenda/vote
   * Registra ou atualiza um voto para um item específico.
   */
  @Post('vote')
  async vote(@Body() body: VoteDto): Promise<AggregatedAgendaItem | null> {
    // Mapeia os campos do DTO para a função de serviço
    return await this.agendaService.registerVote(body.id, body.voto);
  }

  // O endpoint POST /agenda (para criar a agenda) não foi re-adicionado,
  // pois estamos focados na lógica de votação e itens.
}
