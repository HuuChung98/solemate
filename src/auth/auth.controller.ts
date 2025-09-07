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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class userType {
  @ApiProperty({ description: 'email', type: String })
  email: string;

  @ApiProperty({ description: 'password', type: String })
  password: string;
}

@ApiBearerAuth()
// @ApiHeader({ name: "Token", description: "JWT Token"})
// @UseGuards(AuthGuard("jwt"))

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }
  @Post('/login')
  login(@Body() userLogin: userType) {
    return this.authService.login(userLogin);
  }
}
