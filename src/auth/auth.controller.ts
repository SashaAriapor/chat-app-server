import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Req,
  Get,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    const checkExit = await this.userService.findUserByEmail(dto.email);
    if (checkExit) throw new BadRequestException('User Already Exited');
    return await this.userService.createUser(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('Email Or Password is Wrong');
    const checkPassword = await this.authService.checkPassword(
      user.hash,
      dto.password,
    );
    if (!checkPassword)
      throw new BadRequestException('Email Or Password is Wrong');
    const tokens = await this.authService.generateTokens(user.id, user.email);
    await this.authService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    const user = await this.userService.findUserById(req.user['sub']);
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(user.id, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    await this.authService.updateRefreshToken(req.user['sub'], '');
    throw new ForbiddenException('Access Denied');
  }
}
