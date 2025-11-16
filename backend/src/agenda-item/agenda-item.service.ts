import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendaItem } from './agenda-item.entity';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';

@Injectable()
export class AgendaItemService {
  constructor(
    @InjectRepository(AgendaItem)
    private readonly agendaItemRepository: Repository<AgendaItem>,
  ) {}

  async create(data: CreateAgendaItemDto): Promise<AgendaItem> {
    const agendaItem = this.agendaItemRepository.create(data);

    return this.agendaItemRepository.save(agendaItem);
  }

  async findAll(): Promise<AgendaItem[]> {
    return this.agendaItemRepository.find({
      relations: ['agenda'],
    });
  }
}
