// src/customer/application/services/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { CreateDto } from '../../dto/create.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async create(createDto: CreateDto): Promise<Customer> {
    const newCustomer = this.customerRepository.create(createDto);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: string, createDto: CreateDto): Promise<Customer | null> {
    await this.customerRepository.update(id, createDto);
    return this.customerRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}