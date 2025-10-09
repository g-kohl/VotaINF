import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PautasService } from './pautas.service';
import { CreatePautaDto } from './create-pauta.dto';
import { Pauta } from './pauta.model';

@Controller('pautas')
export class PautasController {
  constructor(private readonly pautasService: PautasService) {}

  @Get()
  getAll(): Pauta[] {
    return this.pautasService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePautaDto): Pauta {
    return this.pautasService.create(dto.titulo);
  }

  // endpoint para votar (incrementar)
  @Post(':id/votar')
  votar(@Param('id', ParseIntPipe) id: number): Pauta {
    return this.pautasService.incrementVote(id);
  }
}
