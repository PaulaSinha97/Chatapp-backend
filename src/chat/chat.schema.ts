import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Message {
  @Prop()
  username: string;

  @Prop()
  message: string;

  @Prop()
  senderId: string;

  @Prop()
  receiverId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const MessageSchema = SchemaFactory.createForClass(Message);

@Schema()
export class Chat {
  @Prop({
    type: String,
    ref: 'roomId',
    required: true,
    unique: true,
    index: true,
  })
  roomId: Types.ObjectId;

  @Prop({ type: [MessageSchema], default: [] })
  messages: [
    {
      username: string;
      message: string;
      senderId: string;
      receiverId: string;
      createdAt: Date;
    },
  ];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
