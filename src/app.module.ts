import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
// import {configModule} from '@nestjs/config'
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/tushar_workspace'),ProductsModule,
  MongooseModule.forRoot(process.env.MONGO_URI),UserModule,
  AuthModule,
  ChatModule,
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
