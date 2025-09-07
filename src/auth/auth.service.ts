import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import passport from 'passport';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  async signUp(createAuthDto: CreateAuthDto) {
    try {
      const checkUser = await this.prisma.users.findFirst({
        where: {
          email: createAuthDto.email,
        },
      });
      if (!checkUser) {
        await this.prisma.users.create({ data: createAuthDto });
        return 'Account created successfully';
      } else {
        return 'Email already exists';
      }
    } catch (error) {
      return 'Server error';
    }
  }

  async login(userLogin) {
    try {
      const { email, password } = userLogin;
      const user = await this.prisma.users.findFirst({ where: { email } });
      if (user?.password_hash !== password) {
        throw new UnauthorizedException();
      }
      const payload = { email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return 'Login failed';
    }
  }
}
