// src/tracking/domain/entities/tracking-session.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Vehicle } from '../../../vehicle/domain/entities/vehicle.entity';
import { Location } from './location.entity';

@Entity('tracking_sessions')
export class TrackingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Vehicle, vehicle => vehicle.id)
  vehicle: Vehicle;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Location, location => location.trackingSession)
  locations: Location[];

  @CreateDateColumn()
  createdAt: Date;
}