import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { AgendaItem } from 'src/agenda-item/agenda-item.entity';

@Module({
  // Register both Agenda and AgendaItem so the service can update items when creating an agenda
  imports: [TypeOrmModule.forFeature([Agenda, AgendaItem])],
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule {}
