import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from '../employees/entities/employee.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createContractDto: CreateContractDto) {
    const { employeeId, ...contractData } = createContractDto;
    const employee = await this.findEmployee(employeeId);
    const contract = this.contractRepository.create({
      ...contractData,
      employee,
    });

    return this.contractRepository.save(contract);
  }

  findAll() {
    return this.contractRepository.find({
      relations: { employee: true, benefits: true },
    });
  }

  async findOne(id: number) {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: { employee: true, benefits: true },
    });

    if (!contract) {
      throw new NotFoundException('Contrato no encontrado');
    }

    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract = await this.findOne(id);
    const { employeeId, ...contractData } = updateContractDto;

    Object.assign(contract, contractData);

    if (employeeId !== undefined) {
      contract.employee = await this.findEmployee(employeeId);
    }

    return this.contractRepository.save(contract);
  }

  async remove(id: number) {
    const contract = await this.findOne(id);
    await this.contractRepository.remove(contract);

    return { message: 'Contrato eliminado correctamente' };
  }

  private async findEmployee(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    return employee;
  }
}
