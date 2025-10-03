// src/tracking/application/services/mock-simulation.service.ts
import { Injectable } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingGateway } from '../../infrastructure/gateways/tracking.gateway';

@Injectable()
export class MockSimulationService {
  constructor(
    private trackingService: TrackingService,
    private trackingGateway: TrackingGateway,
  ) {}

  async startSimulation(vehicleId: string, sessionId: string) {
    // Simulasikan update lokasi setiap 5 detik
    const interval = setInterval(async () => {
      const lat =  Math.random() * 180 - 90; // -90 to 90
      const lng = Math.random() * 360 - 180; // -180 to 180

      // Simpan ke database
      const location = await this.trackingService.addLocation(sessionId, lat, lng);

      // Kirim update via WebSocket
      this.trackingGateway.sendLocationUpdate(sessionId, location);
    }, 5000);

    // Hentikan setelah 10 menit (contoh)
    setTimeout(() => clearInterval(interval), 600000);
  }
}