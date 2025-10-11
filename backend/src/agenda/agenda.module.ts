import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaItem } from './agenda-item.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller'; 
import { Vote } from './vote.entity'; // <-- Adicionado

@Module({
  imports: [
    TypeOrmModule.forFeature([Agenda, AgendaItem, Vote]), // <-- Importado Vote
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}
