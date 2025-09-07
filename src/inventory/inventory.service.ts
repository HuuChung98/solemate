import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { jwtConstants } from 'src/auth/auth.constants';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  async getInventory(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.inventory.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }
}
