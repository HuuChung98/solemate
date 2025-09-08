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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // jwt là key mặc định
@ApiTags('Carts')
@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // @Post()
  // create(@Body() createCartDto: CreateCartDto) {
  //   return this.cartsService.create(createCartDto);
  // }

  @Get()
  getCarts(@Headers('token') token: string) {
    return this.cartsService.getCarts(token);
  }

  @Get(':id')
  getCartById(@Headers('token') token: string, @Param('id') id: string) {
    return this.cartsService.getCartById(token, +id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartsService.remove(+id);
  // }
}
