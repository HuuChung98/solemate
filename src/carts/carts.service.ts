import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class CartsService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();
  // create(createCartDto: CreateCartDto) {
  //   return 'This action adds a new cart';
  // }

  async getCarts(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.carts.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  async getCartById(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.cart_items.findUnique({
        where: { id: id },
      });
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }
}
