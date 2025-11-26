import { Body, Controller, Get, Post, NotFoundException, Query } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { Agenda } from './agenda.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  @Post()
  async create(@Body() dto: CreateAgendaDto): Promise<Agenda> {
    return this.agendaService.create(dto);
  }

  @Post("finish-agenda")
  async finishAgenda(@Body('id') id: number): Promise<void> {
    await this.agendaService.finishAgenda(id);
  }

  @Get()
  async findAll(
    @Query('id') id?: number,
    @Query('begin') begin?: string,
    @Query('end') end?: string,
  ): Promise<any[]> {
    return this.agendaService.findAll(id, begin, end);
  }

  @Get("agenda-items")
  /**
   * Retorna os itens da agenda associados ao ID fornecido.
   *
   * @param agendaId - O ID da agenda para filtrar os itens.
   * @returns Uma promessa que resolve para um array de itens da agenda.
   */
  async findAgendaItems(@Query('agendaId') agendaId: number): Promise<any[]> {
    return this.agendaService.findAgendaItems(agendaId);
  }
}
