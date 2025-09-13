import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat, Message } from './chat.schema';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { AuthGuard } from 'src/auth/guard/currentUser.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  getMessages(@Body() payload: { roomId: string }) {
    return this.chatService.findChat(payload.roomId);
  }

  // async getMessages(roomId: string): Promise<any[]> {
  //   const room = await this.chatRoomModel.findOne({ roomId });
  //   return room ? room.messages : [];
  // }

  // @Post()
  // sendMessage(@Body() body: { roomId: string; message: Message }) {
  //   return this.chatService.addMessage(body.roomId, [body.message]);
  // }

  @Post('/getRoomIdWithRespectiveFriend')
  @UseGuards(AuthGuard)
  getRoomId(
    @CurrentUser() user_id,
    @Body() payload: { friendId: { id: string } },
  ) {
    console.log('user_id', user_id, payload);
    return this.chatService.findRoomIdWithOwnerAndFriendsId(
      user_id,
      payload.friendId.id,
    );
  }
}
