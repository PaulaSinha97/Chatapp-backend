import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { roomId: string; username: string; message: string },
  ) {
    console.log("MessageBody",data)
    const msg = await this.chatService.create(
      data.roomId,
      data.username,
      data.message,
    );
    this.server.to(data.roomId).emit('newMessage', msg);
    return msg;
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(client: Socket, roomId: string) {
    console.log("MessageBody",roomId)
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }
}
