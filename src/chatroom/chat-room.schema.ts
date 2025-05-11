import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import mongoose, {Types} from "mongoose";

// schemas/chat-room.schema.ts
@Schema()
export class ChatRoom extends Document {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  })
  participants: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
