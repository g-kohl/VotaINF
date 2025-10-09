import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaModule } from './agenda/agenda.module';

@Module({
  imports: [AgendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
