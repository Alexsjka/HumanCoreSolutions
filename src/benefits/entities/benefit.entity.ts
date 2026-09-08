import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Contract } from '../../contracts/entities/contract.entity';

@Entity('benefits')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @ManyToOne(() => Contract, (contract) => contract.benefits, {
    nullable: false,
  })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;
}
