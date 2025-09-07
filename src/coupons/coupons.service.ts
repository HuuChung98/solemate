import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class CouponsService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  async getCoupons(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.coupons.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} coupon`;
  // }

  // update(id: number, updateCouponDto: UpdateCouponDto) {
  //   return `This action updates a #${id} coupon`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coupon`;
  // }
}
