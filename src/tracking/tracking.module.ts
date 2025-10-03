import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './application/services/tracking.service';
import { TrackingGateway } from './infrastructure/gateways/tracking.gateway';
import { Location } from './domain/entities/location.entity';
import { TrackingSession } from './domain/entities/tracking-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, TrackingSession])],
  providers: [TrackingService, TrackingGateway],
})
export class TrackingModule {}