import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(
    roomId: string,
    username: string,
    message: string,
  ): Promise<Chat> {
    return this.chatModel.create({ roomId, username, message });
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().sort({ createdAt: 1 }).exec();
  }
}
