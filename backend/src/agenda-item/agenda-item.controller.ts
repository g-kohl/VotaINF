import { Controller, Post, Body } from '@nestjs/common';
import { AgendaItemService } from './agenda-item.service';
import { AgendaItem } from './agenda-item.entity';

@Controller('agenda-item')
export class AgendaItemController {
  constructor(private readonly agendaItemService: AgendaItemService) {}

  @Post()
  async create(@Body() data: { title: string; description?: string}): Promise<AgendaItem> {
    return this.agendaItemService.create(data);
  }
}
