import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { jwtConstants } from 'src/auth/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  async getAllReviews(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.reviews.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }
}
