import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaItemController } from './agenda-item.controller';
import { AgendaItemService } from './agenda-item.service';
import { AgendaItem } from './agenda-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaItem])],
  controllers: [AgendaItemController],
  providers: [AgendaItemService]
})
export class AgendaItemModule {}
