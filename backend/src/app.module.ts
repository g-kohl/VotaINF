import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PautasModule } from './pautas/pautas.module';

@Module({
  imports: [PautasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
