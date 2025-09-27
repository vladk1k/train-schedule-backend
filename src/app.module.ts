import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { Schedule } from './schedules/schedule.entity';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'train_user',
      password: 'train_user',
      database: 'trainschedule',
      entities: [User, Schedule],
      synchronize: true,
    }),
    AuthModule,
    SchedulesModule,
  ],
})
export class AppModule {}
