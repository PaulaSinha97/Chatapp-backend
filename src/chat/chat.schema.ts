import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({
    type: String,
    ref: 'roomId',
    required: true,
  })
  roomId: Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
