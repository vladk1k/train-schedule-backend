import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trainNumber: string;

  @Column()
  departureStation: string;

  @Column()
  arrivalStation: string;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column()
  platform: number;

  @Column({ default: 'По расписанию' })
  status: string;
}
