import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, AgendaItem])],
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule {}
