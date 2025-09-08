import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ShipmentsService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();
  // create(createShipmentDto: CreateShipmentDto) {
  //   return 'This action adds a new shipment';
  // }

  async getShipments(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.shipments.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} shipment`;
  // }

  // update(id: number, updateShipmentDto: UpdateShipmentDto) {
  //   return `This action updates a #${id} shipment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} shipment`;
  // }
}
