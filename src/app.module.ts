import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptor/currentUser.interceptor';
import { AuthGuard } from './auth/guard/currentUser.guard';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './auth/strategies/jwt.strategy';
// import {configModule} from '@nestjs/config'
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/tushar_workspace'),
    MongooseModule.forRoot('mongodb://localhost:27017/chat'),
    ProductsModule,
    // MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    ChatModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: 'abc123',
    //       signOptions: { expiresIn: '1h' },
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UserInterceptor,
    // },
  ],
})
export class AppModule {}
