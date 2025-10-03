// src/customer/infrastructure/controllers/customer.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { Customer } from '../../domain/entities/customer.entity';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateDto } from '../../dto/create.dto'
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<Customer> {
    return this.customerService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createDto: CreateDto): Promise<Customer | null> {
    return this.customerService.update(id, createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.customerService.delete(id);
  }
}