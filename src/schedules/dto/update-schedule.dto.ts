import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
