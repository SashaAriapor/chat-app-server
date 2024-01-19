import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Post("/register")
  async register(@Body() dto: RegisterDto) {
    const checkExit = await this.userService.findUserByEmail(dto.email);
    if (checkExit) throw new BadRequestException("User Already Exited");
    return await this.userService.createUser(dto);
  }
}
