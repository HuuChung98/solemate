import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class BrandsService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  // create(createBrandDto: CreateBrandDto) {
  //   return 'This action adds a new brand';
  // }

  async getAllBrands(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.brands.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} brand`;
  // }

  // update(id: number, updateBrandDto: UpdateBrandDto) {
  //   return `This action updates a #${id} brand`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} brand`;
  // }
}
