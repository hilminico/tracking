// src/tracking/infrastructure/gateways/tracking.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from '../../application/services/tracking.service';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
    namespace: '/tracking',
  })

export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private trackingService: TrackingService) { }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinSession')
  handleJoinSession(client: Socket, sessionId: string) {
    client.join(sessionId);
    client.emit('joinedSession', sessionId);
  }

  @SubscribeMessage('leaveSession')
  handleLeaveSession(client: Socket, sessionId: string) {
    client.leave(sessionId);
    client.emit('leftSession', sessionId);
  }

  async sendLocationUpdate(sessionId: string, location: any) {
    this.server.to(sessionId).emit('locationUpdate', location);
  }
}