import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  // imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtService, JwtStrategy],
})
export class UserModule {}
