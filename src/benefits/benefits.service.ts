import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contract } from '../contracts/entities/contract.entity';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { Benefit } from './entities/benefit.entity';

@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private readonly benefitRepository: Repository<Benefit>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async create(createBenefitDto: CreateBenefitDto) {
    const { contractId, ...benefitData } = createBenefitDto;
    const contract = await this.findContract(contractId);
    const benefit = this.benefitRepository.create({
      ...benefitData,
      contract,
    });

    return this.benefitRepository.save(benefit);
  }

  findAll() {
    return this.benefitRepository.find({ relations: { contract: true } });
  }

  async findOne(id: number) {
    const benefit = await this.benefitRepository.findOne({
      where: { id },
      relations: { contract: true },
    });

    if (!benefit) {
      throw new NotFoundException('Beneficio no encontrado');
    }

    return benefit;
  }

  async update(id: number, updateBenefitDto: UpdateBenefitDto) {
    const benefit = await this.findOne(id);
    const { contractId, ...benefitData } = updateBenefitDto;

    Object.assign(benefit, benefitData);

    if (contractId !== undefined) {
      benefit.contract = await this.findContract(contractId);
    }

    return this.benefitRepository.save(benefit);
  }

  async remove(id: number) {
    const benefit = await this.findOne(id);
    await this.benefitRepository.remove(benefit);

    return { message: 'Beneficio eliminado correctamente' };
  }

  private async findContract(id: number) {
    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      throw new NotFoundException('Contrato no encontrado');
    }

    return contract;
  }
}
