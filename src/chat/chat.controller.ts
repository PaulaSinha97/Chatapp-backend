import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessages() {
    return this.chatService.findAll();
  }

  @Post()
  sendMessage(@Body() body: {roomId:string, username: string; message: string }) {
    return this.chatService.create(body.roomId,body.username, body.message);
  }

  //  @Post()
  // sendMessage(@Body() body: {roomId:string, username: string; message: string }) {
  //   return this.chatService.create(body.roomId,body.username, body.message);
  // }
}