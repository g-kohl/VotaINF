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

  // @Get('today')
  // async findToday(): Promise<Agenda | null> {
  //   const agenda = await this.agendaService.findToday();

  //   if (!agenda) {
  //     throw new NotFoundException('Nenhuma reunião encontrada para o dia atual.');
  //   }

  //   return agenda;
  // }

  @Get()
  async findAll(
    @Query('id') id?: number,
    @Query('begin') begin?: string,
    @Query('end') end?: string,
  ): Promise<any[]> {
    return this.agendaService.findAll(id, begin, end);
  }
}
