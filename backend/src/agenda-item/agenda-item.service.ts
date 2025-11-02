import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendaItem } from './agenda-item.entity';

@Injectable()
export class AgendaItemService {
  constructor(
    @InjectRepository(AgendaItem)
    private readonly agendaItemRepository: Repository<AgendaItem>,
  ) {}

  async create(data: {title: string; description?: string}): Promise<AgendaItem> {
    const agendaItem = this.agendaItemRepository.create(data);

    return this.agendaItemRepository.save(agendaItem);
  }
}
