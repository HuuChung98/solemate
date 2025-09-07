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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // jwt là key mặc định
@ApiTags('Inventory')
@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventory(@Headers('token') token: string) {
    return this.inventoryService.getInventory(token);
  }
}
