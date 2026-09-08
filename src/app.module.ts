import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenefitsModule } from './benefits/benefits.module';
import { ContractsModule } from './contracts/contracts.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { PositionsModule } from './positions/positions.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root',
      database: process.env.DB_DATABASE ?? 'humancore',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    BenefitsModule,
    ContractsModule,
    DepartmentsModule,
    EmployeesModule,
    PositionsModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'human-core-solutions',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
