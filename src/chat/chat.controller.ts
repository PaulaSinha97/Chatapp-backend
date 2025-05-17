import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat, Message } from './chat.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessages() {
    return this.chatService.findAll();
  }

  // async getMessages(roomId: string): Promise<any[]> {
  //   const room = await this.chatRoomModel.findOne({ roomId });
  //   return room ? room.messages : [];
  // }

  @Post()
  sendMessage(@Body() body: { roomId: string; message: Message }) {
    return this.chatService.addMessage(body.roomId, [body.message]);
  }
}
