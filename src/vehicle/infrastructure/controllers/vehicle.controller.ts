// src/customer/infrastructure/controllers/customer.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VehicleService } from '../../application/services/vehicle.service';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateDto } from '../../dto/create.dto';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehicleController {
  constructor(private vehicleService: VehicleService) { }

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle | null> {
    return this.vehicleService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<Vehicle> {
    return this.vehicleService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createDto: CreateDto): Promise<Vehicle | null> {
    return this.vehicleService.update(id, createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.vehicleService.delete(id);
  }
}