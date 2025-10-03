import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Schedule } from './schedules/schedule.entity';
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Schedule],
      synchronize: true, // dev only!
      ssl: {
        rejectUnauthorized: false, // for Render
      },
    }),
    AuthModule,
    SchedulesModule,
  ],
})
export class AppModule {}
