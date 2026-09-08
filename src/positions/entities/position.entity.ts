import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  baseSalary: number;

  @OneToMany('Employee', 'position')
  employees: unknown[];
}