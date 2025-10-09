import { Module } from '@nestjs/common';
import { PautasController } from './pautas.controller';
import { PautasService } from './pautas.service';

@Module({
  controllers: [PautasController],
  providers: [PautasService]
})
export class PautasModule {}
