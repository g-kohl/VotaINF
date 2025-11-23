import { IsInt, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  userId: number;

  @IsInt()
  agendaItemId: number;

  @IsString()
  decision: string;
}
