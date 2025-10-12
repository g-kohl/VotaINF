import { Body, Controller, Get, Post } from '@nestjs/common';
// Importa AgendaService e AggregatedAgendaItem do serviço
import { AgendaService, AggregatedAgendaItem } from './agenda.service';
// IMPORTAÇÃO CORRIGIDA: Importa VoteStatus diretamente da entidade Vote
import { VoteStatus } from './vote.entity'; 

interface CreateAgendaItemDto {
  assunto: string; 
  descricao: string; 
  arquivosAnexos: string; 
}

interface VoteDto {
  id: number; // ID do AgendaItem
  voto: VoteStatus;
}

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  @Get()
  async getAgenda(): Promise<AggregatedAgendaItem[]> {
    return await this.agendaService.getAgendaItemsWithAggregatedVotes();
  }


  @Post()
  async createAgenda() {
    return await this.agendaService.createAgenda();
  }

  /**
   * POST /agenda/item
   * Cria um novo item de pauta associado à Agenda padrão (ID 1).
   */
  @Post('item')
  async createItem(@Body() body: CreateAgendaItemDto) {
    // Adicionando 'descricao' à chamada do serviço, conforme solicitado pelo DTO
    return await this.agendaService.createAgendaItem(body.assunto, body.descricao, body.arquivosAnexos);
  }

  /**
   * POST /agenda/vote
   * Registra ou atualiza um voto para um item específico.
   */
  @Post('vote')
  async vote(@Body() body: VoteDto): Promise<AggregatedAgendaItem | null> {
    return await this.agendaService.registerVote(body.id, body.voto);
  }
}
