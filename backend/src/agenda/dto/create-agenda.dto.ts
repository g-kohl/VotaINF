import { IsISO8601, IsOptional, IsString, IsArray, ArrayNotEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAgendaDto {
  @IsISO8601()
  begin: string;

  @IsOptional()
  @IsISO8601()
  end?: string;

  @IsNotEmpty()
  @IsString()
  format: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  agendaItemIds: number[];
}
