import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const dev = true;

@WebSocketGateway()
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected:${client.id}`);

    if (dev) {
      console.log(`${JSON.stringify(args)}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected:${client.id}`);
  }

  notify<T>(event: string, data: T): void {
    console.log(
      `BackEnd notification ${JSON.stringify(event)} - ${JSON.stringify(data)}`,
    );

    try {
      this.server.emit(event, data);
      console.log(`BackEnd notification goes right`, event, data);
    } catch (error) {
      console.log(`BackEnd notification goes wrong`);
    }
  }
}
