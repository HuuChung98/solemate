import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // jwt là key mặc định
@ApiTags('Coupons')
@Controller('api/coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  // @Post()
  // create(@Body() createCouponDto: CreateCouponDto) {
  //   return this.couponsService.create(createCouponDto);
  // }

  @Get()
  getCoupons(@Headers('token') token: string) {
    return this.couponsService.getCoupons(token);
  }
}
