// src/tracking/domain/entities/location.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Vehicle } from '../../../vehicle/domain/entities/vehicle.entity';
import { TrackingSession } from './tracking-session.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Vehicle, vehicle => vehicle.id)
  vehicle: Vehicle;

  
  @ManyToOne(() => TrackingSession, session => session.locations)
  trackingSession: TrackingSession;
  
  @CreateDateColumn()
  createdAt: Date;
}