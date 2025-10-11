// agenda.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agenda } from './agenda.entity';
import { AgendaItem } from './agenda-item.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
    @InjectRepository(AgendaItem)
    private agendaItemRepository: Repository<AgendaItem>,
  ) {}

  async getAgenda(): Promise<Agenda | null> {
      return this.agendaRepository.findOne({
        where: { id: 1 }, // Added a condition to find by a specific ID
        relations: ['items'],
      });
  }
  // New method to create an Agenda
  async createAgenda(): Promise<Agenda> {
    const newAgenda = new Agenda();
    return this.agendaRepository.save(newAgenda);
  }

  async vote(itemId: number, vote: boolean): Promise<AgendaItem | null> {
    const item = await this.agendaItemRepository.findOneBy({ id: itemId });

    if (item) {
      if (vote) {
        item.votesYes++;
      } else {
        item.votesNo++;
      }
      
      return this.agendaItemRepository.save(item);
    }

    return null;
  }
  
  async createAgendaItem(title: string): Promise<AgendaItem> {
    const parentAgenda = await this.agendaRepository.findOneBy({ id: 1 }); 

    if (!parentAgenda) {
        throw new Error('No parent Agenda found. Please create an Agenda first.');
    }

    const newItem = new AgendaItem(title);
    newItem.agenda = parentAgenda;

    return this.agendaItemRepository.save(newItem);
  }
}