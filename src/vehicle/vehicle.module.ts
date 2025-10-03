import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './application/services/vehicle.service';
import { VehicleController } from './infrastructure/controllers/vehicle.controller';
import { Customer } from '../customer/domain/entities/customer.entity';
import { Vehicle } from './domain/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle,Customer])],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}