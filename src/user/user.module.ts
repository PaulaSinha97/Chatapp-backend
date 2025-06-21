import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_SCHEMA, USER_NAME } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/guard/currentUser.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_NAME, schema: USER_SCHEMA }]),
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
  exports: [MongooseModule],
  providers: [UserService, AuthGuard],
  controllers: [UserController],
})
export class UserModule {}
