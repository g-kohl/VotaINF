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

  @Get('agenda-item/:id')
  findByAgendaItem(@Param('id') id: number) {
    return this.voteService.findByAgendaItem(Number(id));
  }

  @Get(':userId/:agendaItemId')
  findUserVote(
    @Param('userId') userId: number,
    @Param('agendaItemId') agendaItemId: number,
  ) {
    return this.voteService.findUserVote(Number(userId), Number(agendaItemId));
  }
}
