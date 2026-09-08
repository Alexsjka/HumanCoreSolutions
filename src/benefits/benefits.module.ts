import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Contract } from '../contracts/entities/contract.entity';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';
import { Benefit } from './entities/benefit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Benefit, Contract])],
  controllers: [BenefitsController],
  providers: [BenefitsService],
})
export class BenefitsModule {}
