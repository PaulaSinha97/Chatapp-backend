import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection:'users'
})
export class User{
@Prop()
name : string;
@Prop()
email:string;
@Prop()
password : string;
}

export const USER_SCHEMA = SchemaFactory.createForClass(User)
export const USER_NAME = User.name
export type USER_DOCUMENT = User & Document