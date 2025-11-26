import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  createVote(@Body() dto: CreateVoteDto) {
    return this.voteService.createVote(dto);
  }

  @Get('agenda/:id')
  /**
   * Retorna a lista de eleitores associados a um determinado voto.
   *
   * @param id - O identificador do voto.
   * @returns Uma lista de eleitores vinculados ao voto especificado.
   */
  async getVoters(@Param('id') id: number) {
    return this.voteService.getVoters(Number(id));
  }

  @Get('agenda-item/:id')
  getVoteReport(@Param('id') id: number) {
    return this.voteService.getVoteReport(Number(id));
  }

  @Get(':userId/:agendaItemId')
  findUserVote(
    @Param('userId') userId: number,
    @Param('agendaItemId') agendaItemId: number,
  ) {
    return this.voteService.findUserVote(Number(userId), Number(agendaItemId));
  }
}
