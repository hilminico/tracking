// src/vehicle/application/services/vehicle.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { Customer } from '../../../customer/domain/entities/customer.entity';
import { CreateDto } from '../../dto/create.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

  ) { }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findOne({
      where: { id },
      relations: ['customers']
    });
  }

  async create(createDto: CreateDto): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create(createDto);

    const customer = await this.customerRepository.findOne({
      where: { id: createDto.customerId }
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createDto.customerId} not found`);
    }

    return this.vehicleRepository.save(newVehicle);
  }

  async update(id: string, createDto: CreateDto): Promise<Vehicle | null> {
    await this.vehicleRepository.update(id, createDto);

    const customer = await this.customerRepository.findOne({
      where: { id: createDto.customerId }
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createDto.customerId} not found`);
    }

    return this.vehicleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}