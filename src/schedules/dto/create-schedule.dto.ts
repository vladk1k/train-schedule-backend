import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  trainNumber: string;

  @IsNotEmpty()
  @IsString()
  departureStation: string;

  @IsNotEmpty()
  @IsString()
  arrivalStation: string;

  @IsNotEmpty()
  @IsDateString()
  departureTime: string;

  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;

  @IsNotEmpty()
  @IsNumber()
  platform: number;

  @IsString()
  status: string;
}
