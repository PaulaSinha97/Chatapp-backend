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
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { AuthGuard } from 'src/auth/guard/currentUser.guard';
import { RequestService } from 'src/service/request.service';

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

  constructor(
    private readonly chatService: ChatService,
    private readonly requestService: RequestService,
  ) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // @UseGuards(AuthGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      roomId?: string;
      message: string;
      receiverId: string;
    },
    // @CurrentUser() user_id,
  ) {
    // console.log('user_iduser_iduser_id', user_id);/
    const user_id = this.requestService.getUserId();
    console.log('user_iduser_iduser_id', user_id);
    const msg = {
      senderId: user_id,
      receiverId: data.receiverId,
      message: data.message,
      createdAt: new Date(),
    };
    const returnMsg = await this.chatService.addMessage(data.roomId, [msg]);
    this.server.to(data.roomId).emit('newMessage', returnMsg);
    return returnMsg;
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }
}
