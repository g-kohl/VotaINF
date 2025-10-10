import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaItem } from './agenda-item.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller'; // <-- Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([Agenda, AgendaItem]),
  ],
  controllers: [AgendaController], // <-- Add this line
  providers: [AgendaService], // <-- Add this line
})
export class AgendaModule {}