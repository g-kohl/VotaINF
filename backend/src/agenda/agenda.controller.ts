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

  @Get()
  async findAll(
    @Query('id') id?: number,
    @Query('begin') begin?: string,
    @Query('end') end?: string,
  ): Promise<any[]> {
    return this.agendaService.findAll(id, begin, end);
  }

  @Post("finish-agenda")
  async finishAgenda(@Body('id') id: number): Promise<void> {
    await this.agendaService.finishAgenda(id);
  }
}
