import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgendaService } from './agenda.service';

@Controller('agenda')
export class AgendaController {
  // constructor(private readonly agendaService: AgendaService) { }

  // @Get()
  // getAgenda() {
  //   return this.agendaService.getAgenda();
  // }

  // @Post('vote')
  // vote(@Body() body: { id: number; vote: 'approve' | 'reprove' | 'abstain' }) {
  //   return this.agendaService.vote(body.id, body.vote);
  // }
}
