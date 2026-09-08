import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { departmentId, positionId, ...employeeData } = createEmployeeDto;
    const department = await this.findDepartment(departmentId);
    const position = await this.findPosition(positionId);

    const employee = this.employeeRepository.create({
      ...employeeData,
      department,
      position,
    });

    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({
      relations: { department: true, position: true },
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: { department: true, position: true },
    });

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    const { departmentId, positionId, ...employeeData } = updateEmployeeDto;

    Object.assign(employee, employeeData);

    if (departmentId !== undefined) {
      employee.department = await this.findDepartment(departmentId);
    }

    if (positionId !== undefined) {
      employee.position = await this.findPosition(positionId);
    }

    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);

    return { message: 'Empleado eliminado correctamente' };
  }

  private async findDepartment(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });

    if (!department) {
      throw new NotFoundException('Departamento no encontrado');
    }

    return department;
  }

  private async findPosition(id: number) {
    const position = await this.positionRepository.findOne({ where: { id } });

    if (!position) {
      throw new NotFoundException('Cargo no encontrado');
    }

    return position;
  }
}