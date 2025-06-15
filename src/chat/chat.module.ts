import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from './chat.schema';
import { AuthGuard } from 'src/auth/guard/currentUser.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
// import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: 'abc123',
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    AuthModule,
  ],
  providers: [ChatService, ChatGateway, AuthGuard, JwtStrategy],
  controllers: [ChatController],
})
export class ChatModule {}
