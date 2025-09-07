import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { jwtConstants } from 'src/auth/auth.constants';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async getProducts(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.products.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  async getProductById(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.product_variants.findMany({
        where: { product_id: id },
      });
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
