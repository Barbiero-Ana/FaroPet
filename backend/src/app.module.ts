import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './database/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { VaccinesModule } from './modules/vaccines/vaccines.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { HealthHistoriesModule } from './modules/health-histories/health-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    UsersModule,
    PetsModule,
    VaccinesModule,
    MedicationsModule,
    AppointmentsModule,
    RemindersModule,
    HealthHistoriesModule,
  ],
})
export class AppModule {}
