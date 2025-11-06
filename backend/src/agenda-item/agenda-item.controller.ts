import { Controller, Post, Body, Get } from '@nestjs/common';
import { AgendaItemService } from './agenda-item.service';
import { AgendaItem } from './agenda-item.entity';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';

@Controller('agenda-item')
export class AgendaItemController {
  constructor(private readonly agendaItemService: AgendaItemService) { }

  @Post()
  async create(@Body() data: CreateAgendaItemDto): Promise<AgendaItem> {
    return this.agendaItemService.create(data);
  }

  @Get()
  async findAll(): Promise<AgendaItem[]> {
    return this.agendaItemService.findAll();
  }
}
