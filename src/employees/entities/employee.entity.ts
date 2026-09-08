import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Department } from '../../departments/entities/department.entity';
import { Position } from '../../positions/entities/position.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 30, nullable: true })
  phone: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToOne(() => Position, (position) => position.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'positionId' })
  position: Position;
}