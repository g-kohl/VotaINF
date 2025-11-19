import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between, LessThan, MoreThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  async findAll(): Promise<Agenda[]> {
    return this.agendaRepository.find();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateAgendaStatuses() {
    const now = new Date();

    await this.agendaRepository.update(
      {
        begin: MoreThan(now),
      },
      { status: 'futuro' },
    );

    await this.agendaRepository.update(
      {
        begin: LessThan(now),
        end: MoreThan(now),
      },
      { status: 'em-andamento' },
    );

    await this.agendaRepository.update(
      {
        end: LessThan(now),
      },
      { status: 'finalizada' },
    );
  }
}
