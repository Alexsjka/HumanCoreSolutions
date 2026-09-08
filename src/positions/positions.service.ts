import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto);
    return this.positionRepository.save(position);
  }

  findAll() {
    return this.positionRepository.find();
  }

  async findOne(id: number) {
    const position = await this.positionRepository.findOne({ where: { id } });

    if (!position) {
      throw new NotFoundException('Cargo no encontrado');
    }

    return position;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.findOne(id);
    Object.assign(position, updatePositionDto);
    return this.positionRepository.save(position);
  }

  async remove(id: number) {
    const position = await this.findOne(id);
    await this.positionRepository.remove(position);

    return { message: 'Cargo eliminado correctamente' };
  }
}