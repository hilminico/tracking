// src/tracking/application/services/tracking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../../domain/entities/location.entity';
import { TrackingSession } from '../../domain/entities/tracking-session.entity';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(TrackingSession)
    private trackingSessionRepository: Repository<TrackingSession>,
  ) {}

  async createTrackingSession(vehicleId: string, name: string): Promise<TrackingSession> {
    const session = this.trackingSessionRepository.create({
      vehicle: { id: vehicleId },
      name,
      isActive: true,
    });
    return this.trackingSessionRepository.save(session);
  }

  async addLocation(sessionId: string, latitude: number, longitude: number): Promise<Location> {
    const location = this.locationRepository.create({
      trackingSession: { id: sessionId },
      latitude,
      longitude,
      timestamp: new Date(),
    });
    return this.locationRepository.save(location);
  }

  async getSessionLocations(sessionId: string): Promise<Location[]> {
    return this.locationRepository.find({
      where: { trackingSession: { id: sessionId } },
      order: { timestamp: 'ASC' },
    });
  }

  // ... methods lainnya
}