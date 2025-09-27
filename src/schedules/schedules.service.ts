import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const newSchedule = this.schedulesRepository.create(createScheduleDto);
    return this.schedulesRepository.save(newSchedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  async update(id: number, updateData: UpdateScheduleDto): Promise<Schedule> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataToUpdate: Partial<Schedule> = { ...(updateData as any) };

    if (updateData.departureTime) {
      dataToUpdate.departureTime = new Date(updateData.departureTime);
    }
    if (updateData.arrivalTime) {
      dataToUpdate.arrivalTime = new Date(updateData.arrivalTime);
    }

    const schedule = await this.schedulesRepository.preload({
      id: id,
      ...dataToUpdate,
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found.`);
    }

    return this.schedulesRepository.save(schedule);
  }

  async remove(id: number): Promise<void> {
    const result = await this.schedulesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with ID ${id} not found.`);
    }
  }
}
