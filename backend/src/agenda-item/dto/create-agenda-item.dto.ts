import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAgendaItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
