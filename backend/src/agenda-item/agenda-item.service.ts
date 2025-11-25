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
  ) { }

  async create(data: CreateAgendaItemDto): Promise<AgendaItem> {
    const agendaItem = this.agendaItemRepository.create(data);

    return this.agendaItemRepository.save(agendaItem);
  }

  async findAll(): Promise<AgendaItem[]> {
    return this.agendaItemRepository.find({
      relations: ['agenda'],
    });
  }

  async computeResults(itemId: number) {
    const item = await this.agendaItemRepository.findOne({
      where: { id: itemId },
      relations: ['votes']
    });

    if (!item) return;

    const votes = item.votes;

    const approve = votes.filter(v => v.decision === 'approve').length;
    const reprove = votes.filter(v => v.decision === 'reprove').length;
    const abstain = votes.filter(v => v.decision === 'abstain').length;


    let result = 'indecidido';

    if (approve > reprove)
      result = 'aprovado';
    else if (reprove > approve)
      result = 'reprovado';

    item.status = result;

    await this.agendaItemRepository.save(item);

    return item;
  }
}
