import { Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';

@Module({
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule {}
