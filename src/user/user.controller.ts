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
  Req,
  HttpException,
  HttpStatus,
  Query,
  Put,
  UploadedFile,
  UseInterceptors,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class User {
  @ApiProperty({ description: 'userId', type: Number })
  id: number;

  // @ApiProperty({ description: 'name', type: String })
  // name: string;

  @ApiProperty({ description: 'email', type: String })
  email: string;

  @ApiProperty({ description: 'password', type: String })
  password: string;

  @ApiProperty({ description: 'phone', type: String })
  phone: string;

  // @ApiProperty({ description: 'birth_day', type: String })
  // birth_day: string;

  // @ApiProperty({ description: 'gender', type: String })
  // gender: string;

  // @ApiProperty({ description: 'role', type: String })
  // role: string;

  // @ApiProperty({ description: 'skill', type: String })
  // skill: string;

  // @ApiProperty({ description: 'certification', type: String })
  // certification: string;
}

class PaymentInformation {
  @ApiProperty({ description: 'userId', type: Number })
  user_id: number;

  @ApiProperty({ description: 'token', type: String })
  token_last4: string;

  @ApiProperty({ description: 'brand', type: String })
  brand: string;

  @ApiProperty({ description: 'expMonth', type: Number })
  exp_month: number;

  @ApiProperty({ description: 'expYear', type: Number })
  exp_year: number;
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // jwt là key mặc định
@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // get users
  @Get()
  getUser(@Headers('token') token: string) {
    return this.userService.getUser(token);
  }

  // get Address by user id
  @Get('address/:id')
  getAddressByUserId(@Headers('token') token: string, @Param('id') id: string) {
    return this.userService.getAddressByUserId(token, +id);
  }
  //   // Payment Methods by user id
  @Post()
  getPaymentMethodsByUserId(
    @Headers('token') token: string,
    @Body() payload: PaymentInformation,
  ) {
    return this.userService.getPaymentMethodsByUserId(token, payload);
  }
  //   @Post()
  //   createUser(@Headers('token') token: string, @Body() values: User) {
  //     return this.userService.createUser(token, values);
  //   }

  //   // Xóa người dùng
  //   @Delete()
  //   removeUser(@Headers('token') token: string, @Query('id') id: string) {
  //     return this.userService.removeUser(token, +id);
  //   }
}
