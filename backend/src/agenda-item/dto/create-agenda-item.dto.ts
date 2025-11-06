import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAgendaItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
