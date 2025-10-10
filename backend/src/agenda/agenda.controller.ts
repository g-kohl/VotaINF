// agenda.controller.ts
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AgendaService } from './agenda.service';

interface CreateItemDto {
  title: string;
}

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) { }

  @Get()
  async getAgenda() {
    return await this.agendaService.getAgenda();
  }

  // New endpoint to create an Agenda
  @Post()
  async createAgenda() {
    return await this.agendaService.createAgenda();
  }

  @Post('item')
  async createItem(@Body() body: CreateItemDto) {
    return await this.agendaService.createAgendaItem(body.title);
  }

  @Post('vote')
  async vote(@Body() body: { id: number; vote: boolean }) {
    return await this.agendaService.vote(body.id, body.vote);
  }
}