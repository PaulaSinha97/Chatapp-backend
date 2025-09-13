import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument, Message } from './chat.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async findOrCreateRoom(roomId: string, message: any): Promise<Chat> {
    const room = await this.chatModel.findOne({ roomId });
    if (!room) {
      return this.create(uuidv4(), message);
    } else {
      return this.updateChat(roomId, message);
    }
  }

  async addMessage(roomId: string, message: any): Promise<Chat> {
    return await this.findOrCreateRoom(roomId, message);
    // room.messages.push(message);
    // await room.save();
    // return room;
  }

  async create(roomId: string, message: Message[]): Promise<Chat> {
    console.log('121212', roomId, message);
    return this.chatModel.create({ roomId, messages: message });
  }

  async findChat(roomId: string): Promise<Chat[]> {
    return this.chatModel.findOne({
      roomId,
    });
  }

  async updateChat(roomId: string, mm: Message[]): Promise<Chat> {
    return this.chatModel.findOneAndUpdate(
      { roomId: roomId },
      {
        $push: {
          messages: { ...mm[0] },
        },
      },
      { new: true },
    ) as any;
  }

  async findRoomIdWithOwnerAndFriendsId(ownerId: string, friendId: string) {
    console.log('ownerId', ownerId, friendId);
    return this.chatModel.findOne(
      {
        messages: { $elemMatch: { senderId: ownerId, receiverId: friendId } },
      },

      { roomId: 1 },
    );
  }
}
