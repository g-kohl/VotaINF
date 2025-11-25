import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between, MoreThan, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Agenda } from './agenda.entity';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { AgendaItemService } from 'src/agenda-item/agenda-item.service';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(AgendaItem)
    private readonly agendaItemRepository: Repository<AgendaItem>,

    private readonly agendaItemService: AgendaItemService
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

    if (begin && end) {
      const startDate = new Date(begin + 'T00:00:00');
      const endDate = new Date(end + 'T23:59:59.999');
      where.begin = Between(startDate, endDate);
    } else if (begin) {
      const startDate = new Date(begin + 'T00:00:00');
      where.begin = MoreThanOrEqual(startDate);
    } else if (end) {
      const endDate = new Date(end + 'T23:59:59.999');
      where.begin = LessThanOrEqual(endDate);
    }

    return this.agendaRepository.find({ where });
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
        begin: LessThanOrEqual(now),
        status: In(['futuro', 'em-andamento']),
      },
      { status: 'em-andamento' },
    );

    await this.agendaRepository.update(
      {
        end: LessThanOrEqual(now),
      },
      { status: 'finalizada' },
    );

    const currentAgendas = await this.agendaRepository.find({
      where: { status: 'em-andamento' },
      relations: ['agendaItems'],
    });

    for (const agenda of currentAgendas) {
      await this.agendaItemRepository.update(
        { agenda: { id: agenda.id } },
        { status: 'em-votacao' },
      );
    }

    const finalized = await this.agendaRepository.find({
      where: {status: 'finalizada'},
      relations: ['agendaItems'],
    });

    for (const agenda of finalized) {
      agenda.status = 'finalizada';
      await this.agendaRepository.save(agenda);

      for (const item of agenda.agendaItems) {
        await this.agendaItemService.computeResults(item.id);
      }
    }
  }

  /**
   * Finaliza uma agenda com o ID fornecido, caso ela esteja com status "em-andamento".
   *
   * @param id - O identificador da agenda a ser finalizada.
   */
  async finishAgenda(id: number): Promise<void> {
    const agenda = await this.agendaRepository.findOne({ where: { id } });
    if (!agenda) throw new Error('Agenda not found');

    if (agenda.status === 'em-andamento') {
      agenda.status = 'finalizada';
      await this.agendaRepository.save(agenda);
      
      this.updateAgendaStatuses();
    }
  }
}
