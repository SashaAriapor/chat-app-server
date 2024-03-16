import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ namespace: 'message' })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  async sendMessage(to: string, data: MessageDto) {
    this.server.emit(to, data);
  }
}
