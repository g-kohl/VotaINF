import { Body, Controller, Post } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  @Post()
  async create(@Body() dto: CreateAgendaDto) {
    return this.agendaService.create(dto);
  }

}
