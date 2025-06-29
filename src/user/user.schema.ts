import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
})
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const USER_SCHEMA = SchemaFactory.createForClass(User);
USER_SCHEMA.set('toJSON', {
  virtuals: true, // this converts _id to id
  transform: (doc, converted) => {
    delete converted._id;
  },
});
export default USER_SCHEMA;
export const USER_NAME = User.name;
export type USER_DOCUMENT = User & Document;
