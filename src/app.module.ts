import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< Updated upstream
=======
import { createObserveModule } from '@nestjs/observe';
import { DatabaseModule } from './database/database.module';
>>>>>>> Stashed changes
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
<<<<<<< Updated upstream
    ConfigModule.forRoot({
      isGlobal: true,
=======
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BenefitsModule,
    ContractsModule,
    DepartmentsModule,
    EmployeesModule,
    PositionsModule,
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'human-core-solutions',
>>>>>>> Stashed changes
    }),

    DatabaseModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}