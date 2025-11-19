import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { Agenda } from './agenda.entity';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(AgendaItem)
    private readonly agendaItemRepository: Repository<AgendaItem>
  ) { }

  async create(createAgendaDto: CreateAgendaDto): Promise<Agenda> {
    const { begin, end, format, place, agendaItemIds } = createAgendaDto;

    const beginDate = new Date(begin);
    const endDate = end ? new Date(end) : undefined;

    let agendaItems: AgendaItem[] = [];

    if (agendaItemIds && agendaItemIds.length > 0) {
      agendaItems = await this.agendaItemRepository.find({
        where: { id: In(agendaItemIds) },
      });

      // Atualiza o status de todos os agendaItems no banco usando TypeORM
      await this.agendaItemRepository.update(
        { id: In(agendaItemIds) },
        { status: 'em-pauta' }
      );

      // Atualiza também os objetos em memória
      agendaItems = agendaItems.map(item => {
        item.status = 'em-pauta';
        return item;
      });
    }

    const agenda = this.agendaRepository.create({
      begin: beginDate,
      end: endDate,
      format,
      place,
      agendaItems,
    });

    return this.agendaRepository.save(agenda);
  }

  async findToday(): Promise<Agenda | null> {
    const today = new Date();
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    return await this.agendaRepository.findOne({
      where: {
        begin: Between(startOfDay, endOfDay),
      },
      relations: ['agendaItems'],
    });
  }

  async findAll(id?: number, begin?: string, end?: string): Promise<Agenda[]> {
    const where: any = {};

    if (id) {
      where.id = id;
    }

    if (begin) {
      const startDate = new Date(begin + 'T00:00:00');
      const endDate = new Date(begin + 'T23:59:59.999');
      where.begin = Between(startDate, endDate);
    }

    if (end) {
      const startDate = new Date(end + 'T00:00:00');
      const endDate = new Date(end + 'T23:59:59.999');
      where.end = Between(startDate, endDate);
    }

    return this.agendaRepository.find({ where });
  }
}
