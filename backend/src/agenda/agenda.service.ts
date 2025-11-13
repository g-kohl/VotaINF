import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Agenda } from './agenda.entity';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,

    @InjectRepository(AgendaItem)
    private readonly agendaItemRepository: Repository<AgendaItem>,
  ) {}

  /**
   * Create a new Agenda and attach provided agenda items (if any)
   */
  async create(dto: CreateAgendaDto): Promise<Agenda | null> {
    const partial: Partial<Agenda> = {
      begin: dto.begin ? new Date(dto.begin) : new Date(),
      end: dto.end ? new Date(dto.end) : undefined,
      place: dto.place ?? ''
    };

  // Save the partial object directly; TypeORM will create an entity and persist it.
  const saved = await this.agendaRepository.save(partial as any);

    if (dto.itemIds && dto.itemIds.length > 0) {
      const items = await this.agendaItemRepository.findBy({ id: In(dto.itemIds) });

      for (const item of items) {
        item.agenda = saved;
      }

      await this.agendaItemRepository.save(items);
    }

    // return the agenda including attached items
  return this.agendaRepository.findOne({ where: { id: (saved as Agenda).id }, relations: ['agendaItems'] });
  }
}
