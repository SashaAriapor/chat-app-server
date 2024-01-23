import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateUserDto } from "./dto/updateProfile.dto";
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Put("/update")
  async register(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const id = req.user['sub'];
    return await this.userService.updateUserWithId(id, dto);
  }
}
