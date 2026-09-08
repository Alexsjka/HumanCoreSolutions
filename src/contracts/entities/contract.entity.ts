import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from '../../employees/entities/employee.entity';
import { Benefit } from '../../benefits/entities/benefit.entity';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  contractType: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ length: 50 })
  status: string;

  @OneToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @OneToMany(() => Benefit, (benefit) => benefit.contract)
  benefits: Benefit[];
}
