import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // jwt là key mặc định
@ApiTags('Shipments')
@Controller('api/shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  // @Post()
  // create(@Body() createShipmentDto: CreateShipmentDto) {
  //   return this.shipmentsService.create(createShipmentDto);
  // }

  @Get()
  getShipments(@Headers('token') token: string) {
    return this.shipmentsService.getShipments(token);
  }
}
